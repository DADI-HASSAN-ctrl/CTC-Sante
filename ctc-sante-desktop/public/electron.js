const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const keytar = require('keytar');
const sqlite3 = require('sqlite3').verbose();

const SERVICE_NAME = 'CTC-Santé';
const isDev = process.env.ELECTRON_DEV === 'true';

let mainWindow;
let db;

// ============================================================================
// INITIALISER LA BASE DE DONNÉES
// ============================================================================
function initializeDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'ctc-sante.db');
  
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erreur lors de l\'ouverture de la base de données:', err);
      return;
    }
    console.log('✓ Base de données connectée:', dbPath);
    
    // Créer les tables si elles n'existent pas
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          role TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS courses (
          id TEXT PRIMARY KEY,
          patientName TEXT NOT NULL,
          pickup TEXT NOT NULL,
          dropoff TEXT NOT NULL,
          date TEXT NOT NULL,
          time TEXT NOT NULL,
          price REAL NOT NULL,
          status TEXT DEFAULT 'new',
          taxi TEXT,
          observations TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS cache (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          expiresAt DATETIME
        )
      `);

      console.log('✓ Tables de base de données initialisées');
    });
  });
}

// ============================================================================
// HANDLERS POUR LE STOCKAGE SÉCURISÉ (KEYTAR)
// ============================================================================
ipcMain.handle('secure-store:set', async (event, key, value) => {
  try {
    await keytar.setPassword(SERVICE_NAME, key, value);
    return { success: true };
  } catch (error) {
    console.error('Erreur keytar:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('secure-store:get', async (event, key) => {
  try {
    const value = await keytar.getPassword(SERVICE_NAME, key);
    return { success: true, value };
  } catch (error) {
    console.error('Erreur keytar:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('secure-store:delete', async (event, key) => {
  try {
    const success = await keytar.deletePassword(SERVICE_NAME, key);
    return { success };
  } catch (error) {
    console.error('Erreur keytar:', error);
    return { success: false, error: error.message };
  }
});

// ============================================================================
// HANDLERS POUR LA BASE DE DONNÉES
// ============================================================================
ipcMain.handle('database:insertCourse', async (event, course) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO courses (id, patientName, pickup, dropoff, date, time, price, status, taxi, observations)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        course.id, course.patientName, course.pickup, course.dropoff,
        course.date, course.time, course.price, course.status || 'new',
        course.taxi || null, course.observations || null,
      ],
      function(err) {
        if (err) reject(err);
        else resolve({ id: course.id, success: true });
      }
    );
  });
});

ipcMain.handle('database:getCourses', async (event) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM courses ORDER BY createdAt DESC', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
});

// ============================================================================
// CRÉER LA FENÊTRE PRINCIPALE
// ============================================================================
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ============================================================================
// MENU
// ============================================================================
function createMenu() {
  const template = [
    {
      label: 'CTC Santé',
      submenu: [
        { role: 'quit', label: 'Quitter' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ============================================================================
// ÉVÉNEMENTS
// ============================================================================
app.on('ready', () => {
  initializeDatabase();
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('quit', () => {
  if (db) db.close();
});

console.log('✓ Electron initialized');

const { contextBridge, ipcRenderer } = require('electron');

// ============================================================================
// EXPOSER LES APIs DE SÉCURITÉ AU RENDERER (avec context isolation)
// ============================================================================

contextBridge.exposeInMainWorld('electronAPI', {
  // Secure Storage (Keytar)
  secureStore: {
    set: (key, value) => ipcRenderer.invoke('secure-store:set', key, value),
    get: (key) => ipcRenderer.invoke('secure-store:get', key),
    delete: (key) => ipcRenderer.invoke('secure-store:delete', key),
  },

  // Database (SQLite)
  database: {
    insertCourse: (course) => ipcRenderer.invoke('database:insertCourse', course),
    getCourses: () => ipcRenderer.invoke('database:getCourses'),
    getCourseById: (id) => ipcRenderer.invoke('database:getCourseById', id),
    updateCourse: (id, updates) => ipcRenderer.invoke('database:updateCourse', id, updates),
    deleteCourse: (id) => ipcRenderer.invoke('database:deleteCourse', id),
  },

  // System Information
  system: {
    platform: () => process.platform,
    arch: () => process.arch,
    version: () => process.version,
  },

  // App Information
  app: {
    version: () => '1.0.0',
    isDev: () => process.env.ELECTRON_DEV === 'true',
  },

  // IPC Events
  on: (channel, callback) => {
    // Whitelist allowed channels
    const validChannels = ['app-loaded', 'course-created', 'course-updated'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },

  once: (channel, callback) => {
    const validChannels = ['app-loaded'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => callback(...args));
    }
  },

  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },
});

console.log('✓ Electron preload script loaded');

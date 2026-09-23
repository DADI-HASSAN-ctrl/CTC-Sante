# CTC Santé - Pages Structure

## App Layout

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx          # Login form
│   ├── register/
│   │   └── page.tsx          # Registration form
│   └── layout.tsx            # Auth layout (no navbar)
│
├── (portal)/
│   ├── admin/
│   │   ├── page.tsx          # Admin dashboard
│   │   ├── users/
│   │   │   ├── page.tsx      # List users, approve/reject
│   │   │   └── [id]/
│   │   │       └── page.tsx  # User detail page
│   │   ├── trips/
│   │   │   ├── page.tsx      # All trips with filters
│   │   │   └── [id]/
│   │   │       └── page.tsx  # Trip detail, reassign
│   │   ├── map/
│   │   │   └── page.tsx      # Real-time taxi map
│   │   ├── calendar/
│   │   │   └── page.tsx      # Monthly/weekly calendar view
│   │   └── subscriptions/
│   │       └── page.tsx      # Manage taxi subscriptions
│   │
│   ├── taxi/
│   │   ├── page.tsx          # Taxi dashboard
│   │   ├── trips/
│   │   │   ├── page.tsx      # My assigned trips
│   │   │   └── [id]/
│   │   │       └── page.tsx  # Trip detail, update status
│   │   ├── profile/
│   │   │   └── page.tsx      # Edit taxi profile
│   │   ├── subscription/
│   │   │   └── page.tsx      # Subscription status + payment
│   │   └── location/
│   │       └── page.tsx      # Update current location
│   │
│   ├── etablissement/
│   │   ├── page.tsx          # Facility dashboard
│   │   ├── new-trip/
│   │   │   └── page.tsx      # Create new trip form
│   │   ├── trips/
│   │   │   ├── page.tsx      # My created trips
│   │   │   └── [id]/
│   │   │       └── page.tsx  # Trip detail, edit
│   │   └── profile/
│   │       └── page.tsx      # Edit facility profile
│   │
│   ├── layout.tsx            # Portal layout (navbar, sidebar)
│   └── page.tsx              # Portal hub
│
├── layout.tsx                # Root layout
└── page.tsx                  # Landing/redirect

components/
├── auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ProtectedRoute.tsx
│
├── portal/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── RoleGuard.tsx
│
├── common/
│   ├── Map.tsx               # Leaflet map component
│   ├── Calendar.tsx          # Trip calendar
│   ├── TripCard.tsx          # Trip display component
│   ├── TripForm.tsx          # Create/edit trip form
│   ├── SubscriptionCard.tsx  # Subscription status widget
│   ├── LocationPicker.tsx    # Address picker with geocoding
│   ├── Loading.tsx
│   ├── Error.tsx
│   └── Modal.tsx
│
├── admin/
│   ├── UserValidationList.tsx
│   ├── UserApprovalModal.tsx
│   ├── TripsTable.tsx
│   ├── DashboardStats.tsx
│   └── TaxiReassignModal.tsx
│
├── taxi/
│   ├── TripsList.tsx
│   ├── TripDetailModal.tsx
│   ├── LocationUpdater.tsx
│   └── NavigationButtons.tsx  # Maps/Waze links
│
└── facility/
    ├── NewTripForm.tsx
    └── TripsList.tsx
```

## Key Features per Page

### Auth Pages
- **Login**: Email + password
- **Register**: Multi-role form with role-specific fields

### Admin Pages
- **Dashboard**: Stats (trips today, active taxis, pending approvals)
- **Users**: List + approve/reject/suspend
- **Trips**: All trips with status filters
- **Map**: Real-time taxi positions, live updates
- **Calendar**: Month/week view with trips, color by taxi
- **Subscriptions**: Manage taxi subscription status

### Taxi Pages
- **Dashboard**: Stats + nearby trips
- **Trips**: My assigned + available trips
- **Trip Detail**: Status updates (ASSIGNED → EN_ROUTE → DONE)
- **Profile**: Edit name, phone, immatriculation
- **Location**: GPS tracking, availability toggle
- **Subscription**: Payment button + status display

### Facility Pages
- **Dashboard**: Recent trips, statistics
- **New Trip**: Full form (patient, type, addresses, payment mode)
- **My Trips**: Sorted by status
- **Trip Detail**: View status, add comments
- **Profile**: Edit facility info

## Real-time Updates
- Map: Polling GPS every 10-20s
- Trips: Polling trip list every 5-10s
- Notifications: Toast on trip assignment

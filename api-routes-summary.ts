/**
 * API Routes Summary
 *
 * Files to create in app/api/:
 *
 * ═══════════════════════════════════════════════════════════
 * AUTHENTICATION
 * ═══════════════════════════════════════════════════════════
 *
 * POST /api/auth/register
 *   - Register new user (TAXI, ETABLISSEMENT, or ADMIN)
 *   - Returns: { user, message }
 *   - Status: PENDING for non-admin
 *
 * POST /api/auth/login
 *   - Login with credentials
 *   - Returns: { user, token }
 *
 * POST /api/auth/logout
 *   - Logout user
 *
 * GET /api/auth/session
 *   - Get current session
 *
 * ═══════════════════════════════════════════════════════════
 * TRIPS (COURSES)
 * ═══════════════════════════════════════════════════════════
 *
 * POST /api/trips
 *   - Create new trip (ETABLISSEMENT only)
 *   - Triggers dispatch automatically
 *   - Returns: { trip }
 *
 * GET /api/trips
 *   - List trips (filtered by role)
 *   - ADMIN: all trips
 *   - TAXI: assigned to user only
 *   - ETABLISSEMENT: created by user only
 *
 * GET /api/trips/[id]
 *   - Get trip details
 *
 * PATCH /api/trips/[id]
 *   - Update trip (status, comments, etc.)
 *   - TAXI: update status, nextApptAt, commentTaxi
 *   - ADMIN: update any field
 *   - ETABLISSEMENT: update commentFacility, bonVerified
 *
 * ═══════════════════════════════════════════════════════════
 * DISPATCH
 * ═══════════════════════════════════════════════════════════
 *
 * POST /api/dispatch
 *   - Manual dispatch (ADMIN only)
 *   - Body: { tripId, taxiUserId }
 *   - Returns: { trip }
 *
 * POST /api/dispatch/auto
 *   - Trigger automatic dispatch for NEW trip
 *   - Body: { tripId }
 *   - Returns: { success, message }
 *
 * ═══════════════════════════════════════════════════════════
 * LOCATIONS
 * ═══════════════════════════════════════════════════════════
 *
 * PATCH /api/locations
 *   - Update taxi location (TAXI only)
 *   - Body: { lat, lng, isAvailable }
 *   - Returns: { success }
 *
 * GET /api/locations
 *   - Get all taxi locations (ADMIN + FACILITY)
 *   - Returns: { taxis: [{ id, name, lat, lng, isAvailable, status }] }
 *
 * ═══════════════════════════════════════════════════════════
 * USERS & MANAGEMENT
 * ═══════════════════════════════════════════════════════════
 *
 * GET /api/users/profile
 *   - Get current user profile
 *
 * PATCH /api/users/profile
 *   - Update user profile
 *   - TAXI: taxiProfile fields
 *   - ETABLISSEMENT: facilityProfile fields
 *
 * GET /api/admin/users
 *   - List users (ADMIN only)
 *   - Query: validationStatus, role, subscriptionStatus
 *
 * PATCH /api/admin/users/[id]
 *   - Approve/reject/suspend user
 *   - Body: { validationStatus, subscriptionStatus }
 *
 * ═══════════════════════════════════════════════════════════
 * SUBSCRIPTIONS
 * ═══════════════════════════════════════════════════════════
 *
 * GET /api/subscriptions/status
 *   - Get current subscription status
 *   - Returns: { status, endAt, daysRemaining }
 *
 * POST /api/subscriptions/checkout
 *   - Create Stripe checkout session
 *   - Body: { months: 1 }
 *   - Returns: { sessionId, checkoutUrl }
 *
 * POST /api/webhooks/stripe
 *   - Stripe webhook for payment confirmation
 *   - Updates subscription status to ACTIVE
 *   - Extends subscriptionEndAt by months
 *
 * ═══════════════════════════════════════════════════════════
 * DASHBOARD / ANALYTICS (ADMIN)
 * ═══════════════════════════════════════════════════════════
 *
 * GET /api/admin/dashboard
 *   - Dashboard stats: trips today, active taxis, pending approvals
 *   - Returns: { stats }
 *
 * GET /api/admin/calendar
 *   - Calendar data for month
 *   - Query: year, month, taxiUserId
 *   - Returns: { trips: [{ date, count, taxiId }] }
 *
 * ═══════════════════════════════════════════════════════════
 * PATIENTS
 * ═══════════════════════════════════════════════════════════
 *
 * POST /api/patients
 *   - Create patient record
 *
 * GET /api/patients
 *   - List patients (facility-scoped)
 *
 * ═══════════════════════════════════════════════════════════
 */

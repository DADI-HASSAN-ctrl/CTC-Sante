// Enum types matching Prisma
export enum UserRole {
  ADMIN = 'ADMIN',
  TAXI = 'TAXI',
  ETABLISSEMENT = 'ETABLISSEMENT',
}

export enum ValidationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum SubscriptionStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  LATE = 'LATE',
  SUSPENDED = 'SUSPENDED',
}

export enum TripType {
  IMMEDIATE = 'IMMEDIATE',
  PROGRAMMED = 'PROGRAMMED',
}

export enum TripStatus {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  EN_ROUTE = 'EN_ROUTE',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMode {
  BON_PRESENT = 'BON_PRESENT',
  PAYE_PATIENT = 'PAYE_PATIENT',
}

// Session type
export interface SessionUser {
  id: string
  email: string
  role: UserRole
  validationStatus: ValidationStatus
  subscriptionStatus: SubscriptionStatus
  subscriptionEndAt?: Date
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Taxi Profile
export interface TaxiProfileData {
  nom: string
  prenom: string
  phone: string
  immatriculation: string
  calendarColor?: string
}

// Facility Profile
export interface FacilityProfileData {
  name: string
  address: string
  contactName: string
  phone: string
}

// Trip DTO
export interface CreateTripDTO {
  patientFirstName: string
  patientLastName: string
  patientPhone?: string
  service: string
  chambre?: string
  pickupAddress: string
  dropoffAddress: string
  scheduledAt: string // ISO date
  type: TripType
  paymentMode: PaymentMode
  bonVerified?: boolean
  over150km: boolean
  accordOk?: boolean
  commentFacility?: string
}

export interface UpdateTripDTO {
  status?: TripStatus
  commentAdmin?: string
  commentTaxi?: string
  nextApptAt?: string
  nextApptNote?: string
  pmtOk?: boolean
  bulletinOk?: boolean
}

// Location update
export interface LocationUpdateDTO {
  lat: number
  lng: number
  isAvailable: boolean
}

// Subscription
export interface SubscriptionCheckoutDTO {
  months: number
  callbackUrl: string
}

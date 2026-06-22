# Marley Frontend

A modern healthcare frontend application built with **Frappe UI (Vue 3)** for managing outpatient and inpatient workflows. It runs on top of [Frappe](https://github.com/frappe/frappe), [ERPNext](https://github.com/frappe/erpnext), and the [Healthcare](https://github.com/frappe/health) module.

## Features

### Appointment Desk (Waitlist)
- View and manage patient appointments by date, practitioner, department, and appointment type
- Check-in patients to vitals and consultation queues via token system
- Record and submit vital signs directly from the desk
- Collect registration and consultation payments with multiple modes of payment
- Reschedule or cancel appointments with reason tracking
- View patient outstanding balances, advance amounts, and invoice history
- Print boarding passes and payment receipts

### Patient Self-Service Kiosk
- OTP-based patient identification via mobile number
- QR code scanning for quick check-in (configurable)
- Auto-routing to vitals queue or consultation queue based on patient journey
- Profile completion prompts for missing patient details
- Appointment booking with slot selection

### Token & Queue Management
- Token-based patient queue with journey tracking across service units
- Queue Assignment per service unit with user check-in/check-out
- Token display screen for waiting areas (TV display mode)
- Slot-based or FIFO token ordering (configurable per service unit)
- Priority token support with configurable rules
- Real-time queue updates via WebSocket

### Bed Management
- Visual ward/room layout grouped by service unit type
- Room status tracking: Vacant, Occupied, Cleaning, Under Maintenance
- Order admission, admit patient, transfer bed, and mark cleaning complete
- Filter by room type, patient, status, and date

### Patient Registration
- Register new patients with demographics, contact, and address
- Profile image upload
- Source tracking (Direct, Employee, Referral)

## Prerequisites

| Dependency | Version |
|---|---|
| Frappe | v16 |
| ERPNext | v16 |
| Healthcare | v16 |
| Python | >= 3.10 |
| Node.js | >= 18 |
| MariaDB | >= 10.6 |
| Redis | >= 6 |

## Installation

### 1. Install required apps

Make sure Frappe, ERPNext, and Healthcare are already installed on your bench and site.

```bash
cd /path/to/your/bench

# Get the app
bench get-app https://github.com/earthians/marley_frontend.git

# Install on your site
bench --site your-site.localhost install-app marley_frontend
```

### 2. Build and migrate

```bash
bench setup requirements
bench build --app marley_frontend
bench --site your-site.localhost migrate
```

### 3. Access the app

The healthcare frontend is available at:

```
https://your-site.localhost/healthcare
```

## Configuration

### Marley Frontend Settings

Navigate to **Marley Frontend Settings** in the Desk to configure:

| Setting | Description |
|---|---|
| Brand Logo | Logo displayed in the frontend header |
| Favicon | Browser tab icon |
| Home Screen Brand | Brand image for the kiosk home screen |
| Default Appointment Type | Pre-selected appointment type for kiosk bookings |
| Show Browser Alert for OTP | Display OTP in browser alert (development/testing) |
| Show QR Camera on Checkin Page | Auto-open QR scanner on the check-in page |
| Show QR Camera on Kiosk Page | Auto-open QR scanner on the kiosk page |
| Default Boarding Pass Print Format | Print format used for boarding passes |
| Default Payment Entry Print Format | Print format used for payment receipts |

### Required Setup

Before using the app, ensure the following are configured:

1. **Medical Department > Service Unit** - Each department must have a vitals service unit linked. This determines where patients check in for vitals.

2. **Queue Assignment** - Create active Queue Assignments for each service unit that accepts patient check-ins.

3. **Healthcare Settings > Token Settings** - Configure token series and token limit per display.

4. **Practitioner Schedules** - Set up practitioner schedules with service units assigned for slot-based appointment booking.

5. **Mode of Payment** - Configure modes of payment with default accounts set per company.

## Custom Fields

The app creates the following custom fields on standard DocTypes (via patch):

| DocType | Fields |
|---|---|
| Patient Appointment | `is_called`, `custom_registration_fee_paid`, `custom_registration_fee_invoiced`, `custom_consultation_paid`, `custom_reschedule_reason`, `custom_cancel_reason` |
| Healthcare Settings | `token_limit` |
| Healthcare Service Unit | `room_status`, `custom_slot_based_token` |
| Patient | `invoiced`, `payment_entry_created`, `custom_age`, `custom_last_visit_date`, `custom_source`, `custom_employee` |
| Payment Entry | `register_paid`, `custom_reference_appointment` |
| Therapy Plan Detail | `custom_booked_sessions` |

## Custom DocTypes

| DocType | Description |
|---|---|
| Marley Frontend Settings | App-wide configuration (Single) |
| Patient Token | Tracks patient journey through service units |
| Patient Journey Stop | Child table - each stop in a patient's token journey |
| Queue Assignment | Links a user to a service unit queue |
| Token Type | Token categorization |
| Patient Type | Patient classification |
| Patient Queue Priority Rule | Priority rules for token ordering |
| TV Screen Advertisement | Configurable ads/media for waiting area displays |
| Marley Dropdown Item | Child table for frontend dropdown menu items |

## Frontend Development

### Dev server

```bash
cd apps/marley_frontend/frontend
yarn install
yarn dev
```

The dev server runs at `http://localhost:8080` and proxies API calls to your Frappe backend.

### Build for production

```bash
cd apps/marley_frontend/frontend
yarn build
```

Build output goes to `marley_frontend/public/frontend/` and is served via `www/healthcare.html`.

### Tech stack

- **Vue 3** with Composition API
- **Frappe UI** component library
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Socket.IO** for real-time updates

### Frontend routes

| Route | Page | Description |
|---|---|---|
| `/healthcare/` | Home | Redirects to Waitlist |
| `/healthcare/waitlist` | Waitlist | Appointment desk with tabs |
| `/healthcare/kiosk` | Kiosk | Patient self-service check-in |
| `/healthcare/QueueSelection` | Queue Selection | Service unit queue selection |
| `/healthcare/bed_management` | Bed Management | Inpatient ward visualization |

## License

GNU GPL V3. See [license.txt](license.txt) for more information.

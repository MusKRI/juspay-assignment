# Juspay Assignment - eCommerce Dashboard

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.17.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)

  You can verify your installations by running:

  ```bash
  node --version
  npm --version
  ```

## 🛠️ Installation & Setup

Follow these steps to get the project running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/MusKRI/juspay-assignment
cd juspay-assignment
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- Next.js 15.4.6
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Radix UI components
- And many more...

### 3. Start the Development Server

```bash
npm run dev
```

The application will start with Turbopack (faster than Webpack) and be available at:
**[http://localhost:3005](http://localhost:3005)**

> **Note**: This project runs on port 3005 (not the default 3000) to avoid conflicts with other applications.

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (app)/(dashboard)/       # Dashboard layout and pages
│   └── layout.tsx               # Root layout
├── core/                        # Core application components
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── header/              # Header components
│   │   ├── sidebar/             # Sidebar navigation
│   │   └── notification-sidebar/ # Notification system
│   ├── hooks/                   # Custom React hooks
│   ├── icons/                   # Icon components
│   └── providers/               # Context providers
├── features/                    # Feature-based components
│   ├── defaults/                # Dashboard default components
│   └── order-list/              # Order management feature
├── data/                        # Static data and mock data
├── lib/                         # Utility functions and configurations
├── services/                    # API services and data fetching
├── styles/                      # Global styles and CSS
└── types/                       # TypeScript type definitions
```

## 🎨 Technology Stack

### Frontend Framework

- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - JavaScript library for building user interfaces
- **TypeScript 5** - Static type checking

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI primitives
- **shadcn/ui** - Re-usable components built with Radix UI
- **Lucide React** - Beautiful & consistent icon pack

### Data & State Management

- **@tanstack/react-table** - Headless table library
- **nuqs** - Type-safe search params state manager
- **Recharts** - Composable charting library

### Development Tools

- **Turbopack** - Fast bundler for development
- **ESLint** - Code linting
- **PostCSS** - CSS transformation

### Additional Libraries

- **date-fns** - Date utility library
- **lottie-react** - Render Lottie animations
- **next-themes** - Theme management
- **@faker-js/faker** - Generate fake data for development

## 🚀 Deployment

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your app will be deployed and you'll get a URL

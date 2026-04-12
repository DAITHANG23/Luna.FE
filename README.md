# 🌙 Luna - Restaurant Booking System (Frontend)

Luna is a modern, high-performance restaurant booking platform designed to provide the smoothest culinary discovery and reservation experience. The project utilizes the latest technologies in the React/Next.js ecosystem.

## ✨ Key Features

- 🔍 **Restaurant Discovery**: Search and filter restaurants by concept, location, and amenities.
- 📅 **Booking System**: Intuitive reservation process, supporting concept selection and real-time availability.
- 🔐 **Multi-method Authentication**: Login via Email/Password and Google OAuth.
- 🌐 **Multi-language (i18n)**: Full support for English and Vietnamese.
- 🔔 **Real-time Notifications**: Instant booking status updates via Socket.io.
- 🗺️ **Map Integration**: Display restaurant locations with Leaflet and Google Maps.
- 📱 **Responsive Design**: Optimized experience across all devices (Mobile, Tablet, Desktop).
- 🌓 **Light/Dark Mode**: Flexible interface according to user preference.

## 🛠️ Technologies Used

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Headless UI](https://headlessui.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Form Management**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **Real-time**: [Socket.io Client](https://socket.io/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🚀 Quick Start

### System Requirements

- Node.js 20+
- npm or yarn

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/your-repo/luna-fe.git
   cd luna-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy the `.env.example` file to `.env` and fill in the necessary values:
   ```bash
   cp .env.example .env
   ```

4. Run development environment:
   ```bash
   npm run dev
   ```
   The application will be running at [http://localhost:5000](http://localhost:5000)

## 📁 Main Directory Structure

```text
src/
├── @types/          # TypeScript interfaces/types definitions
├── api/             # Axios configuration and API endpoints
├── app/             # Next.js App Router (Routes, Layouts)
├── components/      # Shared UI components
├── constants/       # System constants and config
├── contexts/        # React Contexts
├── features/        # Business logic by feature (hooks, sockets)
├── libs/            # Redux configuration, i18n, shared components
└── utils/           # Utility functions
```

## 📜 Main Script Commands

- `npm run dev`: Run dev server at port 5000.
- `npm run build`: Build project for production.
- `npm run start`: Run production build.
- `npm run lint`: Check for code style errors.
- `npm run format`: Automatically format code with Prettier.

---
© 2024 Luna Project. Built with ❤️ for the best dining experience.

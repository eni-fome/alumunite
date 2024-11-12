# AlumUnite - User Management System

## Overview

AlumUnite is a comprehensive user management system built with Vue 3, TypeScript, and Tailwind CSS. The application provides a modern, responsive interface for managing users, roles, and permissions with features like real-time validation, bulk actions, and advanced filtering capabilities.

## 🚀 Features

### Core Functionality

- **User Management**
  - Create, Read, Update, Delete (CRUD) operations
  - Bulk user actions (delete, status toggle)
  - Profile photo upload with preview
  - Role-based access control
  - Status management (Active/Inactive)
  - Real-time form validation

### User Interface

- **Dashboard**

  - User statistics overview
  - Quick action cards
  - Recent users display
  - Activity monitoring

- **User Listing**

  - Advanced filtering and sorting
  - Responsive grid/table view
  - Status indicators
  - Role-based styling
  - Bulk selection and actions

- **User Forms**
  - Progressive enhancement
  - Real-time validation
  - File upload preview
  - Role selection
  - Status toggle

### Advanced Features

- **Settings Management**

  - Role permissions configuration
  - Default user settings
  - Notification preferences
  - System preferences

- **Data Handling**

  - Local storage persistence
  - Mock data implementation
  - Export functionality
  - Bulk operations

- **UI/UX Enhancements**
  - Toast notifications
  - Custom modals
  - Loading states
  - Error handling
  - Responsive design

## 🛠 Technology Stack

### Core Technologies

- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Static Type Checking
- **Tailwind CSS** - Utility-first CSS Framework
- **Vite** - Next Generation Frontend Tooling

### Key Dependencies

- **Vue Router** - Official router for Vue.js
- **Pinia** - State Management
- **Headless UI** - Unstyled UI components
- **Heroicons** - SVG icons
- **Yup** - Form validation
- **VeeValidate** - Form validation integration

## 📁 Project Structure

```
alumunite/
├── src/
# Static assets
│   ├── components/        # Reusable components
│   │   ├── common/       # Form-related components
│   │   ├── layout/       # Layout components
│   │   └── users/        # User-specific components
│   ├── composables/       # Reusable composition logic
│   ├── config/           # Configuration files
│   ├── models/           # TypeScript interfaces/types
│   ├── router/           # Vue Router configuration
│   ├── stores/           # Pinia stores
│   ├── utils/            # Utility functions
│   └── views/            # Page components
├── tests/                # Test files
└── types/                # Type declarations
```

## 🚦 Getting Started

### Prerequisites

```bash
node.js >= 14.x
npm >= 6.x
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/eni-fome/alumunite.git
cd alumunite
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

## 🔧 Configuration

### TypeScript Configuration

The project uses strict TypeScript configuration with the following key settings:

```json
{
	"compilerOptions": {
		"target": "ESNext",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"moduleResolution": "Node",
		"strict": true,
		"jsx": "preserve",
		"sourceMap": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"esModuleInterop": true,
		"lib": ["ESNext", "DOM"],
		"skipLibCheck": true
	}
}
```

## 📚 Components Guide

### NavigationBar

The main navigation component featuring:

- Responsive design
- Mobile menu
- Active route highlighting
- Gradient styling
- Icon integration

### UserCard

User display component with:

- Profile photo display
- Status indicator
- Role badge
- Action buttons
- Edit functionality

### UserTable

Advanced table component featuring:

- Sorting functionality
- Filtering options
- Bulk actions
- Status toggling
- Export capabilities

### Modal

Reusable modal component with:

- Customizable content
- Action buttons
- Animations
- Backdrop handling

## 🔐 State Management

### User Store

```typescript
interface UserState {
	users: User[];
	loading: boolean;
	error: string | null;
}

// Key actions
-addUser -
	updateUser -
	deleteUser -
	toggleUserStatus -
	bulkDeleteUsers -
	bulkToggleStatus;
```

### Store Features

- Local storage persistence
- Error handling
- Loading states
- Computed properties
- Type safety

## 🎨 Styling Guidelines

### Tailwind CSS Usage

- Consistent color palette
- Responsive design patterns
- Component-specific styling
- Custom utilities
- Dark mode support

### CSS Best Practices

- BEM methodology
- Responsive breakpoints
- Accessibility considerations
- Animation guidelines

## 🔍 Type Definitions

### Core Types

```typescript
interface User {
	id: string;
	name: string;
	email: string;
	role: "Admin" | "User" | "Guest";
	status: "Active" | "Inactive";
	profilePhoto?: string;
}

interface Toast {
	id: number;
	message: string;
	type: "success" | "error" | "info";
}
```

## 🧪 Testing

### Unit Tests

- Component testing
- Store testing
- Utility function testing
- Mock data handling

## 🚀 Deployment

### Build

```bash
npm run build
```

### Production Considerations

- Environment configuration
- Performance optimization
- Error tracking
- Analytics integration

## 🔄 State Management Flow

1. User actions trigger store methods
2. Store updates local storage
3. Components react to state changes
4. UI updates reflect new state

## 🎯 Future Enhancements

- [ ] Advanced search functionality
- [ ] User activity logs
- [ ] Role-based dashboard views
- [ ] Enhanced analytics
- [ ] Batch import/export
- [ ] Custom role creation
- [ ] User groups/teams
- [ ] Audit logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Vue.js team
- Tailwind CSS team
- Headless UI contributors
- Open source community

## 📞 Support

For support, email reachfomealalor@gmail.com or create an issue in the repository.


---

> This project was created as part of a frontend engineering assessment, demonstrating modern Vue.js development practices, TypeScript integration, and responsive design principles.

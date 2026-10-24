import { NavItem } from '../models/Navigation/nav.model';

export const NAV_CONFIG: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    menuTitle: 'Dashboard Navigation',
    route: '',
    icon: 'bi bi-columns-gap',
    children: [
      {
        id: 'analytics',
        title: 'Reading Analytics',
        route: '/analytics',
        description: 'Track pages read, stats, and monthly trends.',
        icon: 'bi bi-graph-up',
        iconColor: '#3b82f6',
      },
      {
        id: 'goals',
        title: 'Reading Goals',
        route: '/goals',
        description: 'Manage yearly reading targets and progress.',
        icon: 'bi bi-bullseye',
        iconColor: '#22c55e',
      },
    ],
  },
  {
    id: 'library',
    title: 'Library',
    menuTitle: 'Saved Media',
    route: '/library',
    icon: 'bi bi-book',
    children: [
      {
        id: 'my-books',
        title: 'My Collection',
        route: '/library/collection',
        description: 'Access downloaded books and reading lists.',
        icon: 'bi bi-collection',
        iconColor: '#a855f7',
      },
      {
        id: 'favorites',
        title: 'Favorites & Wishlist',
        route: '/library/favorites',
        description: 'Saved titles for later reading.',
        icon: 'bi bi-heart',
        iconColor: '#ef4444',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community',
    menuTitle: 'Social Networks',
    route: '/community',
    icon: 'bi bi-people',
  },
  {
    id: 'account-settings',
    title: 'Account Settings',
    menuTitle: 'Sub-Pages',
    route: '/personal-information',
    icon: 'bi bi-gear',
    children: [
      {
        id: 'personal-info',
        title: 'Personal Information',
        route: '/personal-information',
        description: 'Update profile display name and contact email.',
        icon: 'bi bi-person',
        iconColor: '#06b6d4',
      },
      {
        id: 'security',
        title: 'Security & Password',
        route: '/account-security',
        description: 'Change password and secure your account.',
        icon: 'bi bi-shield-lock',
        iconColor: '#f59e0b',
      },
    ],
  },
];

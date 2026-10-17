import { NavItem } from '../models/Navigation/nav.model';

export const NAV_CONFIG: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    route: '',
    children: [
      {
        id: 'analytics',
        title: 'Reading Analytics',
        route: '/analytics',
        description: 'Track pages read, stats, and monthly trends.',
      },
      {
        id: 'goals',
        title: 'Reading Goals',
        route: '/goals',
        description: 'Manage yearly reading targets and progress.',
      },
    ],
  },
  {
    id: 'library',
    title: 'Library',
    route: '/library',
    children: [
      {
        id: 'my-books',
        title: 'My Collection',
        route: '/library/collection',
        description: 'Access downloaded books and reading lists.',
      },
      {
        id: 'favorites',
        title: 'Favorites & Wishlist',
        route: '/library/favorites',
        description: 'Saved titles for later reading.',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community',
    route: '/community',
  },
  {
    id: 'account-settings',
    title: 'Account Settings',
    route: '/personal-information',
    children: [
      {
        id: 'personal-info',
        title: 'Personal Information',
        route: '/personal-information',
        description: 'Update profile display name and contact email.',
      },
      {
        id: 'security',
        title: 'Security & Password',
        route: '/account-security',
        description: 'Change password and secure your account.',
      },
    ],
  },
];

import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './features/auth/login/login';
import { UserDashboard } from './features/users/user-dashboard/user-dashboard';
import { SignUp } from './features/auth/signup/signup';
import { ServerError } from './shared/components/server-error/server-error';
import { authGuard } from './core/guards/auth-guard';
import { AccountSettings } from './features/settings/account-settings/account-settings';
import { PersonalInformation } from './features/settings/personal-information/personal-information';
import { SecurityPassword } from './features/settings/security-password/security-password';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: UserDashboard },
      { path: 'account-settings', component: AccountSettings, children: [
        { path: '', component: PersonalInformation },
        { path: 'personal-information', component: PersonalInformation },
        { path: 'account-security', component: SecurityPassword },
      ]},
    ],
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'signup', component: SignUp },
    ],
  },
  {
    path: 'server-error',
    component: ServerError,
  },
];

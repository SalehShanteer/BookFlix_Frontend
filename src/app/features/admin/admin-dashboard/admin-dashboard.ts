import { Component } from '@angular/core';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';

@Component({
  selector: 'app-admin-dashboard',
  imports: [LocalePipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {

}

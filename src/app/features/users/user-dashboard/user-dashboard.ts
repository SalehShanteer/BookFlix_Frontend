import { Component } from '@angular/core';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';

@Component({
  selector: 'app-user-dashboard',
  imports: [LocalePipe],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss'
})
export class UserDashboard {

}

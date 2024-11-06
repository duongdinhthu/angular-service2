import { Component } from '@angular/core';
import {UserService} from '../../service/userSevice';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordData = { email: '', oldPassword: '', newPassword: '' };

  constructor(private userService: UserService) {}

  changePassword() {
    this.userService.changePassword(this.changePasswordData).subscribe(
      (response) => {
        console.log(response);
        alert('Password changed successfully');
      },
      (error) => {
        console.error(error);
        alert('Failed to change password');
      }
    );
  }
}

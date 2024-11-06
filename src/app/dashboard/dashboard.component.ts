import { Component } from '@angular/core';
import {UserService} from '../../service/userSevice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['']); // Chuyển hướng về trang login sau khi logout
  }

  sendTokenToBackend() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserInfo(token).subscribe(
        (response) => {
          console.log('Thông tin người dùng:', response);
        },
        (error) => {
          console.error('Lỗi khi lấy thông tin:', error);
        }
      );
    }
  }
}

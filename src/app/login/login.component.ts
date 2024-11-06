import { Component } from '@angular/core';
import {UserService} from '../../service/userSevice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' }; // Khai báo loginData để giữ dữ liệu form

  constructor(public userService: UserService,private router: Router) {}

  login() {
    // Sử dụng đối tượng user để gửi dữ liệu login
    this.userService.login(this.loginData).subscribe((response) => {
      console.log(response)
      this.router.navigate(['/dashboard']); // Chuyển hướng đến dashboard

    });
  }
}

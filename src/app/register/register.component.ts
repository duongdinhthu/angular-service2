import { Component } from '@angular/core';
import {UserService} from '../../service/userSevice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData = {
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientPassword: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService) {}

  register() {
    if (this.registerData.patientPassword !== this.registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Gửi request đến backend để đăng ký bệnh nhân
    const registrationDto = {
      patientName: this.registerData.patientName,
      patientEmail: this.registerData.patientEmail,
      patientPhone: this.registerData.patientPhone,
      patientPassword: this.registerData.patientPassword,
    };

    this.userService.registerPatient(registrationDto).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Xử lý khi đăng ký thành công, ví dụ như chuyển hướng hoặc thông báo
      },
      (error) => {
        console.error('Error during registration', error);
        alert('Đã có lỗi xảy ra trong quá trình đăng ký');
      }
    );
  }
}

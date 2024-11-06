import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.development';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  private baseUrl = environment.baseUrl;
  private endPoint = "/api/auth";

  login(loginData: any): Observable<any>{
  return this.http.post<any>(`${this.baseUrl}${this.endPoint}/login`, loginData).pipe();
  }
  changePassword(changePasswordData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.endPoint}/change-password`, changePasswordData).pipe();
  }
  logout() {
    localStorage.removeItem('token');
  }

  // Phương thức lấy thông tin người dùng sau khi đăng nhập
  getUserInfo(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.endPoint}/user-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  registerPatient(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/patient`, registerData);
  }
}

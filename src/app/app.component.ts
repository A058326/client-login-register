import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class AppComponent {
  // 🟢 שדה ששומר איזה טאב פעיל (ברירת מחדל: login)
  activeTab: 'login' | 'register' = 'login';

  // 🟢 נתוני הטפסים
  loginData = { userName: '', password: '' };
  registerData = { userName: '', password: '', confirmPassword: '' };

  // 🟢 הודעות למשתמש
  message = '';
  messageType: 'success' | 'danger' | 'info' | '' = '';

  // 🔵 כתובת השרת שלך
  baseUrl = 'http://localhost:5174/api/members';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  // שינוי טאב (כשמשתמש לוחץ על Login/Register)
  setActiveTab(tab: 'login' | 'register') {
    this.activeTab = tab;
    this.clearMessage();
  }

  // ניקוי הודעות
  clearMessage() {
    this.message = '';
    this.messageType = '';
  }

  // התחברות
  login() {
    this.http.post(this.baseUrl + '/login', this.loginData).subscribe({
      next: (res) => {
        console.log('login success', res);
        this.message = 'Login successful!';
        this.messageType = 'success';
        this.cdr.detectChanges(); // מוודא ש־change detection מרענן את התצוגה
      },
      error: (err) => {
        console.log('login error', err);
        this.message = err?.error ?? 'Login failed';
        this.messageType = 'danger';
        this.cdr.detectChanges();
      },
    });
  }

  // הרשמה
  register() {
    const pwd = this.registerData.password?.trim() ?? '';
    const confirm = this.registerData.confirmPassword?.trim() ?? '';

    if (pwd !== confirm) {
      this.message = 'Passwords do not match';
      this.messageType = 'danger';
      this.cdr.detectChanges();
      return;
    }

    this.http
      .post(this.baseUrl + '/register', {
        userName: this.registerData.userName,
        password: this.registerData.password,
      })
      .subscribe({
        next: (res) => {
          console.log('register success', res);
          this.message = 'Registration successful!';
          this.messageType = 'success';
          this.cdr.detectChanges(); // מעדכן את התצוגה מיד
        },
        error: (err) => {
          console.log('register error', err);
          this.message = err?.error ?? 'Registration failed';
          this.messageType = 'danger';
          this.cdr.detectChanges();
        },
      });
  }
}

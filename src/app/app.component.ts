import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [HttpClientModule], // הוספת HttpClientModule ל־standalone component
})
export class AppComponent {
  baseUrl = 'https://localhost:5174/api/members'; // כתובת השרת API (לוודא פורט נכון)
  // אובייקטים שנקשרים לטפסים
  registerData = { userName: '', password: '' };
  loginData = { userName: '', password: '' };

  message = ''; // הודעה למשתמש (נציג ב־HTML)

  constructor(private http: HttpClient) {}
  // קריאה להרשמה
  register() {
    this.http.post(this.baseUrl + '/register', this.registerData).subscribe({
      next: (res) => (this.message = 'Registration successful!'),
      error: (err) => (this.message = err.error),
    });
  }
  // קריאה להתחברות
  login() {
    this.http.post(this.baseUrl + '/login', this.loginData).subscribe({
      next: (res) => (this.message = 'Login successful!'),
      error: (err) => (this.message = err.error),
    });
  }
}

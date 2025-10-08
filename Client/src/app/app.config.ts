import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // מודול לניהול טפסים ו־ngModel
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

// הגדרת האפליקציה
export const appConfiguration: ApplicationConfig = {
  providers: [
    // מספק את HttpClient
    provideHttpClient(),

    // ספק מודולים שאינם Standalone באמצעות importProvidersFrom
    importProvidersFrom(BrowserModule, FormsModule),

    // ניתן להוסיף כאן ספקיות נוספות
  ],
};

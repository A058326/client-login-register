import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfiguration } from './app/app.config';
bootstrapApplication(AppComponent, appConfiguration).catch((err) => console.error(err));

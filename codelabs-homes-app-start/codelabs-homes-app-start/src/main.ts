import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import routeConfig from './routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    importProvidersFrom(HttpClientModule),  // Important for HttpClient to work!
  ]
});

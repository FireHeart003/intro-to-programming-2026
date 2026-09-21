import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withExperimentalAutoCleanupInjectors } from '@angular/router';
import { routes } from './app.routes';
import { provideStellar } from '@hypertheory-labs/stellar-ng-devtools';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStellar(),
    provideRouter(routes, withExperimentalAutoCleanupInjectors()),
  ],
};

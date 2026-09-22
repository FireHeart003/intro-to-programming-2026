import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withExperimentalAutoCleanupInjectors,
} from '@angular/router';
import { routes } from './app.routes';
import { provideStellar } from '@hypertheory-labs/stellar-ng-devtools';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStellar(),
    provideRouter(routes, withExperimentalAutoCleanupInjectors(), withComponentInputBinding()),
    // withComponentInputBinding says you are OK with Angular reading from the URL to fulfill inputs on a page.
  ],
};

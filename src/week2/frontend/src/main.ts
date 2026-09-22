import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { isDevMode } from '@angular/core';

// when you start, if you are in "dev mode", start msw, otherwise don't.

async function enableMocking() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    return worker.start({ onUnhandledRequest: 'bypass' });
  } else {
    return;
  }
}

enableMocking().then(() => bootstrapApplication(App, appConfig).catch((err) => console.error(err)));

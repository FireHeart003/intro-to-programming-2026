import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <div>
      <button (click)="decrement()" class="btn btn-warning">-</button>
      <span data-testid="current">{{ current }}</span>
      <button (click)="increment()" class="btn btn-primary">+</button>
    </div>
  `,
  styles: ``,
})
export class Counter {
  current = 1;

  increment() {
    this.current += 1;
  }
  decrement() {
    this.current -= 1;
  }
}

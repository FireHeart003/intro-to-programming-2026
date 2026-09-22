import { Service, signal } from '@angular/core';
//@Injectable({providedIn: 'root'})
@Service() // Note. This "auto-provides" this service. Also note, Jeff HATES this.
export class Account {
  private readonly currentBalance = signal(5000);

  public deposit(amount: number) {
    this.currentBalance.update((cb) => cb + amount);
  }

  public withdraw(amount: number) {
    this.currentBalance.update((cb) => cb - amount);
  }

  public get balance() {
    return this.currentBalance.asReadonly();
  }
}

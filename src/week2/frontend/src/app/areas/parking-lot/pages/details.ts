import { Component, input } from '@angular/core';

@Component({
  selector: 'app-parking-lot-details',
  imports: [],
  template: `
    <p>The details of item {{ id() }}</p>
    <pre>
    this is where we can do things like add links, add notes, etc. or mark it "learned"

</pre>
  `,
  styles: ``,
})
export class Details {
  id = input.required<string>();
}

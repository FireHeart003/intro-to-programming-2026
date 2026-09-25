import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-status-check',
  imports: [JsonPipe],
  template: `
    <p>Status Check</p>
    <pre
      >{{ statusResource.value() | json }}

  </pre>
  `,
  styles: ``,
})
export class StatusCheck {
  statusResource = httpResource<{ message: string; checkedAt: string }>(
    () => 'http://localhost:1337/status',
  );
}

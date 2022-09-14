import { Component, Input } from '@angular/core';

@Component({
  selector: 'validation',
  template: `
    <div class="validation">
      <div *ngFor="let message of messages">{{message}}</div>
    </div>
  `,
  styles: [
    `
    .validation {
      color: red;
    }`,
  ],
})
export class ValidationComponent {
  @Input() messages: Array<string>;
}

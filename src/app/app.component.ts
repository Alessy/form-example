import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public hexadecimalValue: string;

  public dropdownValue: string = '';

  onSubmit(value, form: NgForm) {
    alert(`Submit: ${JSON.stringify(value)}`);
    if (form.invalid) {
      console.log('invalid');
      return;
    }

    form.resetForm();
    form.reset();
  }
}

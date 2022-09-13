import {Directive} from '@angular/core';

import {
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  AbstractControl,
  AsyncValidatorFn,
  Validator
} from '@angular/forms';

import { Observable, Observer, of } from 'rxjs';

@Directive({
  selector: '[hexadecimal][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: HexadecimalValueValidator, multi: true }
  ]
})
export class HexadecimalValueValidator implements Validator {
  validate(control: AbstractControl): Observable<{[validator: string]: string}> {
    const expression = /^([0-9a-fA-F]+)$/i;
    if (!control.value) { // the [required] validator will check presence, not us
      return of(null);
    }

    const value = control.value.trim();
    if (expression.test(value)) {
      return of(null);
    }

    // Example of how to do asynchronous validation
    const observer = new Observable((observer: Observer<any>) => {
      observer.next({ hexadecimal: 'Please enter a hexadecimal value (alphanumeric, 0-9 and A-F)' });
      observer.complete();
    });

    return observer;
  }
}

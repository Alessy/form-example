import {NgModel} from '@angular/forms';

import {Observable} from 'rxjs';

import {ValueAccessorBase} from './value-accessor';

import { map } from 'rxjs/operators';

import {
  AsyncValidatorArray,
  ValidatorArray,
  ValidationResult,
  message,
  validate,
} from './validate';
import { Injector } from '@angular/core';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  protected abstract model: NgModel;

  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
    private injector: Injector
  ) {
    super(injector);
  }

  protected validate(): Observable<ValidationResult> {
    return validate
      (this.validators, this.asyncValidators)
      (this.model.control);
  }

  protected get invalid(): Observable<boolean> {
    return this.validate().pipe(map(v => Object.keys(v || {}).length > 0));
  }

  protected get failures(): Observable<Array<string>> {
    return this.validate().pipe(map(v => Object.keys(v).map(k => message(v, k))));
  }
}
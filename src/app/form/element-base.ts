import { Injector } from '@angular/core';
import { NgModel } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AsyncValidatorArray, message, validate, ValidationResult, ValidatorArray } from './validate';
import { ValueAccessorBase } from './value-accessor';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  protected abstract model: NgModel;

  constructor(
    private validators: ValidatorArray,
    private asyncValidators: AsyncValidatorArray,
    private injector: Injector
  ) {
    super(injector);
  }

  protected validateInnerModel(): Observable<ValidationResult> {
    if (this.model && this.model.control) {
      return validate(this.validators, this.asyncValidators)(this.model.control);
    } else {
      return of(null);
    }
  }

  public get invalid(): Observable<boolean> {
    return combineLatest([this.validateInnerModel(), this.getErrorsFromOuterModel()]).pipe(
      map(v => {
        let errors = Object.assign(v[0] || {}, v[1] || {});
        return Object.keys(errors || {}).length > 0;
      })
    )
  }

  public get failures(): Observable<Array<string>> {
    return combineLatest([this.validateInnerModel(), this.getErrorsFromOuterModel()]).pipe(
      map(v => {
        let errors = Object.assign(v[0] || {}, v[1] || {});
        return Object.keys(errors || {}).map(k => message(errors, k));
      })
    )
  }

  private getErrorsFromOuterModel(): Observable<ValidationResult> {
    if (this.control == null || this.control.errors == null) {
      return of(null);
    }

    return of(this.control.errors);
  }
}

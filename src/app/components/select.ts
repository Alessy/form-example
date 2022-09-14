import {
  Component,
  Optional,
  Inject,
  Input,
  ViewChild,
  Injector,
} from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import { ElementBase, animations } from '../form';

@Component({
  selector: 'form-select',
  template: `
    <div>
      <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
      <mat-form-field>
        <mat-select
            required
            [(ngModel)]="value"
            [ngClass]="{invalid: (invalid | async)}"
            [id]="identifier">
          <mat-option value="null">{{placeholder}}</mat-option>
          <mat-option [value]="1">Option One</mat-option>
          <mat-option [value]="2">Option Two</mat-option>
          <mat-option [value]="3">Option Three</mat-option>
          <mat-option [value]="4">Option Four</mat-option>
          <ng-content></ng-content>
        </mat-select>
        <mat-hint *ngIf="(invalid | async)">
          <validation
            [messages]="failures | async">
          </validation>
        </mat-hint>
      </mat-form-field>
    </div>
  `,
  animations,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormSelectComponent,
      multi: true,
    },
  ],
})
export class FormSelectComponent extends ElementBase<string> {
  @Input() public label: string;
  @Input() public placeholder: string;

  @ViewChild(NgModel) model: NgModel;

  public identifier = `form-select-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    injector: Injector
  ) {
    super(validators, asyncValidators, injector);
  }
}

let identifier = 0;

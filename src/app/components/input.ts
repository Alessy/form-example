import {
  Component,
  Optional,
  Inject,
  Input,
  ViewChild,
  Injector,
  HostBinding,
} from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import { ElementBase, animations } from '../form';

@Component({
  selector: 'form-text',
  template: `
    <div>
      <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
      <mat-form-field>
        <input
          type="text"
          matInput
          [placeholder]="placeholder"
          [(ngModel)]="value"
          [ngClass]="{invalid: (invalid | async) }"
          [id]="identifier"
          required
        />
        <mat-hint *ngIf="(invalid | async)">
          <validation
            [@flyInOut]="'in,out'"
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
      useExisting: FormTextComponent,
      multi: true,
    },
  ],
})
export class FormTextComponent extends ElementBase<string> {
  @Input() public label: string;
  @Input() public placeholder: string;

  @HostBinding('attr.aria-required')
  @Input()
  public required: boolean;
  // @ViewChild(NgModel) model: NgModel;
  @ViewChild(NgModel, { static: true }) model: NgModel;

  public identifier = `form-text-${identifier++}`;

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    injector: Injector
  ) {
    super(validators, asyncValidators, injector);
  }
}

let identifier = 0;

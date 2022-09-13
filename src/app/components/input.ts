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

import {ElementBase, animations} from '../form';

@Component({
  selector: 'form-text',
  template: `
    <div>
      <label *ngIf="label" [attr.for]="identifier">{{label}}</label>
      <input
        type="text"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        [ngClass]="{invalid: (invalid | async)}"
        [id]="identifier"
      />
      <validation
        *ngIf="invalid | async"
        [messages]="failures | async">
      </validation>
    </div>
  `,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormTextComponent,
    multi: true,
  }],
})
export class FormTextComponent extends ElementBase<string> {
  @Input() public label: string;
  @Input() public placeholder: string;

  @ViewChild(NgModel) model: NgModel;

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
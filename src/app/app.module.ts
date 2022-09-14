import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import * as components from './components';
import { FormTextComponent, ValidationComponent } from './components';
import { FormSelectComponent } from './components/select';
import { HexadecimalValueValidator } from './validators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const allComponents = Object.keys(components).map((k) => components[k]);

@NgModule({
  declarations: [
    AppComponent,
    FormTextComponent,
    FormSelectComponent,
    ValidationComponent,
    HexadecimalValueValidator
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [FormTextComponent, FormSelectComponent, ValidationComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

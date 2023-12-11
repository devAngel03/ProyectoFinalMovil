import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddUpdateMultaComponent } from './components/add-update-multa/add-update-multa.component';
import { AddUpdateLicenseComponent } from './components/add-update-license/add-update-license.component';
import { AddUpdateMotiveComponent } from './components/add-update-motive/add-update-motive.component';
import { AddUpdateCarComponent } from './components/add-update-car/add-update-car.component';
import { ModalMultaComponent } from './components/modal-multa/modal-multa.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateMultaComponent,
    AddUpdateLicenseComponent,
    AddUpdateMotiveComponent,
    AddUpdateCarComponent,
    ModalMultaComponent,
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    AddUpdateMultaComponent,
    AddUpdateLicenseComponent,
    AddUpdateMotiveComponent,
    AddUpdateCarComponent,
    ModalMultaComponent,

  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }

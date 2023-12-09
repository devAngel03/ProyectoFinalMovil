import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicensePageRoutingModule } from './license-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { LicensePage } from './license.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicensePageRoutingModule,
    SharedModule
  ],
  declarations: [LicensePage]
})
export class LicensePageModule {}

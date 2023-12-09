import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZodiacPageRoutingModule } from './zodiac-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { ZodiacPage } from './zodiac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZodiacPageRoutingModule,
    SharedModule
  ],
  declarations: [ZodiacPage]
})
export class ZodiacPageModule {}

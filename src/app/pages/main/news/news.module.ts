import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { HttpClientModule } from '@angular/common/http';

import { NewsPage } from './news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}

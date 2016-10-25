import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { QueryService } from '../shared/query-service/index';
import { Angular2DataTableModule } from 'angular2-data-table';

@NgModule({
  imports: [CommonModule, SharedModule, Angular2DataTableModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [QueryService]
})
export class HomeModule { }

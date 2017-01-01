import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ResultsComponent } from './results.component';
import { Angular2DataTableModule } from 'angular2-data-table';



@NgModule({
  imports: [CommonModule, Angular2DataTableModule, SharedModule],
  declarations: [ResultsComponent],
  exports: [ResultsComponent]
})
export class ResultsModule {}

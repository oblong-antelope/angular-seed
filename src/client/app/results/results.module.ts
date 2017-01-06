import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ResultsComponent } from './results.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  imports: [CommonModule, SharedModule, NgxDatatableModule],
  declarations: [ResultsComponent],
  exports: [ResultsComponent]
})
export class ResultsModule {}

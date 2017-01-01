import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { GraphComponent } from './graph.component';
import { GraphService } from './graph.service';


@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [GraphComponent],
  providers: [GraphService],
  exports: [GraphComponent]
})
export class GraphModule {}

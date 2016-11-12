import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing.component';
import { QueryService } from '../shared/query-service/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LandingComponent],
  exports: [LandingComponent],
  providers: [QueryService]
})
export class LandingModule { }

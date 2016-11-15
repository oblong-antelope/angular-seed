import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { GraphComponent } from './graph/graph.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultsComponent } from './results/results.component';
import { QueryService } from '../shared/query-service/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent, GraphComponent, ProfileComponent, ResultsComponent],
  exports: [HomeComponent, GraphComponent, ProfileComponent, ResultsComponent],
  providers: [QueryService]
})
export class LandingModule { }

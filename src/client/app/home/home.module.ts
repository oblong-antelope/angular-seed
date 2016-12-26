import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';
import { GraphComponent } from './graph/graph.component';
import { ProfileComponent } from './profile/profile.component';
import { KeywordGridModalComponent } from './profile/modal/keyword-grid-modal.component';
import { ResultsComponent } from './results/results.component';

import { QueryService } from '../shared/query-service/index';
import { GraphService } from './graph/graph.service';

import { Angular2DataTableModule } from 'angular2-data-table';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


@NgModule({
  imports: [CommonModule,
            SharedModule,
            HomeRoutingModule,
            Angular2DataTableModule,
            Ng2Bs3ModalModule],
  declarations: [HomeComponent,
                 GraphComponent,
                 KeywordGridModalComponent,
                 ProfileComponent,
                 ResultsComponent],
  exports: [HomeComponent, GraphComponent, ResultsComponent],
  providers: [QueryService, GraphService]
})
export class HomeModule { }

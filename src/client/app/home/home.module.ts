import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';
import { ResultsModule } from '../results/results.module';
import { GraphModule } from '../graph/graph.module';

import { QueryService } from '../shared/query-service/index';


@NgModule({
  imports: [CommonModule,
            SharedModule,
            UserModule,
            ProfileModule,
            ResultsModule,
            GraphModule,
            HomeRoutingModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [QueryService]
})
export class HomeModule { }

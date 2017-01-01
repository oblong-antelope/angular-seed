import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Components
 */
import { SearchBarComponent } from './search-bar/index';
import { QueryService } from './query-service/index';
import { LoadingBarComponent } from './loading-bar/index';

/**
 * Directives
 */
import { BackButtonDirective } from './back-button/index';

/**
 * Providers 
 */

/**
 * Global Third Party Libraries
 */
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [SearchBarComponent,
                 LoadingBarComponent,
                 BackButtonDirective],
  exports: [SearchBarComponent,
            BackButtonDirective,
            LoadingBarComponent,
            CommonModule,
            FormsModule,
            RouterModule,
            Ng2Bs3ModalModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [QueryService]
    };
  }
}

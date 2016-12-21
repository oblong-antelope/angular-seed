import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Components
 */
import { ToolbarComponent } from './toolbar/index';
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
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [ToolbarComponent,
                 SearchBarComponent,
                 LoadingBarComponent,
                 BackButtonDirective],
  exports: [ToolbarComponent,
            SearchBarComponent,
            BackButtonDirective,
            LoadingBarComponent,
            CommonModule,
            FormsModule,
            RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [QueryService]
    };
  }
}

import { Component } from '@angular/core';

/**
 * This class represents the loading bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-loading-bar',
  template: `<img src="../../../../assets/loader.gif" alt="Loading Bar" class="loading-gif">`,
  styles: [`.loading-gif {
                display: block;
                margin-left: auto;
                margin-right: auto;
            }`],
})
export class LoadingBarComponent {
  location:string = '../../../assets/loader.gif';
}

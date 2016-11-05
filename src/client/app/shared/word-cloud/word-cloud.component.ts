import { Component, OnInit, Input } from '@angular/core';

declare var d3:any;

/**
 * This class represents the lazy loaded Word Component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-word-cloud',
  template: `
                <p> I am word cloud Component </p>
                <p *ngFor="let w of words"> {{w}} </p>
            `
})
export class WordCloudComponent implements OnInit {
    @Input('words') words: any[];

    ngOnInit() {
        console.log(this.words);
    }
}

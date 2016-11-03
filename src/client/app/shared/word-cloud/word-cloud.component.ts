import { Component, OnInit, Input } from '@angular/core';

declare var d3:any;

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-word-cloud',
  template: `<template>{{words}}</template>`
})
export class WordCloudComponent implements OnInit{
    @Input('words') words: any[];

    constructor() {}

    ngOnInit() {
        console.log(this.words);
    }
}

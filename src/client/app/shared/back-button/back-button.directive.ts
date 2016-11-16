import { Directive, Input, ElementRef, HostListener, Renderer, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/**
 * This class represents the search bar component.
 */
@Directive({
  selector: '[sdBackButton]',
})
export class BackButtonDirective implements OnInit{

  @Input() modified:boolean = false;

  /**
   * Initialises the directive
   * @param {ElementRef} ef - The injected ElementRef
   * @param {Location} loc - The injected Location provider
   */
  constructor(private ef: ElementRef, private loc:Location, private renderer:Renderer) {}

  ngOnInit() {
    this.renderer.setElementStyle(this.ef.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('click')
  onClick() {
    if(this.modified) {
      this.modified = !window.confirm('There have been some modifications, please confirm');
    }

    if(!this.modified){
      this.loc.back();
    }
  }

}

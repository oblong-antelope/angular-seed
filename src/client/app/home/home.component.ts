import { Component, ElementRef, ViewChild, Renderer, OnInit } from '@angular/core';

/**
 * This class represents the lazy loaded home
 Component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  home_route:boolean = true;
  results_route:boolean = false;
  profile_route:boolean = false;
  right_open:boolean = true;

  @ViewChild('leftContainer') left : ElementRef;
  // @ViewChild('rightContainer') right : ElementRef;


  constructor(private renderer:Renderer){}

  ngOnInit() {
    this.openRightIfChecked();
  }

  toggleRight() {
    this.right_open = !this.right_open;
    this.openRightIfChecked();
  }

  openRightIfChecked() {
    if(this.right_open) {
        this.renderer.setElementStyle(this.left.nativeElement, 'width', '60%');
    } else {
        this.renderer.setElementStyle(this.left.nativeElement, 'width', '100%');
    }
  }
}

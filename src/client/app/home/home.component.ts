import { Component, ElementRef, ViewChild, Renderer, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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


  /**
   * Routing Variables
   */
  home_route:boolean = false; //default true
  results_route:boolean = false;
  profile_route:boolean = false;

  /**
   * Results Route Variables
   */
  results_url_id:number = -1;
  results_query:string = '';

  /**
   * Profile Route Variables
   */
  profile_url_id:string = '';

  /**
   * View Variables
   */
  right_open:boolean = false;
  @ViewChild('leftContainer') left : ElementRef;
  // @ViewChild('rightContainer') right : ElementRef;

  /**
   * Creates an instance of HomeComponent
   * @param {Renderer} renderer - injects the renderer
   * @param {Router} router - injects the router service
   * @param {ActivatedRoute} ar - injects details of the current activated route
   */
  constructor(private renderer:Renderer,
              private router: Router,
              private ar: ActivatedRoute) {}

  /**
   * Runs on View Init
   * Initialises the correct view dependant on the url
   */
  ngOnInit() {
    let url:string = this.router.url;
    if(url.includes('/search')) {
      this.initResults();
    } else if (url.includes('/profile')) {
      this.initProfile();
    } else {
      this.initHome();
    }
    this.openRightIfChecked();
  }

  /**
   * Initialises the results components
   * Extracts id and query from the url
   */
  initResults() {
    this.results_route = true;
    this.right_open = true;
    this.ar.params.subscribe(
      params => {
        this.results_url_id = +params['id'];
        this.results_query = params['query'];
      },
      error => this.routeErrorRedirect(error)
    );
  }

  /**
   * Initialises the profile components
   * Extracts the id from the url
   */
  initProfile() {
    this.profile_route = true;
    this.right_open = true;
    this.ar.params.subscribe(
      params => {
        this.profile_url_id = params['id'];
      },
      error => this.routeErrorRedirect(error)
    );
  }

  /**
   * Initialises the home components
   * No extraction necessary
   */
  initHome() {
    this.home_route = true;
    this.right_open = false;
  }

  /**
   * Toggles the right menu
   */
  toggleRight() {
    this.right_open = !this.right_open;
    this.openRightIfChecked();
  }

  /**
   * Sets the css to the correct width if the right menu is open
   */
  openRightIfChecked() {
    if(this.right_open) {
        this.renderer.setElementStyle(this.left.nativeElement, 'width', '60%');
    } else {
        this.renderer.setElementStyle(this.left.nativeElement, 'width', '100%');
    }
  }

  /**
   * Any errors in routing will cause a redirect back to home page.
   */
  routeErrorRedirect(error:any) {
    console.log(error);
    this.router.navigate(['/']);
  }

}

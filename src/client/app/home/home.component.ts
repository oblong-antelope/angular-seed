import { Component, ElementRef, ViewChild, Renderer, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModalComponent, SignupModalComponent } from '../user/index';

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

  tagline:string = 'The search tool to find academics staff and researchers';

  /**
   * Routing Variables
   */
  home_route:boolean = false; //default true
  results_route:boolean = false;
  profile_route:boolean = false;

  /**
   * Results Route Variables
   */
  results_query:string = '';

  /**
   * Profile Route Variables
   */
  profile_url_id:string = '';

  /**
   * Graph Variables
   */
  graph_context: Object = {};

  /**
   * User Account Modal Variables
   */
  @ViewChild('loginModal') login_modal : LoginModalComponent;
  @ViewChild('signinModal') signin_modal : SignupModalComponent;

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
   * Runs after the View has Initialised
   * For displaying the modals
   */
  ngAfterInit() {
    let url:string = this.router.url;
    if(url.includes('/login')) {
      this.login_modal.open();
    } else if (url.includes('/signin')) {
      this.signin_modal.open();
    }
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
        this.graph_context = {personIdx: this.profile_url_id};
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
   * Handles the click of a point on the graph, get a person object back
   */
  onGraphPointClick(e: any) {
    this.results_query = e.name;
  }

  /**
   * Sets the css to the correct width if the right menu is open
   */
  openRightIfChecked() {
    if(this.right_open) {
        this.renderer.setElementStyle(this.left.nativeElement, 'width', '50%');
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

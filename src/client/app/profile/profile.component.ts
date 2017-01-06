import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Profile } from '../models/index';
import { QueryService } from '../shared/index';
import { UserService } from '../user/index';
import { KeywordGridModalComponent } from './modal/keyword-grid-modal.component';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  @Input('id') id: string = '';

  errorMessage: string;
  loading: boolean = false;
  arrived: boolean = false;
  keywordList: Object[] = [];
  sortedKeywordList: string[] = [];
  displayKeywordList: string[] = [];

  profile: Profile = {
     name: {first: '', last: ''},
     keywords: {},
  };

  totalValue: number = 1;

  @ViewChild('myModal') modal: KeywordGridModalComponent;

  /**
   * Creates an instance of the ProfileComponent with the injected
   * QueryService
   * 
   * @param {QueryService} queryService - The injected QueryService
   * @param {QueryService} queryService - The injected QueryService
   */
  constructor(private queryService: QueryService,
              private userService: UserService) {
  }

  /**
   * Initialises the id and gets the profile.
   * Uses the ActivatedRoute to get the url parameters and data
   */
  ngOnInit() {
    // this.updateProfile();
  }

  /**
   * Updates profile when we change the id
   */
  ngOnChanges(changes: any) {
    this.updateProfile();
  }

  /**
   * Returns true if a user is currently logged in
   */
  idloggedin() {
    return this.userService.isLoggedIn();
  }

  /**
   * Returns true iff a user is currently logged in,
   * and the currently viewed profile is theres
   * Check this is true before allowing keyword editing
   */
  isloggedinusersprofile() {
    return this.userService.isLoggedIn() &&
              this.userService.getId() === this.id;
  }

  /**
   * Updates the profile from the server with current id.
   */
  updateProfile() {
    if(this.id !== '') {
      this.getProfile('/api/people/' + this.id);
    }
  }

  /**
   * Handles the QueryService Observable that is returned from the call
   * to getProfile(api:string)
   */
  getProfile(api: string) {
    this.loading = true;
    this.queryService.getProfile(api)
        .subscribe(
          profile => {
            this.profile = profile;
            this.loading = false;
            this.arrived = true;
            this.sortProfileKeywords();
          },
          error => {this.errorMessage = <any>error; console.log(error);},
          () => console.log('Profile Request Complete')
        );
  }

  /**
   * Checks if the profile has keywords
   */
  hasProfileKeywords() {
    return this.arrived && this.profile.keywords !== {};
  }

  /**
   * Returns the sorted keys of the keywords profile
   */
  sortProfileKeywords() {
    let sorted: Object[] = [];
    sorted = Object.keys(this.profile.keywords).map((k) => {
              return {word: k, value:this.profile.keywords[k]};
            });
    sorted.sort((a:any, b:any) => {
      return b.value - a.value;
    });
    this.keywordList = sorted;
    this.sortedKeywordList = sorted.slice(0, 20).map((k:any)=> {
              this.totalValue += k.value;
              return k.word;
            });
    this.displayKeywordList
      = this.getRandom(this.sortedKeywordList, Math.min(6, this.sortedKeywordList.length));
  }

  /**
   * Returns the keys of the publications profile
   */
  getPublications() {
    console.log(this.profile.publications);
    // let pubs: string[] = Object.keys(this.profile.publications);
    // console.log(pubs);
    return ['publication1', 'publication2'];
  }

  /**
   * Returns the list of keywords and their frequency
   */
  getKeywords() {
    return this.profile.keywords;
  }

  /**
   * Opens a modal to display all keywords in sorted order,
   * and allow editing (if logged in)
   */
  openMoreModal() {
    this.modal.open();
  }

  /**
   * Handler when a new keyword is submitted or removed
   * @param {any} e - {keyword: string, edit: string}
   */
  onEditKeyword(e: any) {
    console.log(e);
    if(e.edit === 'new') {
      this.profile.keywords[e.keyword] = e.value;
      this.sortProfileKeywords();
    }

    if(e.edit === 'remove') {
      let idx = this.keywordList.indexOf(e.keyword);
      if( idx !== -1) {
        this.keywordList.splice(idx);
      }
    }
  }

  /**
   * Samples n values from an array.
   */
  getRandom(arr: any[], n: number) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
  }

  /**
   * Maps values to sigmoid to make visuals look better...
   */
  sigmoid(n: number) {
    let v = 100 * 1 / (1 + Math.exp( -75 * n / this.totalValue ));
    return Math.floor(v - 50);
  }
}

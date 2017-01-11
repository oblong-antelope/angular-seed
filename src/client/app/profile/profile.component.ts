import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Profile } from '../models/index';
import { QueryService } from '../shared/index';
import { UserService } from '../user/index';
import { KeywordGridModalComponent,
         AddKeywordModalComponent,
         PublicationsModalComponent,
         EditProfileModalComponent,
         ContactModalComponent } from './modal/index';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnChanges {

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

  /**
   * All The Modals
   */
  @ViewChild('keywordGridModal') keywordGridModal: KeywordGridModalComponent;
  @ViewChild('addKeywordModal') addKeywordModal: AddKeywordModalComponent;
  @ViewChild('publicationsModal') publicationsModal: PublicationsModalComponent;
  @ViewChild('editProfileModal') editProfileModal: EditProfileModalComponent;
  @ViewChild('contactModal') contactModal: ContactModalComponent;

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
   * Updates profile when we change the id
   */
  ngOnChanges(changes: any) {
    this.updateProfile();
  }

  /**
   * Returns true if a user is currently logged in
   */
  isloggedin() {
    return this.userService.isLoggedIn();
  }

  /**
   * Returns true iff a user is currently logged in,
   * and the currently viewed profile is theres
   * Check this is true before allowing keyword editing
   */
  iscurrentuser() {
    return this.isloggedin() &&
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
      = this.getRandom(this.sortedKeywordList, Math.min(5, this.sortedKeywordList.length));
  }

  /**
   * Returns the number of publications profile
   */
  getNumPublications() {
    return this.profile.publications ? this.profile.publications.length : 0;
  }

  /**
   * Returns the list of keywords and their frequency
   */
  getKeywords() {
    return this.profile.keywords;
  }

  /**
   * MODAL HANDLING
   */


  /**
   * Opens the Edit modal
   */
  openEditModal() {
    this.editProfileModal.open();
  }

  editModalUpdateProfile(newprof: Profile) {
    console.log(newprof);
    // this.profile = newprof;
  }

  /**
   * Opens the contact modal
   */
  openContactModal() {
    this.contactModal.open();
  }

  /**
   * Opens the publications modal
   */
  openPublicationsModal() {
    this.publicationsModal.open();
  }

  /**
   * Opens the add Keyword Modal
   */
  openAddKeywordModal() {
    this.addKeywordModal.open();
  }

  /**
   * Handler for the adding of a keyword
   */
  onAddKeyword(word: string) {
    this.profile.keywords[word] = 200;
    this.sortProfileKeywords();
  }


  /**
   * Opens a modal to display all keywords in sorted order,
   * and allow editing (if logged in)
   */
  openKeywordGridModal() {
    this.keywordGridModal.open();
  }


  /**
   * UTILS
   */


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

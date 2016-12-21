import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Profile } from '../../models/index';
import { QueryService } from '../../shared/index';


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
  keywordInput: boolean = false;
  keywordInputKeyword: string = '';
  keywordList: string[] = [];

  profile: Profile = {
     name: {first: '', last: ''},
     keywords: {},
  };

  /**
   * Creates an instance of the ProfileComponent with the injected
   * QueryService
   * 
   * @param {Router} router - The injected routing provider
   * @param {QueryService} queryService - The injected QueryService
   */
  constructor(private queryService: QueryService) {
  }

  /**
   * Initialises the id and gets the profile.
   * Uses the ActivatedRoute to get the url parameters and data
   */
  ngOnInit() {
    this.updateProfile();
  }

  /**
   * Updates profile when we change the id
   */
  ngOnChanges(changes: any) {
    this.updateProfile();
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
            this.getProfileKeywords();
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
   * Returns the keys of the keywords profile
   */
  getProfileKeywords() {
    let sorted: Object[] = [];
    sorted = Object.keys(this.profile.keywords).map((k) => {
              return {word: k, value:this.profile.keywords[k]};
            });
    sorted.sort((a:any, b:any) => {
      return b.value - a.value;
    });
    this.keywordList = sorted.slice(0, 20).map((k:any)=> k.word);
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
   * 
   */
  editKeywordsLinks() {
    console.log('Edit Keywords pressed');
    this.keywordInput = !this.keywordInput;
  }

  submitNewKeyword() {
    this.profile.keywords[this.keywordInputKeyword] = '1000';
    this.getProfileKeywords();
    this.keywordInputKeyword = '';
  }
}

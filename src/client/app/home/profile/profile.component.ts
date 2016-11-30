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
  constructor(private queryService: QueryService) {}

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
    this.queryService.getProfile(api)
        .subscribe(
          profile => this.profile = profile,
          error => {this.errorMessage = <any>error; console.log(error);},
          () => console.log('Profile Request Complete')
        );
  }

  /**
   * Returns the keys of the keywords profile
   */
  getProfileKeywords() {
    return Object.keys(this.profile.keywords);
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
}

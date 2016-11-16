import { Component, OnInit, Input } from '@angular/core';
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
export class ProfileComponent implements OnInit {

  @Input('id') id: string = '';

  errorMessage: string;

  profile: Profile = {
     name: '',
     department: '',
     email: '',
     keywords: {},
     papers: [],
     awards: []
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
    if(this.id !== '') {
      this.getProfile('/api/person/' + this.id + '/full');
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
   * Returns the list of keywords and their frequency
   */
  getKeywords() {
    return this.profile.keywords;
  }
}

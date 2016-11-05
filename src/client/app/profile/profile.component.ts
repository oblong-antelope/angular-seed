import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Profile } from '../models/index';
import { QueryService } from '../shared/index';


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

  id: string;
  api: string;
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
   * @param {ActivatedRoute} route - The service for accessing route data
   * @param {Router} router - The injected routing provider
   * @param {Location} location - The injected location service
   * @param {QueryService} queryService - The injected QueryService
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              private queryService: QueryService) {}

  /**
   * Initialises the id and gets the profile.
   * Uses the ActivatedRoute to get the url parameters and data
   */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // (+) converts string 'id' to a number      
      this.api = this.queryService.getNavigationInformation();
      console.log('api', this.api);
      if(this.api === '') {
        // You would have to get profile by person id from server.
      } else {
        this.getProfile();
      }
   });
  }

  /**
   * Handles the QueryService Observable that is returned from the call
   * to getProfile(api:string)
   */
  getProfile() {
    this.queryService.getProfile(this.api)
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

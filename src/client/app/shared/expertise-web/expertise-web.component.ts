import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query-service/index';

/**
 * If you want any javascript thing, declare it here and it should work possibly, still unsure
 */
declare var plotly:any;

/**
 * This class represents the lazy loaded Word Component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-expertise-web',
  templateUrl: 'expertise-web.component.html'
})
export class ExpertiseWebComponent implements OnInit {

    /**
     * The data you wish to store to be used in the view
     */
    data: any;

    /**
     * Constructor as you'd expect in say java
     * Anything you want to do at component initialisation do here
     * 
     * @param {QueryService} queryService - the service that contains all the 
     * functions required to talk to the backend
     */
    constructor(private queryService: QueryService){}

    /**
     * Put any code you want to run on the view initialisation in here
     * e.g. the calling of queryService to get your data as I have done here
     */
    ngOnInit() {
        this.getData()
    }

    /**
     * Gets the data from a function in the query service.
     * getExpertiseWebData returns an observable object (rjxs)
     * you need to subscribe to it in order to get the data out for you to then display.
     */
    getData() {
        this.queryService.getExpertiseWebData()
            .subscribe(
                data => this.data = data, // This is data returned from backend if successful
                error => console.log(error), // If unsuccessful, error is returned (not returned if successful)
                () => console.log('Request for expertise web complete') // Something that is run every time
            );
    }
}

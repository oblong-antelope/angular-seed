///<reference path="../../../../tools/manual_typings/project/plotly.d.ts" />
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../shared/index';

declare var Plotly:any;

/**
 * This class represents the lazy loaded LandingComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.css'],
})

export class LandingComponent implements OnInit{

  errorMessage: string;
  exampleData: string = 'https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv';
  data: any;

  public PlotlyLayout: any;
  public PlotlyData: any;
  public PlotlyOptions: any;

  /**
   * Creates an instance of the LandingComponent with the injected
   * QueryService.
   *
   * @param {QueryService} queryService - The injected QueryService.
   * @param {Router} router - The inected Router
   */
  constructor(private queryService: QueryService, private router: Router, private elementRef: ElementRef) {}

  ngOnInit() {
    // this.plotlyplot();
    this.plotlyPlot2();
  }

  plotlyplot() {
    Plotly.d3.csv(this.exampleData, (err:any, rows:any) => {
      var YEAR = 2007;
      var continents = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas'];
      var POP_TO_PX_SIZE = 2e5;

      function unpack(rows:any, key:any) {
        return rows.map(function(row:any) { return row[key]; });
      }

      var data = continents.map(function(continent) {
        var rowsFiltered = rows.filter(function(row:any) {
            return (row.continent === continent) && (+row.year === YEAR);
        });
        return {
            mode: 'markers',
            name: continent,
            x: unpack(rowsFiltered, 'lifeExp'),
            y: unpack(rowsFiltered, 'gdpPercap'),
            text: unpack(rowsFiltered, 'country'),
            marker: {
                sizemode: 'area',
                size: unpack(rowsFiltered, 'pop'),
                sizeref: POP_TO_PX_SIZE
            }
        };
      });

      let t = this.elementRef.nativeElement;
      console.log(t);

      var layout = {
        b : 0,
        l : 0,
        r : 0,
        pad : 0,
        t : 0,
        width: t.offsetWidth,
        height: t.offsetHeight
        // xaxis: {title: 'Life Expectancy'},
        // yaxis: {title: 'GDP per Capita', type: 'log'},
        // hovermode: 'closest'
      };
      console.log(layout);

      Plotly.plot('myPlotlyDiv', data, layout, {showLink: false});
      });
  }

  plotlyPlot2() {
    let uri = 'https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv';
    Plotly.d3.csv(uri, (err:any, rows:any) =>{
      function unpack(rows:any, key:any) {
        return rows.map(function(row:any)
        { return row[key]; });}

      var trace1 = {
        x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
        mode: 'markers',
        marker: {
          size: 12,
          line: {
          color: 'rgba(217, 217, 217, 0.14)',
          width: 0.5},
          opacity: 0.8},
        type: 'scatter3d'
      };

      var trace2 = {
        x:unpack(rows, 'x2'), y: unpack(rows, 'y2'), z: unpack(rows, 'z2'),
        mode: 'markers',
        marker: {
          color: 'rgb(127, 127, 127)',
          size: 12,
          symbol: 'circle',
          line: {
          color: 'rgb(204, 204, 204)',
          width: 1},
          opacity: 0.8},
        type: 'scatter3d'};

      var data = [trace1, trace2];
      let t = this.elementRef.nativeElement;
      // console.log(t);

      var layout = {
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0
        },
        width: t.offsetWidth,
        height: t.offsetHeight,
        showline: false,
      };

      Plotly.newPlot('myPlotlyDiv', data, layout, {showLink: false});
    });
  }

}

import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../../shared/index';

declare var Plotly:any;

/**
 * This class represents the lazy loaded graphComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-graph',
  templateUrl: 'graph.component.html',
  styleUrls: ['graph.component.css'],
})

export class GraphComponent implements OnInit{

  errorMessage: string;
  exampleData: string = 'https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv';
  data: any;

  public PlotlyLayout: any;
  public PlotlyData: any;
  public PlotlyOptions: any;

  /**
   * Creates an instance of the GraphComponent with the injected
   * QueryService.
   *
   * @param {QueryService} queryService - The injected QueryService.
   * @param {Router} router - The inected Router
   */
  constructor(private queryService: QueryService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.plotlyPlot2();
  }

  plotlyPlot2() {
    var TOTAL_ELEMENT_HEIGHT = 920;
    var TOTAL_ELEMENT_WIDTH = 1900;
    var TOTAL_TITLE = 'AI vs AMMP vs GeoPhysics';
    var NAME_LABEL_SIZE = 12;
    var MARKER_DOT_SIZE = 12;
    var T = 0;

    Plotly.d3.csv('http://oblong-relentless.herokuapp.com/', function(err:any, rows:any){
      setInterval(intervalWake, 200);

      var graphDiv = 'myPlotlyDiv';

      function unpack(rows:any, key:any) {
        return rows.map(function(row:any)
        { return row[key]; });}

      var trace1 = {
        x:unpack(rows, 'x'), y: unpack(rows, 'y'), z: unpack(rows, 'z'),
        mode: 'markers',
        marker: {
          size: MARKER_DOT_SIZE,
          line: {
            color: 'rgba(217, 217, 217, 0.14)',
            width: 1},
          opacity: 0.8},
        type: 'scatter3d',
        text: unpack(rows, 'surname'),
        textfont: {
          size: NAME_LABEL_SIZE
        },
        hoverinfo: 'text'
      };

      /*var trace2 = {
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
       type: 'scatter3d'};*/

      var data = [trace1/*,trace2*/];
      var layout = {
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0},
        height: TOTAL_ELEMENT_HEIGHT,
        width: TOTAL_ELEMENT_WIDTH,
        scene:{
          camera:{
            center:{
              x:0,
              y:0,
              z:0
            },
            eye:{//zoom of the thing
              x:0,
              y:2,
              z:0.5
            }
          },
          xaxis:{
            showgrid:false,
            zeroline:false,
            showticklabels:false,
            title:''
          },
          yaxis:{
            showgrid:false,
            zeroline:false,
            showticklabels :false,
            title:''
          },
          zaxis:{
            showgrid:false,
            zeroline:false,
            showticklabels:false,
            title:''
          }
        }
      };
      Plotly.newPlot(graphDiv, data, layout);

      function intervalWake(){
        //Plotly.purge(graphDiv);
        T+=0.03;
        layout.scene.camera.eye.x = Math.sin(T)*2;
        layout.scene.camera.eye.y = Math.cos(T)*2;
        Plotly.newPlot(graphDiv, data, layout);
      }
    });
  }

}

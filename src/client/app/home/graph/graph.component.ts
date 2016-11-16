import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../../shared/index';

declare var $:any;
declare var Highcharts:any;

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
    $(function () {

      var t = 0;

      $(document).ready(function(){
        setInterval(runInter, 250);
      });

      var dataa = [[1,2,3]];
      //PRODUCTION: <=200; SAFE <=400; TESTING <=600; EXPERIMENTAL ~2000
      for(var i=1; i<100; i++){
        dataa[i] = [Math.random()*20-10, Math.random()*20-10, Math.random()*20-10]
      }

      function runInter(){
        //chart.series[0].setData([[4*Math.sin(t)+3,5,4*Math.cos(t)+3],[4*Math.sin(t)-1,3,4*Math.cos(t)+1]], true);
        chart.options.chart.options3d.beta = t%360;
        chart.redraw();
        t+=0.5;
      }

      // Give the points a 3D feel by adding a radial gradient
      Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color:any) {
        return {
          radialGradient: {
            cx: 0.4,
            cy: 0.3,
            r: 0.5
          },
          stops: [
            [0, color],
            [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
          ]
        };
      });

      // Set up the chart
      var chart = new Highcharts.Chart({
        chart: {
          animation: true,
          renderTo: 'container',
          margin: 10,
          type: 'scatter',
          options3d: {
            enabled: true,
            alpha: 10,
            beta: -20,
            depth: 200,
            viewDistance: 3,
            fitToPlot: false,
            frame: {
              bottom: { size: 1, color: 'rgba(0,0,0,0)' },
              back: { size: 1, color: 'rgba(0,0,0,0)' },
              side: { size: 1, color: 'rgba(0,0,0,0)' }
            }
          }
        },
        title: {
          text: ''
        },
        yAxis: {
          min: -10,
          max: 10,
          title: null,
          lineWidth: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          labels: {
            enabled: false
          },
          minorTickLength: 0,
          tickLength: 0
        },
        xAxis: {
          min: -10,
          max: 10,
          gridLineWidth: 0,
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          labels: {
            enabled: false
          },
          minorTickLength: 0,
          tickLength: 0
        },
        zAxis: {
          min: -10,
          max: 10,
          showFirstLabel: false,
          gridLineWidth: 0,
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          labels: {
            enabled: false
          },
          minorTickLength: 0,
          tickLength: 0
        },
        legend: {
          enabled: false
        },
        series: [{
          name: 'Reading',
          colorByPoint: true,
          data: dataa
        }],
        plotOptions: {
          scatter: {
            width: 100,
            height: 100,
            depth: 100
          },
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: function (e:any) {
                  alert(this.index);
                  //console.log(this);
                }
              }
            }
          }
        }
      });


      // Add mouse events for rotation
      $(chart.container).on('mousedown.hc touchstart.hc', function (eStart:any) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.pageX,
          posY = eStart.pageY,
          alpha = chart.options.chart.options3d.alpha,
          beta = chart.options.chart.options3d.beta,
          newAlpha:any,
          newBeta:any,
          sensitivity = 5; // lower is more sensitive

        $(document).on({
          'mousemove.hc touchdrag.hc': function (e:any) {
            // Run beta
            newBeta = beta + (posX - e.pageX) / sensitivity;
            chart.options.chart.options3d.beta = newBeta;

            // Run alpha
            newAlpha = alpha + (e.pageY - posY) / sensitivity;
            chart.options.chart.options3d.alpha = newAlpha;

            chart.redraw(false);
          },
          'mouseup touchend': function () {
            $(document).off('.hc');
          }
        });
      });

    });
  }

}

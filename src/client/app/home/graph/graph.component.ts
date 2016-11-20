import { Component, OnInit, ElementRef, DoCheck } from '@angular/core';
import { QueryService } from '../../shared/index';

declare var $:any;
declare var Highcharts:any;

/**
 * This class represents the lazy loaded graphComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-graph',
  template: `<div id="container" class="container"></div>`,
  styleUrls: ['graph.component.css'],
})

export class GraphComponent implements OnInit, DoCheck {

  data: any;

  chart: any = undefined;
  width: number;
  height: number;

  /**
   * Creates an instance of the GraphComponent with the injected
   * QueryService.
   *
   * @param {QueryService} queryService - The injected QueryService.
   * @param {Router} router - The inected Router
   */
  constructor(private queryService: QueryService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.width = this.elementRef.nativeElement.offsetWidth;
    this.height = this.elementRef.nativeElement.offsetHeight;
    this.plotlyPlot2();
  }

  ngDoCheck() {
    if(this.chart !== undefined) {
      this.checkUpdatesPlot();
    }
  }

  checkUpdatesPlot() {
    let newwidth:number = this.elementRef.nativeElement.offsetWidth;
    let newheight:number = this.elementRef.nativeElement.offsetHeight;
    if(newwidth !== this.width || newheight !== this.height) {
      console.log(this.chart);
      this.chart.chartHeight = newheight;
      this.chart.chartWidth = newwidth;
      this.chart.redraw();
      this.width = newwidth;
      this.height = newheight;
    }
  }

  plotlyPlot2() {
    $(() => {

      var t = 0;
      var chart = this.chart;

      $(document).ready(function() {
        setInterval(runInter, 250);
      });

      var dataa = [[1,2,3]];
      //PRODUCTION: <=200; SAFE <=400; TESTING <=600; EXPERIMENTAL ~2000
      for(var i=1; i<100; i++) {
        dataa[i] = [Math.random()*20-10, Math.random()*20-10, Math.random()*20-10];
      }

      function runInter() {
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
      chart = new Highcharts.Chart({
        chart: {
          width: this.width,
          height: this.height,
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

      this.chart = chart;


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

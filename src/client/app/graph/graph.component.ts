import { Component,
         ElementRef,
         ViewChild,
         OnInit,
         Renderer,
         EventEmitter,
         Output,
         Input } from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from './graph.service';
import { DataSet } from './models';

declare var Chart:any;

/**
 * This class represents the lazy loaded graphComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-graph',
  template: `<div class='container'>
                <canvas #mychart></canvas>
            </div>`,
  styleUrls: ['graph.component.css'],
})

export class GraphComponent implements OnInit {

  data: DataSet;

  chart: any;

  @Input('content') content: Object = {};

  @Output() pointClick: EventEmitter<Object> = new EventEmitter();

  /**
   * Chart Properties
   */
  type: string = 'bubble';
  options: any = {};

  @ViewChild('mychart') chartelem: ElementRef;

  /**
   * Creates an instance of the GraphComponent with the injected GraphService
   *
   * @param {GraphService} graphService - The injected GraphService
   * @param {Renderer} Renderer - The injected Renderer
   */
  constructor(private graphService: GraphService,
              private renderer:Renderer,
              private router: Router) {}

  /**
   * Chart set up on view load
   */
  ngOnInit() {
      this.setCanvasSize();
      this.setOptions();
      this.initChart();
      this.getDataAndUpdateChart();
  }

  /**
   * Set the canvas size to be 100% of the container
   */
  setCanvasSize() {
      this.renderer.setElementProperty(this.chartelem.nativeElement, 'height', '100%');
      this.renderer.setElementProperty(this.chartelem.nativeElement, 'width', '100%');
  }

  /**
   * Initialise the chart with out type, options and data
   */
  initChart() {
      this.chart = new Chart(this.chartelem.nativeElement, {
          type: this.type,
          options: this.options,
          data: this.data
      });
  }

  /**
   * Gets the data from the relentless server.
   * Saves the data into chart data parameter to bind to
   */
  getDataAndUpdateChart() {
      this.graphService.getData(this.content)
        .subscribe(
            data => {
                this.data = data;
                this.updateChart();
            },
            error => console.log(error),
            () => console.log('Request for graph data completed')
        );
  }

  /**
   * Updates data in the chart, then updates the chart.
   */
  updateChart() {
    this.chart.data['datasets'] = this.data.datasets;
    this.chart.update();
  }

  /**
   * Handler for clicks on the Chart
   */
  chartOnClick(e:any, d:any, emitter: EventEmitter<Object>) {
      if(d.length > 0) {
        let idx = d[0]._datasetIndex;
        let personClicked: any = this.data.datasets[idx];
        emitter.emit({
            name: personClicked.label.split('] ')[1],
            person: personClicked,
        });
        let vals:string[] = personClicked.idx.split('/');
        this.router.navigate(['profile', {'id': vals[3]}]);
      }
  }

  /**
   * Handler for tool tip label;
   * @return {string} label
   */
  getToolTipLabel(e: any, d:any) {
      return  d.datasets[e.datasetIndex].label;
  }


  /**
   * Handler for on hover handler.
   */
  onHover(e:any) {
    //   console.log(e);
  }

  /**
   * Sets the options field of the chart
   */
  setOptions() {
      this.options = {
        onClick: (e:any, d:any) => this.chartOnClick(e, d, this.pointClick),
        onHover: this.onHover,
        layout:{
            padding:20
        },
        tooltips:{
            titleFontSize: 14,
            bodyFontSize: 12,
            callbacks:{
                label: this.getToolTipLabel
            },
            intersect: false
        },
        legend:{
            display:false
        },
        scales: {
            xAxes: [{
                display:false
                /*ticks: {
                    min: 1,
                    max: 100
                    }*/
            }],
            yAxes: [{
                display:false
            }]
        },
        pan: {
            enabled: true,
            mode: 'xy'
        },
        zoom: {
            enabled: true,
            mode: 'xy'
        }
      };
  }
}

import { Component, ViewChild, OnChanges, OnInit,
         Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

declare var Chart:any;

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-keyword-grid-modal',
  styles: [`.chart-container {
                height: 90%;
                width: 90%;
            }
            >>> .modal-sized {
                width: 70vh;
                height: 70vh;
            }
            .btn-add-kword {
                float: left;
                margin-left: 20px;
            }
            `],
 templateUrl: './keyword-grid.modal.component.html'
})
export class KeywordGridModalComponent implements OnInit, OnChanges {
    @Input('keywords') keywords: any[] = [];

    @ViewChild('myModal') modal: ModalComponent;

    /**
    * Chart Properties
    */
    numdatapoints: number = 10;
    chart: any;
    type: string = 'horizontalBar';
    options: any = {};
    @ViewChild('keyworddisplay') chartelem: ElementRef;

    displayTab: number = 0;

    /**
     * Grid Properties
     */
    rows: any[] = [];

    temp: any[] = [];

    columns = [
        { prop: 'Keyword' },
        { name: 'Edit' },
        { name: 'Confirm' }
    ];

    /**
     * Generate the bar chart on init
     */
    ngOnInit() {
        this.genBarChart();
    }

    /**
     * Whenever the keywords are updated,
     * regenerate the bar chart
     */
    ngOnChanges(changes:any) {
        if(changes.keywords !== undefined) {
            this.genRowValues();
            if(this.chart !== undefined) {
                this.chart.destroy();
            }
            this.genBarChart();
        }
    }

    /**
     * Opens the modal
     */
    open() {
        this.modal.open();
    }

    /**
     * Handler for an onclose event
     */
    onClose() {
        return;
    }

    /**
     * Returns true if n is the current tab.
     */
    isTab(n:number) {
        return this.displayTab === n;
    }

    // Grid Keywords
    genRowValues() {
         let rows = this.keywords.map(obj => {
            return {'keyword': obj.word, 'edit':0, submit:'false'};
        });

        //cache list
        this.temp = [...rows];

        this.rows = rows;
    }

    updateDatatableFilter(event: any) {
        let val = event.target.value;

        // filter our data
        let temp = this.temp.filter( (d) => {
            return d.keyword.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
    }

    //Bar Chart Displays
    /**
     * Generates a new Bar Chart Display
     */
    genBarChart() {
        this.numdatapoints = Math.floor(this.keywords.length * 1 / 4);
        if(this.keywords.length === 0 || this.chartelem === undefined) {
            return;
        }
        this.chart = new Chart(this.chartelem.nativeElement, {
                type : this.type,
                options: this.genBarOptions(),
                data: this.genBarData()
        });
    }

    /**
     * Generates the bar chart options
     */
    genBarOptions() {
        return {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            tooltips: {
                callbacks: {
                    label: (tooltipItem:any) => tooltipItem.yLabel
                }
            }
        };
    }

    /**
     * Generates the bar chart data.
     */
    genBarData() {
        let threshold = this.keywords[0].value * (1/4);
        let otherValues = 0.5;
        let displaydata: number[] = [];
        let displaylabels: string[] = [];
        for (let i in this.keywords) {
            if(this.keywords[i].value < threshold) {
                otherValues += this.keywords[i].value;
            } else {
                displaylabels.push(this.keywords[i].word);
                displaydata.push(this.keywords[i].value);
            }
        }
        displaylabels = displaylabels.slice(0, this.numdatapoints);
        displaylabels.push('others..');
        displaydata = displaydata.slice(0, this.numdatapoints);
        displaydata.push(otherValues);

        let data = {
            labels: displaylabels,
            datasets: [{label:'', data: displaydata}]
        };
        return data;
    }
}
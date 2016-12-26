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
  styles: [`.container {
                height: 90%;
                width: 90%;
            }`],
 template: `<modal #myModal [backdrop]="'static'"
                            [keyboard]=false
                            (onOpen)="onOpen()" 
                            (onClose)="onClose()" 
                            (onDismiss)="onDismiss()">
            <modal-header [show-close]="true">
                <h4 class="modal-title">Your Keywords</h4>
            </modal-header>
            <modal-body>
                <div class="container" *ngIf="keywords.length !== 0">
                    <canvas #keyworddisplay></canvas>
                </div>
            </modal-body>
            <modal-footer [show-default-buttons]="true"></modal-footer>
            </modal>`
})
export class KeywordGridModalComponent implements OnInit, OnChanges {
    @Input('open') open:boolean = false;
    @Output('openChange') openChange: EventEmitter<boolean> = new EventEmitter();

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

    ngOnInit() {
        this.resetBarDisplay();
    }

    ngOnChanges(changes:any) {
        if(changes.open !== undefined) {
            if(!changes.open.previousValue && changes.open.currentValue) {
                this.modal.open();
            }
            if(changes.open.previousValue && !changes.open.currentValue) {
                this.modal.close();
            }
        }

        if(changes.keywords !== undefined) {
            this.resetBarDisplay();
        }
    }

    onOpen() {
        this.open = true;
        this.openChange.emit(this.open);
    }

    onClose() {
        this.open = false;
        this.openChange.emit(this.open);
    }

    onDismiss() {
        this.onClose();
    }

    resetBarDisplay() {
        this.numdatapoints = Math.floor(this.keywords.length * 2 / 3);
        if(this.keywords.length === 0 || this.chartelem === undefined) {
            return;
        }

        let options = {
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

        let threshold = this.keywords[0].value * 0;
        let otherValues = 0;
        let displaydata: number[] = [];
        let displaylabels: string[] = [];
        for (let i in this.keywords) {
            if(this.keywords[i].value < threshold) {
                otherValues += this.keywords[i];
            } else {
                displaylabels.push(this.keywords[i].word);
                displaydata.push(this.keywords[i].value);
            }
        }
        displaylabels.push('others..');
        displaydata.push(otherValues);

        let data = {
            labels: displaylabels,
            datasets: [{label:'', data: displaydata}]
        };

        this.chart = new Chart(this.chartelem.nativeElement, {
                type : this.type,
                options: options,
                data: data
        });
    }
}

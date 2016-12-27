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
 template: `<modal #myModal [size]="'lg'"
                            [backdrop]="'static'"
                            [keyboard]=false
                            (onOpen)="onOpen()" 
                            (onClose)="onClose()" 
                            (onDismiss)="onClose()">
                <modal-header [show-close]="true">
                    <h4 class="modal-title">Your Keywords</h4>
                </modal-header>
                <modal-body>
                    <div class="container" *ngIf="keywords.length !== 0">
                        <canvas #keyworddisplay></canvas>
                    </div>
                </modal-body>
                <modal-footer>
                    <div class="btn-group" role="group" style="float: left;" aria-label="...">
                        <button type="button" class="btn btn-default">Chart View</button>
                        <button type="button" class="btn btn-default">Grid View</button>
                    </div>
                    <button type="button" class="btn btn-primary btn-add-kword" (click)="addKeyword()">Add Keyword</button>
                    <button type="button" class="btn btn-primary" (click)="modal.close()">Ok</button>
                </modal-footer>
            </modal>
            
            <modal #keywordModal [size]="'sm'"
                                 [backdrop]="'static'"
                                 [keyboard]=false>
                <modal-header [show-close]="true">
                    <h4 class="modal-title">Add A Keyword</h4>
                </modal-header>
                <modal-body>
                      <input type="text" class="form-control" [(ngModel)]="newkeyword">
                </modal-body>
                <modal-footer>
                    <button type="button" class="btn btn-primary" (click)="submitNewKeyword()">Submit</button>
                </modal-footer>
            </modal>`
})
export class KeywordGridModalComponent implements OnInit, OnChanges {
    @Input('open') open:boolean = false;
    @Output('openChange') openChange: EventEmitter<boolean> = new EventEmitter();

    @Input('keywords') keywords: any[] = [];
    @Output('keywordsSubmit') keywordsSubmit: EventEmitter<any> = new EventEmitter();

    @ViewChild('myModal') modal: ModalComponent;

    /**
     * Keyword Modal Properties
     */
    @ViewChild('keywordModal') keywordmodal: ModalComponent;
    newkeyword: string = '';

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
            if(this.chart !== undefined) {
                this.chart.destroy();
            }
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

    addKeyword() {
        this.keywordmodal.open();
    }

    submitNewKeyword() {
        console.log(this.newkeyword);
        this.keywordsSubmit.emit({
            keyword: this.newkeyword,
            edit: 'new',
            value: this.keywords[0].value
        });
        this.keywordmodal.close();
    }

    resetBarDisplay() {
        this.numdatapoints = Math.floor(this.keywords.length * 1 / 4);
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

        this.chart = new Chart(this.chartelem.nativeElement, {
                type : this.type,
                options: options,
                data: data
        });
    }
}

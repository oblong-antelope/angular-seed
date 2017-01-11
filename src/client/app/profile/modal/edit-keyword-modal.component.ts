import { Component, ViewChild, OnChanges, OnInit,
         Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-edit-keyword-modal',
  styles: [`.grid-container {
  }`],
 templateUrl: './edit-keyword-modal.component.html'
})
export class EditKeywordModalComponent implements OnInit, OnChanges {
    @Input('keywords') keywords: any[] = [];
    @Output('onChanges') onChanges: EventEmitter<any> = new EventEmitter();

    @ViewChild('myModal') modal: ModalComponent;

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

    blah(e:any) {
        console.log(e);
    }

    /**
     * Generate the bar chart on init
     */
    ngOnInit() {
        return;
    }

    ngOnChanges(changes:any) {
        if(changes.keywords !== undefined) {
            this.genRowValues();
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

    // Grid Keywords
    genRowValues() {
         let rows = this.keywords.map(obj => {
            return {'keyword': obj.word, 'edit':0, submit:'false'};
        });

        //cache list
        this.temp = [...rows];

        this.rows = rows;
        console.log(rows);
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

}

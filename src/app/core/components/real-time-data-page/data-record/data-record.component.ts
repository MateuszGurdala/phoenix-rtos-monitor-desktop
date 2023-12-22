import {Component, Input} from '@angular/core';
import {DataRecordModel} from "../../../../shared/models/data-record.model";

@Component({
    selector: 'data-record',
    templateUrl: './data-record.component.html',
    styleUrls: ['./data-record.component.scss']
})
export class DataRecordComponent {
    @Input() recordDetails: DataRecordModel<any>;
}

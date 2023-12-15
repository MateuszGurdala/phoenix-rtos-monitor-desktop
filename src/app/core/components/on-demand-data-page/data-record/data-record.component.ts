import {Component, Input} from '@angular/core';
import {RealTimeDataRecordModel} from "../../../../shared/models/real-time-data-record.model";

@Component({
    selector: 'data-record',
    templateUrl: './data-record.component.html',
    styleUrls: ['./data-record.component.scss']
})
export class DataRecordComponent {
    @Input() recordDetails: RealTimeDataRecordModel<any>;
}

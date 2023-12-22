import {Component, HostListener, Input, OnInit} from '@angular/core';
import {DataRecordModel} from "../../../../shared/models/data-record.model";
import {Config} from "../../../../config";

@Component({
    selector: 'data-record',
    templateUrl: './data-record.component.html',
    styleUrls: ['./data-record.component.scss']
})
export class DataRecordComponent implements OnInit{
    @Input() recordDetails: DataRecordModel<any>;

    public hideTimestampLabel: boolean;
    public hideDataTypeLabel: boolean;
    public hideDataLabel: boolean;

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.hideTimestampLabel = (event.target as Window).innerWidth < Config.BreakingPoints.timestampLabel;
        this.hideDataTypeLabel = (event.target as Window).innerWidth < Config.BreakingPoints.dataTypeLabel;
        this.hideDataLabel = (event.target as Window).innerWidth < Config.BreakingPoints.dataLabel;
    }

    ngOnInit(): void {
        this.hideTimestampLabel = window.innerWidth < Config.BreakingPoints.timestampLabel;
        this.hideDataTypeLabel = window.innerWidth < Config.BreakingPoints.dataTypeLabel;
        this.hideDataLabel = window.innerWidth < Config.BreakingPoints.dataLabel;
    }
}

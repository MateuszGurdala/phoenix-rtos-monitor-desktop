import {BaseComponent} from "../../../../shared/base-component.directive";
import {ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {ConnectionService} from "../../../../shared/services/connection.service";
import {DataRecordModel} from "../../../../shared/models/data-record.model";
import {MonitoringDataTypeEnum} from "../../../../shared/enums/monitoring-data-type.enum";
import {ProcessSegmentDataModel} from "../../../../shared/models/process-sement-data.model";
import {ProcessSegment} from "../../../../shared/helpers/process-segment";
import {ScheduleInfoDataTypeModel} from "../../../../shared/models/monitoring-data-types/schedule-info-data-type.model";
import {filter, Observable, pipe, takeUntil, UnaryFunction} from "rxjs";

@Component({
    selector: 'process-chart',
    templateUrl: './process-chart.component.html',
    styleUrls: ['./process-chart.component.scss']
})
export class ProcessChartComponent extends BaseComponent implements OnInit {
    @Input() resolution: number = 9;
    @Input() xAxisLimit: number = 50 * 10000; //ms
    @Input() pid: number = 9;

    public resolutionArray: number[] = [...Array(this.resolution).keys()];
    public segments: ProcessSegmentDataModel[] = [];

    private startingTimestamp: number;
    private currentSegment: ProcessSegment | null = null;
    private chartWidthPx: number;
    private lastRecord: DataRecordModel<ScheduleInfoDataTypeModel>;

    constructor(
        private connectionService: ConnectionService,
        private elementRef: ElementRef,
        changeDetector: ChangeDetectorRef
    ) {
        super(changeDetector);
    }


    ngOnInit(): void {
        const chartElement: HTMLElement = this.elementRef.nativeElement.getElementsByClassName("chart-main")[0];
        if (chartElement) {
            this.chartWidthPx = chartElement.offsetWidth;
        }

        this.connectionService.realTimeDataStream.pipe(
                this.filterUnwantedRecords(),
                takeUntil(this.onDestroy)
            )
            .subscribe((record: DataRecordModel<ScheduleInfoDataTypeModel>): void => {
                if (this.lastRecord &&
                    record.data.pid === this.lastRecord.data.pid &&
                    record.data.npid === this.lastRecord.data.npid)
                    return;

                const timestampRef: number = record.timestamp.raw;
                this.startingTimestamp ??= timestampRef;
                this.lastRecord = record;

                if (timestampRef >= (this.startingTimestamp + this.xAxisLimit)) {
                    this.startingTimestamp = timestampRef;
                    this.segments = [];
                    this.currentSegment = null;
                }

                if (!this.currentSegment || record.data.npid == this.pid) {
                    this.currentSegment = new ProcessSegment(timestampRef, this.startingTimestamp, this.xAxisLimit);
                } else {
                    const segmentData: ProcessSegmentDataModel = this.currentSegment.toSegmentDataModel(timestampRef);
                    this.segments.push(this.scaleSegmentData(segmentData));
                    this.forceUpdateUI();
                    this.currentSegment = null;
                }
            })
    }

    private filterUnwantedRecords():
        UnaryFunction<Observable<DataRecordModel<ScheduleInfoDataTypeModel>>,
            Observable<DataRecordModel<ScheduleInfoDataTypeModel>>> {
        return pipe(filter((record: DataRecordModel<ScheduleInfoDataTypeModel>): boolean =>
            record.dataTypeId === MonitoringDataTypeEnum.ScheduleInfo
            && (record.data.pid === this.pid || record.data.npid === this.pid)));
    }

    private scaleSegmentData(toScaleData: ProcessSegmentDataModel): ProcessSegmentDataModel {
        const startScaled: number = this.scale(toScaleData.start)
        const widthScaled: number = this.scale(toScaleData.width)
        return {
            start: startScaled,
            width: widthScaled >= 1 ? widthScaled : 1
        }
    }

    private scale(value: number): number {
        return Math.round(this.chartWidthPx * value);
    }
}

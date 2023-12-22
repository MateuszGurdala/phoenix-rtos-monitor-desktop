import {BaseComponent} from "../../../../shared/base-component.directive";
import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Config} from "../../../../config";
import {ConnectionService} from "../../../../shared/services/connection.service";
import {DataRecordModel} from "../../../../shared/models/data-record.model";
import {takeUntil, tap} from "rxjs";

@Component({
    selector: 'app-real-time-data',
    templateUrl: './real-time-data.component.html',
    styleUrls: ['./real-time-data.component.scss']
})
export class RealTimeDataComponent extends BaseComponent implements OnInit {
    private gridCount: number = Config.RealTime.gridCount;

    public data: DataRecordModel<any>[] = [];

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private connectionService: ConnectionService,
        changeDetector: ChangeDetectorRef
    ) {
        super(changeDetector);
    }

    ngOnInit(): void {
        this.setupGrid();

        this.connectionService.realTimeDataStream
            .pipe(
                tap((): void => {
                    if (this.data.length === this.gridCount) {
                        this.data.shift();
                    }
                }),
                takeUntil(this.onDestroy))
            .subscribe((data: DataRecordModel<any>): void => {
                this.data.push(data);
                this.forceUpdateUI();
            })
    }

    private setupGrid(): void {
        let gridElement: HTMLElement = this.elementRef.nativeElement.getElementsByClassName("data-grid")[0];
        if (gridElement) {
            this.renderer.setStyle(gridElement, "grid-template-rows", `repeat(${this.gridCount}, 1fr)`)
        }
    }


}

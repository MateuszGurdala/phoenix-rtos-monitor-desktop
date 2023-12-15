import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {RealTimeDataRecordModel} from "../../../shared/models/real-time-data-record.model";
import {BasePageComponent} from "../../../shared/base-page-component";
import {takeUntil, tap} from "rxjs";
import {ConnectionService} from "../../../shared/services/connection.service";

@Component({
    selector: 'app-real-time-data',
    templateUrl: './real-time-data.component.html',
    styleUrls: ['./real-time-data.component.scss']
})
export class RealTimeDataComponent extends BasePageComponent implements OnInit {
    private gridCount: number = 100;

    public data: RealTimeDataRecordModel<any>[] = [];

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private connectionService: ConnectionService,
        private changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    ngOnInit(): void {
        this.setupGrid();

        this.connectionService.dataStream
            .pipe(
                tap((): void => {
                    if (this.data.length === this.gridCount) {
                        this.data.shift();
                    }
                }),
                takeUntil(this.onDestroy))
            .subscribe((data: RealTimeDataRecordModel<any>): void => {
                this.data.push(data);
                this.changeDetector.detectChanges();
            })
    }

    private setupGrid(): void {
        let gridElement = this.elementRef.nativeElement.getElementsByClassName("data-grid");
        if (gridElement) {
            this.renderer.setStyle(gridElement[0], "grid-template-rows", `repeat(${this.gridCount}, 1fr)`)
        }
    }


}

import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {DataRecordModel} from "../../../../shared/models/data-record.model";
import {BaseComponent} from "../../../../shared/base-component.directive";
import {takeUntil, tap} from "rxjs";
import {ConnectionService} from "../../../../shared/services/connection.service";

@Component({
    selector: 'app-real-time-data',
    templateUrl: './real-time-data.component.html',
    styleUrls: ['./real-time-data.component.scss']
})
export class RealTimeDataComponent extends BaseComponent implements OnInit {
    private gridCount: number = 100;

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
        let gridElement = this.elementRef.nativeElement.getElementsByClassName("data-grid");
        if (gridElement) {
            this.renderer.setStyle(gridElement[0], "grid-template-rows", `repeat(${this.gridCount}, 1fr)`)
        }
    }


}

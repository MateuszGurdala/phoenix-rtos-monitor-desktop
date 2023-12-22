import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {ConnectionService} from "../../../../shared/services/connection.service";
import {DataRecordModel} from "../../../../shared/models/data-record.model";
import {BaseComponent} from "../../../../shared/base-component.directive";
import {Subscription, takeUntil} from "rxjs";

@Component({
    selector: 'data-file-window',
    templateUrl: './data-file-window.component.html',
    styleUrls: ['./data-file-window.component.scss']
})
export class DataFileWindowComponent extends BaseComponent {
    @ViewChild('fileName') fileNameInput: ElementRef;

    public fileRecords: DataRecordModel<any>[] = [];

    constructor(
        private connectionService: ConnectionService,
        changeDetector: ChangeDetectorRef
    ) {
        super(changeDetector);
    }

    public onLoadFile(): void {
        const subscriptionHandle: Subscription = this.connectionService.onDemandDataStream
            .pipe(takeUntil(this.onDestroy))
            .subscribe((data: DataRecordModel<any>): void => {
                console.log(data);
                if (data.data !== undefined) {
                    this.fileRecords.push(data);
                    this.forceUpdateUI();
                } else {
                    subscriptionHandle.unsubscribe();
                }
            });

        this.connectionService.demandFile(this.fileNameInput.nativeElement.value);
    }

    public onClear(): void {
        this.fileRecords = [];
    }

}

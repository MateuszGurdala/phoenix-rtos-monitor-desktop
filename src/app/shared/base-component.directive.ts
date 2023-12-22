import {ChangeDetectorRef, Directive, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";


@Directive()
export class BaseComponent implements OnDestroy {
    protected onDestroy: Subject<void> = new Subject<void>();

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    ngOnDestroy(): void {
        this.onDestroy.next()
        this.onDestroy.complete()
    }

    protected forceUpdateUI(): void {
        this.changeDetector.detectChanges();
    }
}
import {Directive, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";


@Directive()
export class BasePageComponent implements OnDestroy {
    protected onDestroy: Subject<void> = new Subject<void>()
    ngOnDestroy(): void {
        this.onDestroy.next()
        this.onDestroy.complete()
    }
}
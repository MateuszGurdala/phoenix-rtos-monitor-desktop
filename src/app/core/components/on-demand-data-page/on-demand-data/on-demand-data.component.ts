import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Config} from "../../../../config";

@Component({
    selector: 'app-on-demand-data',
    templateUrl: './on-demand-data.component.html',
    styleUrls: ['./on-demand-data.component.scss']
})
export class OnDemandDataComponent implements OnInit {
    @ViewChild('file1') fileReference1: ElementRef;
    @ViewChild('file2') fileReference2: ElementRef;

    public hideSecondFile: boolean;

    ngOnInit(): void {
        this.hideSecondFile = window.innerWidth < Math.max((window.outerWidth / 2), Config.BreakingPoints.secondFile);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.hideSecondFile = (event.target as Window).innerWidth < Math.max(((event.target as Window).outerWidth / 2), Config.BreakingPoints.secondFile);
    }
}


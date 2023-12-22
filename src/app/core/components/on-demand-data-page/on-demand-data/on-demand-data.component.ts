import {ChangeDetectorRef, Component} from '@angular/core';
import {BaseComponent} from "../../../../shared/base-component.directive";
import {ConnectionService} from "../../../../shared/services/connection.service";

@Component({
    selector: 'app-on-demand-data',
    templateUrl: './on-demand-data.component.html',
    styleUrls: ['./on-demand-data.component.scss']
})
export class OnDemandDataComponent {
}

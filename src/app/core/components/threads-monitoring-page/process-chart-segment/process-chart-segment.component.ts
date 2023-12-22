import {Component, Input} from '@angular/core';
import {ProcessSegmentDataModel} from "../../../../shared/models/process-sement-data.model";

@Component({
  selector: 'process-chart-segment',
  templateUrl: './process-chart-segment.component.html',
  styleUrls: ['./process-chart-segment.component.scss'],
  host: {
    '[style.width.px]': 'data.width',
    '[style.left.px]': 'data.start',
  }
})
export class ProcessChartSegmentComponent {
  @Input() data: ProcessSegmentDataModel;
}

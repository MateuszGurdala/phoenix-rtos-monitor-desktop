import {Pipe, PipeTransform} from "@angular/core";
import {DataRecordModel} from "../shared/models/data-record.model";
import {MessageDataTypeModel} from "../shared/models/monitoring-data-types/message-data-type.model";
import {ScheduleInfoDataTypeModel} from "../shared/models/monitoring-data-types/schedule-info-data-type.model";

@Pipe({
    standalone: true,
    name: "dataTypePipe"
})
export class DataTypePipe implements PipeTransform {
    transform(data: DataRecordModel<any>): string {
        switch (data.dataTypeId) {
            case 0:
                return this.messageTypeTransform(data.data as MessageDataTypeModel);
            case 1:
                return this.scheduleInfoTransform(data.data as ScheduleInfoDataTypeModel);
            default:
                return "Unknown data type."
        }
    }

    private messageTypeTransform(data: MessageDataTypeModel): string {
        return data.message;
    }

    private scheduleInfoTransform(data: ScheduleInfoDataTypeModel): string {
        return `Process: ${data.pid}->${data.npid} Thread: ${data.tid}->${data.ntid}`;
    }
}
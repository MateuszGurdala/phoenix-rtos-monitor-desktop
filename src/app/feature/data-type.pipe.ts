import {DataRecordModel} from "../shared/models/data-record.model";
import {MessageDataTypeModel} from "../shared/models/monitoring-data-types/message-data-type.model";
import {MonitoringDataTypeEnum} from "../shared/enums/monitoring-data-type.enum";
import {Pipe, PipeTransform} from "@angular/core";
import {ScheduleInfoDataTypeModel} from "../shared/models/monitoring-data-types/schedule-info-data-type.model";

@Pipe({
    standalone: true,
    name: "dataTypePipe"
})
export class DataTypePipe implements PipeTransform {
    transform(data: DataRecordModel<any>): string {
        switch (data.dataTypeId) {
            case MonitoringDataTypeEnum.Message:
                return this.messageTypeTransform(data.data as MessageDataTypeModel);
            case MonitoringDataTypeEnum.ScheduleInfo:
                return this.scheduleInfoTransform(data.data as ScheduleInfoDataTypeModel);
            default:
                return "Unknown data type."
        }
    }

    private messageTypeTransform(data: MessageDataTypeModel): string {
        return data.message;
    }

    private scheduleInfoTransform(data: ScheduleInfoDataTypeModel): string {
        return `Process: ${data.currentProcessId}->${data.nextProcessId} Thread: ${data.currentThreadId}->${data.nextThreadId}`;
    }
}
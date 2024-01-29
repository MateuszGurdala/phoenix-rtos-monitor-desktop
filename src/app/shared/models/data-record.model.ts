import {MonitoringDataTypeEnum} from "../enums/monitoring-data-type.enum";
import {TimestampModel} from "./timestamp.model";

export interface DataRecordModel
    <DataType> {
    timestamp: TimestampModel;
    dataTypeId: MonitoringDataTypeEnum;
    data: DataType;
}
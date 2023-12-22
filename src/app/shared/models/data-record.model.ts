import {TimestampModel} from "./timestamp.model";

export interface DataRecordModel<DataType> {
    timestamp: TimestampModel;
    dataTypeId: number;
    data: DataType;
}
import {TimestampModel} from "./timestamp.model";

export interface RealTimeDataRecordModel<DataType> {
    timestamp: TimestampModel;
    dataTypeId: number;
    data: DataType;
}
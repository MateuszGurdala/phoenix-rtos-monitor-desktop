import {DataRecordModel} from "../models/data-record.model";
import {MessageDataTypeModel} from "../models/monitoring-data-types/message-data-type.model";
import {MonitoringDataTypeEnum} from "../enums/monitoring-data-type.enum";
import {ScheduleInfoDataTypeModel} from "../models/monitoring-data-types/schedule-info-data-type.model";
import {TimestampModel} from "../models/timestamp.model";
import {Timestamp} from "./timestamp";

export abstract class DataRecord {
    public static parse(record: string): DataRecordModel<any> {
        let tokens: string[] = record.split(',');
        let data: any;

        switch (Number(tokens[1])) {
            case MonitoringDataTypeEnum.Message:
                data = this.parseMessage(tokens);
                break;
            case MonitoringDataTypeEnum.ScheduleInfo:
                data = this.parseScheduleInfo(tokens);
                break;
            case NaN:
                return {
                    timestamp: {
                        raw: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                        milliseconds: 0
                    },
                    dataTypeId: -1,
                    data: undefined
                }
        }

        return {
            data: data,
            ...this.parseMetadata(tokens)
        }
    }

    private static parseMetadata(tokens: string[]): { timestamp: TimestampModel, dataTypeId: number } {
        return {
            timestamp: Timestamp.parse(Number(tokens[0])),
            dataTypeId: Number(tokens[1])
        }
    }

    private static parseMessage(tokens: string[]): MessageDataTypeModel {
        return {
            message: tokens[2]
        }
    }

    private static parseScheduleInfo(tokens: string[]): ScheduleInfoDataTypeModel {
        return {
            currentProcessId: Number(tokens[2]),
            currentThreadId: Number(tokens[3]),
            nextProcessId: Number(tokens[4]),
            nextThreadId: Number(tokens[5])
        }
    }
}
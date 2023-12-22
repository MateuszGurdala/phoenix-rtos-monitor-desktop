import {MessageDataTypeModel} from "../models/monitoring-data-types/message-data-type.model";
import {DataRecordModel} from "../models/data-record.model";
import {ScheduleInfoDataTypeModel} from "../models/monitoring-data-types/schedule-info-data-type.model";
import {TimestampModel} from "../models/timestamp.model";
import {Timestamp} from "./timestamp";

export abstract class DataRecord {
    public static parse(record: string): DataRecordModel<any> {
        let tokens: string[] = record.split(',');
        let data: any;

        switch (Number(tokens[1])) {
            case 0:
                data = this.parseMessage(tokens);
                break;
            case 1:
                data = this.parseScheduleInfo(tokens);
                break;
            case NaN:
                return {
                    timestamp: {
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
        const subTokens: string[] = tokens[2].split('-')

        const current: string[] = subTokens[0].split('|');
        const next: string[] = subTokens[1].split('|');

        return {
            pid: Number(current[0]),
            tid: Number(current[1]),
            npid: Number(next[0]),
            ntid: Number(next[1])
        }
    }
}
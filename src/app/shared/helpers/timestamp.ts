import {TimestampModel} from "../models/timestamp.model";

export abstract class Timestamp {
    private static divider: number = 1000000;

    public static parse(timestamp: number): TimestampModel {
        const seconds: number = Math.floor(timestamp / this.divider);

        return {
            raw: timestamp,
            milliseconds: (timestamp % this.divider) / 1000,
            seconds: seconds % 60,
            minutes: Math.floor(seconds / 60),
            hours: Math.floor(seconds / 1440)
        }
    }
}
import {Pipe, PipeTransform} from "@angular/core";
import {TimestampModel} from "../shared/models/timestamp.model";

@Pipe({
    standalone: true,
    name: "timestampPipe"
})
export class TimestampPipe implements PipeTransform {
    transform(timestamp: TimestampModel): string {
        return `${timestamp.hours}:${timestamp.minutes}:${timestamp.seconds}.${this.pad(timestamp.milliseconds, 3)}`
    }

    private pad(num: number, size: number): string {
        let str: string = num + "";
        while (str.length < size) str = "0" + str;
        return str;
    }
}
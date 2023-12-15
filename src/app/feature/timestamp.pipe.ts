import {Pipe, PipeTransform} from "@angular/core";
import {TimestampModel} from "../shared/models/timestamp.model";

@Pipe({
    standalone: true,
    name: "timestampPipe"
})
export class TimestampPipe implements PipeTransform {
    transform(timestamp: TimestampModel): string {
        return `Timestamp: ${timestamp.hours}:${timestamp.minutes}:${timestamp.seconds}.${timestamp.milliseconds}`
    }
}
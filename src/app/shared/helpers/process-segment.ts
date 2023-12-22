import {ProcessSegmentDataModel} from "../models/process-sement-data.model";

export class ProcessSegment {

    constructor(
        private segmentStart: number,
        private startingTimestamp: number,
        private timestampAxisLength: number
    ) {
    }

    public toSegmentDataModel(segmentEnd: number): ProcessSegmentDataModel {
        const startScaled: number = this.scale(this.segmentStart);
        const endScaled: number = this.scale(segmentEnd);

        return {
            start: startScaled,
            width: endScaled - startScaled
        }
    }

    private scale(timestamp: number): number {
        return (timestamp - this.startingTimestamp) / this.timestampAxisLength;
    }
}

export class ProcessSegment {
    public readonly start: number;
    public width: number;

    constructor(
        private segmentStart: number,
        private startingTimestamp: number,
        private timestampAxisLength: number
    ) {
        this.start = this.scale(this.segmentStart);
    }

    public saveState(segmentEnd: number): void {
        this.width = this.scale(segmentEnd) - this.start;
    }

    private scale(timestamp: number): number {
        return (timestamp - this.startingTimestamp) / this.timestampAxisLength;
    }
}

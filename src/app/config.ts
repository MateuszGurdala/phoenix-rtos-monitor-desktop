class Commands {
    public static readonly WorkingDirectory: string = "pwd";
    public static readonly OpenFileTransfer: string = "nc -ld $1 > $2 &";
    public static readonly CreateFile: string = "touch /$1";
}

class API {
    public static readonly DemandFile: string = "sshpass -p 1234 ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o LogLevel=ERROR -p $1 root@localhost \"demand $2\"";
}

class RealTime {
    public static readonly serverPort: number = 3171;

    public static readonly gridCount: number = 1000;
}

class OnDemand {
    public static readonly connectionPort: number = 5557;
    public static readonly serverPort: number = 3713;

}

class BreakingPoints {
    public static readonly secondFile: number = 1200;
    public static readonly timestampLabel: number = 1475;
    public static readonly dataTypeLabel: number = 1325;
    public static readonly dataLabel: number = 1250;

}

export abstract class Config {
    public static readonly BreakingPoints: typeof BreakingPoints = BreakingPoints;
    public static readonly RealTime: typeof RealTime = RealTime;
    public static readonly OnDemand: typeof OnDemand = OnDemand;
    public static readonly API: typeof API = API;
}

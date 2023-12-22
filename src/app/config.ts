class Commands {
    public static readonly WorkingDirectory: string = "pwd";
    public static readonly OpenFileTransfer: string = "nc -ld $1 > $2 &";
    public static readonly CreateFile: string = "touch /$1";
}

class API {
    public static readonly DemandFile: string = "sshpass -p 1234 ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o LogLevel=ERROR -p $1 root@localhost \"demand $2\"";
}

export abstract class Config {
    public static readonly connectionPort: number = 5557;
    public static readonly udpPort: number = 3713;
    public static readonly tcpPort: number = 3171;
    public static readonly API: typeof API = API;
    public static readonly Commands: typeof Commands = Commands;
}

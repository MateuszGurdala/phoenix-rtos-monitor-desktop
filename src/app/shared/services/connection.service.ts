import * as childProcess from 'child_process';
import * as net from 'net';
import {Injectable} from '@angular/core';
import {DataRecordModel} from "../models/data-record.model";
import {Server, Socket} from "node:net";
import {Subject} from "rxjs";
import {DataRecord} from "../helpers/data-record";
import {Config} from "../../config";

@Injectable({
    providedIn: 'root',
})
export class ConnectionService {
    private readonly childProcess!: typeof childProcess;
    private readonly net!: typeof net;
    private realTimeServer: Server;
    private onDemandServer: Server;

    public readonly realTimeDataStream: Subject<DataRecordModel<any>> = new Subject<DataRecordModel<any>>();
    public readonly onDemandDataStream: Subject<DataRecordModel<any>> = new Subject<DataRecordModel<any>>();
    public readonly connectionStatus: Subject<boolean> = new Subject<boolean>();
    public isConnected: boolean = false;
    public monitoredProcesses: number[] = [];

    constructor() {
        if (this.isElectron) {
            this.childProcess = (window as any).require('child_process');
            this.net = (window as any).require('net');

            this.realTimeDataServerSetup();
            this.onDemandServerSetup();
        }
    }

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }

    public demandFile(fileName?: string): boolean {
        if (fileName && this.isConnected) {
            const demandFileCmd: string = Config.API.DemandFile
                .replace("$1", Config.OnDemand.connectionPort.toString())
                .replace("$2", fileName);

            this.callShell(demandFileCmd);
        }
        return this.isConnected;
    }

    public switchProcessMonitoring(pid: number): boolean {
        if (this.isConnected)
        {
            const cmd: string = Config.API.SwitchProcessMonitoring
                .replace("$1", Config.OnDemand.connectionPort.toString())
                .replace("$2", pid.toString());

            this.callShell(cmd);
        }
        return this.isConnected
    }

    private realTimeDataServerSetup(): void {
        this.realTimeServer = this.net.createServer((socket: Socket): void => {
            socket.on("data", (data: Buffer): void => {
                this.realTimeDataStream.next(DataRecord.parse(data.toString().split('\n')[0]));
            });
        });

        this.realTimeServer.on("connection", (socket: Socket): void => {
            console.log("RT CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);
            this.isConnected = true;
            this.connectionStatus.next(true);
        });

        this.realTimeServer.on("disconnect", (): void => {
            console.log("RT LOST CONNECTION");
            this.isConnected = false;
            this.connectionStatus.next(false);
        });


        this.realTimeServer.listen(Config.RealTime.serverPort, "0.0.0.0");
    }

    private onDemandServerSetup(): void {
        this.onDemandServer = this.net.createServer((socket: Socket): void => {
            socket.on("data", (data: Buffer): void => {
                const tokens: string[] = data.toString().split('\n');
                tokens.pop(); // Last token is just empty strings

                const records: DataRecordModel<any>[] = tokens.map((token: string): DataRecordModel<any> => {
                    let temp: string[] = token.split('\x00');
                    let record: string | undefined = temp.at(0) === '' ? temp.at(temp.length - 1) : temp.at(0);
                    return DataRecord.parse(record as string);
                })

                records.forEach((record: DataRecordModel<any>): void => {
                    this.onDemandDataStream.next(record);
                });

                //Send invalid data to signal end of connection
                this.onDemandDataStream.next(DataRecord.parse(""));
            });
        });

        this.onDemandServer.on("connection", (socket: Socket): void => {
            console.log("OD CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);
        });

        this.onDemandServer.on("disconnect", (): void => {
            console.log("OD LOST CONNECTION");
        });

        this.onDemandServer.listen(Config.OnDemand.serverPort, "0.0.0.0");
    }

    private callShell(command: string): void {
        this.childProcess.exec(command, (error: any, stdout: string, stderr: string): void => {
            if (!error) {
                console.log(stdout);
            } else {
                console.log(stderr);
            }
        });
    }
}

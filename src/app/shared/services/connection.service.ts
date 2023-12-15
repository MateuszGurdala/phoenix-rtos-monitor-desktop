import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as net from 'net';
import {Injectable} from '@angular/core';
import {RealTimeDataRecordModel} from "../models/real-time-data-record.model";
import {Server, Socket} from "node:net";
import {Subject} from "rxjs";
import {RealTimeDataRecord} from "../helpers/real-time-data-record";

@Injectable({
    providedIn: 'root',
})
export class ConnectionService {
    private childProcess!: typeof childProcess;
    private fs!: typeof fs;
    private net!: typeof net;
    private server: Server;

    public dataStream: Subject<RealTimeDataRecordModel<any>> = new Subject<RealTimeDataRecordModel<any>>();
    public connectionStatus: Subject<boolean> = new Subject<boolean>();
    public isConnected: boolean = false;

    constructor() {
        // Conditional imports
        if (this.isElectron) {
            this.moduleSetup();
            this.logSetupInfo();

            this.serverSetup();
        }
    }

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }

    private moduleSetup(): void {
        this.childProcess = (window as any).require('child_process');
        this.fs = (window as any).require('fs');
        this.net = (window as any).require('net');

    }

    private logSetupInfo(): void {
        this.childProcess.exec('node -v', (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout:\n${stdout}`);
        });
    }

    private serverSetup(): void {
        this.server = this.net.createServer((socket: Socket): void => {
            socket.on("data", (data: Buffer): void => {
                this.dataStream.next(RealTimeDataRecord.parse(data));
            });
        });

        this.server.on("connection", (socket: Socket): void => {
            console.log("CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);
            this.isConnected = true;
            this.connectionStatus.next(true);
        });

        this.server.on("disconnect", (): void => {
            console.log("LOST CONNECTION");
            this.isConnected = false;
            this.connectionStatus.next(false);
        });

        this.server.listen(3171, "0.0.0.0");
    }


}

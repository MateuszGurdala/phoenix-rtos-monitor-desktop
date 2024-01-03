import {Component} from '@angular/core';
import {ConnectionService} from "./shared/services/connection.service";
import * as fs from 'fs';
import * as path from 'path';
import {Config} from "./config";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    private readonly fs!: typeof fs;
    private readonly path!: typeof path;

    constructor(connectionService: ConnectionService) {
        if (connectionService.isElectron) {
            this.fs = (window as any).require('fs');
            this.path = (window as any).require('path');

            this.fs.readFile(this.workingDirPath + 'appConfig.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    this.createDefaultConfigFile();
                } else {
                    this.loadConfig(data);
                }
            });
        }
    }

    private get workingDirPath(): string {
        return __dirname.replace("app.asar", "");
    }

    private createDefaultConfigFile(): void {
        const configObj: {} = {
            resolution: Config.ThreadsMonitoring.resolution,
            xAxisLimit: Config.ThreadsMonitoring.xAxisLimit,
            systemDemandPort: Config.OnDemand.connectionPort,
            appFilePort: Config.OnDemand.serverPort,
            appRealTimePort: Config.RealTime.serverPort,
        }

        this.fs.writeFile(this.workingDirPath + 'appConfig.json', JSON.stringify(configObj), 'utf8', () => {
        });

        console.log("Default config has been created in " + this.workingDirPath)
    }

    private loadConfig(config: string): void {
        const configObj: any = JSON.parse(config);

        console.log("Loaded app config file from " + this.workingDirPath);
        console.log(configObj);

        Config.ThreadsMonitoring.resolution = configObj.resolution;
        Config.ThreadsMonitoring.xAxisLimit = configObj.xAxisLimit;
        Config.OnDemand.connectionPort = configObj.systemDemandPort;
        Config.OnDemand.serverPort = configObj.appFilePort;
        Config.RealTime.serverPort = configObj.appRealTimePort;
    }
}

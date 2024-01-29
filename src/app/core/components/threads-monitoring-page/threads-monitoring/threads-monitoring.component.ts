import {Component} from '@angular/core';
import {Config} from "../../../../config";
import {ConnectionService} from "../../../../shared/services/connection.service";

@Component({
    selector: 'app-threads-monitoring',
    templateUrl: './threads-monitoring.component.html',
    styleUrls: ['./threads-monitoring.component.scss']
})
export class ThreadsMonitoringComponent {
    public monitoredProcesses: number[] = this.connectionService.monitoredProcesses;
    public maxProcessesCount: number = Config.ThreadsMonitoring.maxProcessesCount;

    constructor(private connectionService: ConnectionService) {
    }

    public onStartMonitoring(number: string): void {
        const pid: number = Number(number);

        if (pid !== 0 &&
            !this.monitoredProcesses.includes(pid) &&
            this.monitoredProcesses.length < this.maxProcessesCount &&
            this.connectionService.switchProcessMonitoring(pid)) {
            this.monitoredProcesses.push(pid);
        }
    }

    public onStopMonitoring(number: number): void {
        const pid: number = Number(number);

        if (this.monitoredProcesses.includes(pid) &&
            this.connectionService.switchProcessMonitoring(pid)) {
            this.monitoredProcesses.splice(this.monitoredProcesses.indexOf(pid, 0), 1);
        }
    }
}

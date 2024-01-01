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

    constructor(private connectionService: ConnectionService) {
    }

    public onStartMonitoring(value: string): void {
        const pid: number = Number(value);

        if (pid !== 0 &&
            !this.monitoredProcesses.includes(pid) &&
            this.monitoredProcesses.length < Config.ThreadsMonitoring.maxProcessesCount) {
            this.connectionService.switchProcessMonitoring(pid);
            this.monitoredProcesses.push(pid);
        }
    }

    public onStopMonitoring(value: number): void {
        const pid: number = Number(value);

        if (this.monitoredProcesses.includes(pid)) {
            this.connectionService.switchProcessMonitoring(pid);
            this.monitoredProcesses.splice(this.monitoredProcesses.indexOf(pid, 0), 1);
        }
    }
}

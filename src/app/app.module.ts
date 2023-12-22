import { DataFileWindowComponent } from './core/components/on-demand-data-page/data-file-window/data-file-window.component';
import { ProcessChartComponent } from './core/components/threads-monitoring-page/process-chart/process-chart.component';
import { ProcessChartSegmentComponent } from './core/components/threads-monitoring-page/process-chart-segment/process-chart-segment.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {DataRecordComponent} from './core/components/real-time-data-page/data-record/data-record.component';
import {DataTypePipe} from "./feature/data-type.pipe";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './core/components/layout/navbar/navbar.component';
import {NgModule} from '@angular/core';
import {OnDemandDataComponent} from './core/components/on-demand-data-page/on-demand-data/on-demand-data.component';
import {PageComponent} from './core/components/layout/page/page.component';
import {RealTimeDataComponent} from './core/components/real-time-data-page/real-time-data/real-time-data.component';
import {TabComponent} from './core/components/layout/tab/tab.component';
import {ThreadsMonitoringComponent} from './core/components/threads-monitoring-page/threads-monitoring/threads-monitoring.component';
import {TimestampPipe} from "./feature/timestamp.pipe";

@NgModule({
    declarations: [AppComponent, NavbarComponent, TabComponent, ThreadsMonitoringComponent, OnDemandDataComponent, RealTimeDataComponent, PageComponent, DataRecordComponent, DataFileWindowComponent, ProcessChartSegmentComponent, ProcessChartComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        TimestampPipe,
        DataTypePipe,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}

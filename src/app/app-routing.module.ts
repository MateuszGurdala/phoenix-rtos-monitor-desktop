import {NgModule} from '@angular/core';
import {OnDemandDataComponent} from "./core/components/on-demand-data-page/on-demand-data/on-demand-data.component";
import {RealTimeDataComponent} from "./core/components/real-time-data-page/real-time-data/real-time-data.component";
import {Routes, RouterModule} from '@angular/router';
import {ThreadsMonitoringComponent} from "./core/components/threads-monitoring-page/threads-monitoring/threads-monitoring.component";

const routes: Routes = [
    {
        path: 'monitoring',
        component: ThreadsMonitoringComponent,
        pathMatch: 'full',
    },
    {
        path: 'demand',
        component: OnDemandDataComponent,
        pathMatch: 'full',
    },
    {
        path: 'data',
        component: RealTimeDataComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/data',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

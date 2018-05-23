import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './data/data.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, DataComponent]
})
export class MainAppModule { }

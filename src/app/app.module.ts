import { ReadFileService } from './shared/read-file.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListpageComponent } from './listpage/listpage.component';
import { ChartComponent } from './chart/chart.component';
import { RouterModule, Routes } from '@angular/router';

let routes: Routes =[
  {path: '',redirectTo: '/home',pathMatch: 'full' },
  {path:"home", component: ListpageComponent},
  {path:"chart", component: ChartComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ListpageComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ReadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }

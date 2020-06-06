import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// importujemy nasz komponent
import { HomeComponent } from 'src/home/home.component';
import { ColorDirective } from 'src/color/color.directive';
import { AppInfoService } from 'src/app-info/app-info.service';
import { HttpClientModule } from '@angular/common/http';
import { BigWordLetter } from './pipes/pipe.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routers'
import { OopsComponent } from 'src/oops/oops.component';
import { AboutComponent } from 'src/about/about.component';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ColorDirective,
    BigWordLetter,
    OopsComponent,
    AboutComponent
  ],
  providers: [AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

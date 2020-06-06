import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { OopsComponent } from '../oops/oops.component';

export const appRoutes: Route [] = [
    { path: '',component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: OopsComponent}
];


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { StylingComponent } from './pages/styling/styling.component';
import { JavascriptComponent } from './pages/javascript/javascript.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'styling',
    component: StylingComponent
  },
  {
    path: 'javascript',
    component: JavascriptComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

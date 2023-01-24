import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutAuthorComponent } from './components/about-author/about-author.component';
import { CountriesComponent } from './components/countries/countries.component';
import { HomeComponent } from './components/home/home.component';
import { MerchstoreComponent } from './components/merchstorecomponent/merchstore/merchstore.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'countries',
    component: CountriesComponent
  },
  {
    path: 'author',
    component: AboutAuthorComponent
  },
  {
    path: 'merch',
    component: MerchstoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

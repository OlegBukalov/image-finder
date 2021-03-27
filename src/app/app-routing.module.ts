import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './features/components/bookmarks/bookmarks.component';
import { HomeComponent } from './features/components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'bookmarks', component: BookmarksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

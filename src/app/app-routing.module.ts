import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { CardviewComponent } from './cardview/cardview.component';

const routes: Routes = [
  {
    component: AddComponent,
    path: 'add',
  },
  {
    component: CardviewComponent,
    path: 'cardview',
  },
  {
    component: CardviewComponent,
    path: '',
  },
  {
    component: AddComponent,
    path: 'add/:id',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCrudComponent } from './todo-crud/todo-crud.component';

const routes: Routes = [{
  path: '',
  component: TodoListComponent,
},
{
  path: 'create',
  component: TodoCrudComponent,
},
{
  path: 'edit/:todoName',
  component: TodoCrudComponent,
},
{
  path: 'visualize/:todoName',
  component: TodoCrudComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

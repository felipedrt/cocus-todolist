import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCrudComponent } from './todo-crud/todo-crud.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoService } from './services/todo-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EncryptService } from './shared/encrypt-service.service';
import { MarkdownRenderService } from './shared/markdown-render-service.service';
import { PdfMakeService } from './shared/pdf-make-service.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoCrudComponent,
    TodoHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,
  ],
  exports: [
    TodoListComponent,
    TodoCrudComponent,
    TodoHeaderComponent,
  ],
  providers: [
    TodoService,
    EncryptService,
    MarkdownRenderService,
    PdfMakeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

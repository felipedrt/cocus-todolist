import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPlus, faTrash, faBinoculars, faArrowUpWideShort, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import { ITodoNote } from '../interfaces/ITodoNote';
import { TodoService } from '../services/todo-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ESortMode } from '../shared/enums/ESortMode';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faBinoculars = faBinoculars;
  faPlus = faPlus;
  faArrowUpWideShort = faArrowUpWideShort;
  faArrowDownWideShort = faArrowDownWideShort;
  todoList: ITodoNote[] = [];
  showModal = false;
  searchPattern = '';

  ESortMode = ESortMode;
  sortObject: any = {
    name: {
      sortMode: ESortMode.ASC
    },
    description: {
      sortMode: ESortMode.ASC
    },
    version: {
      sortMode: ESortMode.ASC
    }
  }

  constructor(private router: Router, private todoListService: TodoService, private toastrService: ToastrService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.todoList = this.todoListService.getItems().data as ITodoNote[];
  }

  search() {
    if (this.searchPattern !== '') {
      this.todoList = this.todoList.filter(t => {
        return t.name.toLowerCase().includes(this.searchPattern.toLowerCase())
        || t.description.toLowerCase().includes(this.searchPattern.toLowerCase())
        || t.version.toString().toLowerCase().includes(this.searchPattern.toLowerCase())
      })
    } else {
      this.todoList = this.todoListService.getItems().data as ITodoNote[];
    }
  }

  sort(fieldName: string) {
    if (this.sortObject[fieldName].sortMode === ESortMode.ASC) {
      if (fieldName === 'name' || fieldName === 'description') {
        this.todoList.sort((a:any, b:any) => a[fieldName].localeCompare(b[fieldName]));
      } else {
        this.todoList.sort((a:any, b:any) => a[fieldName] - b[fieldName]);
      }
      this.sortObject[fieldName].sortMode = ESortMode.DESC;
    } else {
      if (fieldName === 'name' || fieldName === 'description') {
        this.todoList.sort((a:any, b:any) => b[fieldName].localeCompare(a[fieldName]));
      } else {
        this.todoList.sort((a:any, b:any) => a[fieldName] - b[fieldName]);
      }
      this.sortObject[fieldName].sortMode = ESortMode.ASC;
    }
  }

  addItem() {
    this.router.navigateByUrl('/create');
  }

  edit(todoItem: ITodoNote) {
    this.router.navigateByUrl(`/edit/${todoItem.name}`);
  }

  visualize(todoItem: ITodoNote) {
    this.router.navigateByUrl(`/visualize/${todoItem.name}`);
  }

  deleteItem(content: TemplateRef<any>, todoName: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        if (result === 'yes') {
          const response = this.todoListService.deleteItem(todoName);
          if (!response.hasError) {
            this.toastrService.success(response.msg, 'Success');
            this.todoList = this.todoListService.getItems().data as ITodoNote[];
          }
        }
			},
			(reason) => {
        console.log(reason);
			},
		);
  }
}

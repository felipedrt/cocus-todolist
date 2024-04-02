import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITodoNote } from '../interfaces/ITodoNote';
import { TodoService } from '../services/todo-service.service';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { EMode } from '../shared/enums/EMode';
import { faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';
import { MarkdownRenderService } from '../shared/markdown-render-service.service';

interface TodoFormInterface {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  version: FormControl<number | null>;
  image: FormControl<string | null>;
}

@Component({
  selector: 'app-todo-crud',
  templateUrl: './todo-crud.component.html',
  styleUrls: ['./todo-crud.component.scss'],
})
export class TodoCrudComponent implements OnInit {
  mode: EMode = EMode.InsertMode;
  EnumMode = EMode;
  pageTitleText = 'Add New Item';
  faArrowLeft = faArrowLeft;
  faCamera = faCamera;
  selectedImgSrc = "";

  form: FormGroup<TodoFormInterface> = new FormGroup<TodoFormInterface>({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    version: new FormControl(0),
    image: new FormControl(''),
  });

  private todoName = '';
  renderedContent = "";

  constructor(
    private toastrService: ToastrService,
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private markdownRenderService: MarkdownRenderService
  ) {
  }

  ngOnInit(): void {
    this.todoName = this.activatedRoute.snapshot.params['todoName'];
    const readonlyMode =
      this.activatedRoute.snapshot.routeConfig?.path?.includes('visualize');

    if (this.todoName && readonlyMode) {
      this.mode = EMode.ReadOnlyMode;
      this.pageTitleText = 'Visualize Todo Item';
      this.fillForm();
      this.form.disable();
    } else if (this.todoName) {
      this.mode = EMode.EditMode;
      this.form.controls['name'].disable();
      this.pageTitleText = 'Edit Todo Item';
      this.fillForm();
    }
  }

  back() {
    this.router.navigateByUrl('/');
  }

  private fillForm() {
    const todoItem = this.todoService.getItem(this.todoName);
    this.form.controls['name'].setValue(todoItem?.name ?? '');
    
    this.form.controls['description'].setValue(todoItem?.description ?? '');
    const value = this.form.controls['description'].value ?? '';
    this.renderedContent = this.markdownRenderService.render(value);

    this.form.controls['version'].setValue(todoItem?.version ?? 0);
    this.form.controls['image'].setValue(todoItem?.image ?? '');
    this.selectedImgSrc = todoItem?.image ?? '';
  }

  get formControls() {
    return this.form.controls;
  }

  descriptionOnChange() {
    const value = this.form.controls['description'].value ?? '';
    this.renderedContent = this.markdownRenderService.render(value);
  }

  onSelectedFile(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImgSrc = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  submitForm() {
    if (this.form.valid) {
      const todoItem: ITodoNote = {
        id: uuid(),
        name: this.form.controls['name'].value ?? '',
        description: this.form.controls['description'].value ?? '',
        version: this.form.controls['version'].value ?? 0,
        image: this.selectedImgSrc ?? '',
      };
      if (this.mode === EMode.EditMode) {
        this.todoService.updateItem(todoItem);
        this.back();
      } else {
        const response = this.todoService.save(todoItem);
        if (!response.hasError) {
          this.toastrService.success(response.msg, 'Success');
          this.form.reset();
          this.selectedImgSrc = '';
          this.renderedContent = '';
        } else {
          this.toastrService.warning(response.msg, 'Warning');
        }
      }
    }
  }
}

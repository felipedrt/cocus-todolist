import { Injectable } from '@angular/core';
import { ITodoNote } from '../interfaces/ITodoNote';
import { ITodoResponse } from '../interfaces/ITodoResponse';
import { EMode } from '../shared/enums/EMode';
import { EncryptService } from '../shared/encrypt-service.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private encryptService: EncryptService) {

  }

  getItems(): ITodoResponse {
    try {
      if (localStorage.length > 0) {
        let todoItems: ITodoNote[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const localStorageItem = localStorage.key(i) ?? '';
          const encryptedItem = localStorage.getItem(localStorageItem) ?? "";
          const decryptedItem = this.encryptService.decrypt(encryptedItem);

          const todoItem = decryptedItem as ITodoNote;
          todoItems.push(todoItem);
        }
        return {
          hasError: false,
          msg: '',
          data: todoItems
        };
      } else {
        return {
          hasError: false,
          msg: '',
          data: []
        };
      }
    } catch (error) {
      return {
        hasError: true,
        msg: 'Error to retrieving data',
        data: []
      };
    }
  }

  save(item: ITodoNote): ITodoResponse {
    try {
      if (localStorage.getItem(item.name)) {
        return {
          hasError: true,
          msg: 'Item already stored!',
          data: item,
        };
      } else {
        const encryptedData = this.encryptService.encrypt(item);
        localStorage.setItem(item.name, encryptedData);

        return {
          hasError: false,
          msg: 'Item saved!',
          data: item,
        };
      }
    } catch (error) {
      return {
        hasError: true,
        msg:  `Error trying to save data: ${error}`,
        data: item,
      };
    } 
  }

  updateItem(item: ITodoNote) {
    try {
      localStorage.removeItem(item.name);

      const encryptedData = this.encryptService.encrypt(item);
      localStorage.setItem(item.name, encryptedData);
    } catch (error) {
      return {
        hasError: true,
        msg:  `Error trying to update data: ${error}`,
        data: item,
      };
    } finally {
      return {
        hasError: false,
        msg:  'Item Updated!',
        data: item,
      };
    }
  }

  getItem(todoName: string): ITodoNote | null {
    const encryptedItem = localStorage.getItem(todoName);
    if (encryptedItem) {
      const decryptedData = this.encryptService.decrypt(encryptedItem);
      return decryptedData as ITodoNote;
    } else {
      return null;
    }
  }

  deleteItem(todoName: string) {
    try {
      localStorage.removeItem(todoName);
    } catch (error) {
      return {
        hasError: true,
        msg:  `Error trying to delete item: ${error}`,
        data: [],
      };
    } finally {
      return {
        hasError: false,
        msg:  'Item Deleted!',
        data: [],
      };
    }
  }
}

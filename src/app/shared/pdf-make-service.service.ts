import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ITodoNote } from '../interfaces/ITodoNote';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfMakeService {
  exportAllDataToPdf(todoList: ITodoNote[]) {
    const documentDefinition = {
      content: [
        { text: 'COCUS Challenge - List of Todos', style: 'header' },
        '\n\n',
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['', 'Name', 'Description', 'Version'],
              ...todoList.map((item) => [
                item.image ? { image: item.image, width: 50, height: 50 } : '',
                item.name,
                item.description,
                item.version,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  exportTodoNoteToPdf(todoItem: ITodoNote) {
    const documentDefinition = {
      content: [
        { text: 'COCUS Challenge - Todo Item', style: 'header' },
        '\n\n',
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['', 'Name', 'Description', 'Version'],
              [
                todoItem.image
                ? { image: todoItem.image, width: 50, height: 50 }
                : '',
                todoItem.name,
                todoItem.description,
                todoItem.version,
              ]
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}

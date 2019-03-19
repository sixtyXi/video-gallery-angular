import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete
} from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Author } from 'src/app/shared/models/Author.model';

@Component({
  selector: 'app-authors-field',
  templateUrl: './authors-field.component.html',
  styleUrls: [ './authors-field.component.less' ]
})
export class AuthorsFieldComponent {
  @Input() allAuthors: Author[];
  @Input() selectedAuthors: Author[];
  @Output() onAdd: EventEmitter<Author> = new EventEmitter<Author>();
  @Output() onRemove: EventEmitter<Author> = new EventEmitter<Author>();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ ENTER, COMMA ];
  authorsCtrl = new FormControl();
  filteredAuthors: Observable<Author[]>;

  @ViewChild('authorsInput') authorsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredAuthors = this.authorsCtrl.valueChanges.pipe(
      startWith(null),
      map(
        (filterTxt: string | null) =>
          filterTxt ? this._filter(filterTxt) : this.allAuthors.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        const selectedAuthor: Author = this.allAuthors.find((author) => author.fullName === value);

        if (selectedAuthor) {
          this.onAdd.emit(selectedAuthor);
        }
      }

      if (input) {
        input.value = '';
      }

      this.authorsCtrl.setValue(null);
    }
  }

  remove(removedAuthor: Author): void {
    this.onRemove.emit(removedAuthor);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedAuthor = this.allAuthors.find(
      (author) => author.fullName === event.option.viewValue
    );

    if (selectedAuthor) {
      this.selectedAuthors.push(selectedAuthor);
    }

    this.authorsInput.nativeElement.value = '';
    this.authorsCtrl.setValue(null);
  }

  private _filter(filterTxt: string): Author[] {
    return this.allAuthors.filter((author) => author.fullName.indexOf(filterTxt) !== -1);
  }
}

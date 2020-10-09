import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  AfterViewChecked,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { SnackbarService } from '../../shared/snackbar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit, AfterViewInit {
  note: Note;
  noteId: number;
  new: boolean;

  @ViewChildren('input') focusedInput;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    //we want find out if we are creating a new note or editing an existing one

    this.route.params.subscribe((params: Params) => {
      //initialise so no error ;)
      this.note = new Note();
      if (params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }
  ngAfterViewInit() {
    this.focusedInput.first.nativeElement.focus();
  }

  onSubmit(form: NgForm) {
    if (this.new) {
      //we should save the note
      this.notesService.add(form.value);
      this.snackbarService.addNote();
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
      this.snackbarService.updateNote();
      console.log(this.note);
    }
    this.router.navigateByUrl('/');
    // console.log(form);
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}

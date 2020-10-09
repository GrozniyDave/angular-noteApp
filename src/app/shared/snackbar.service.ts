import { Injectable } from '@angular/core';
//snackbar notification
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  //snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) {}

  //Updating note
  updateNote() {
    this._snackBar.open('Note was updated!', 'Hide', {
      //passing config
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'updatedNoteSnackbar',
    });
  }

  //Adding new note
  addNote() {
    this._snackBar.open('A new note was created!', 'OK', {
      //passing config
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'addedNoteSnackbar',
    });
  }

  //Deleting note
  deleteNote() {
    this._snackBar.open('Note was deleted!', 'Got it!', {
      //passing config
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'deletedNoteSnackbar',
    });
  }

  //Deleting note
  deleteAllNotes() {
    this._snackBar.open('All notes were deleted!', 'Close', {
      //passing config
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'deletedNoteSnackbar',
    });
  }
}

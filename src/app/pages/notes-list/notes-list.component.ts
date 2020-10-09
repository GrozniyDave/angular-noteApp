import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('entryExitAnimation', [
      //entry animation
      transition('void=>*', [
        //initial states
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          //we have to expand out padding properties
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        //we first want to animate the spacing (which includes height & margin)
        animate(
          '50ms',
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*',
          })
        ),
        animate(125),
      ]),
      transition('*=>void', [
        //first scale up
        animate(
          50,
          style({
            transform: 'scale(1.05)',
          })
        ),
        //then scale down  back to noral sizewhile beginning to fade out
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        //scale  down and fade out completely
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.68)',
            opacity: 0,
          })
        ),
        //then animate spacing which incl height,margin,padding
        animate(
          '150ms ease-out',
          style({
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            'margin-bottom': '0',
          })
        ),
      ]),
    ]),
    trigger('staggerAnimation', [
      transition('*=>*', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate('0.2s ease')]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(
    private notesService: NotesService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    //we want to retrieve all notes from notesservice
    this.notes = this.notesService.getAll();
    //adding functionality on initialisation
    this.filteredNotes = this.notes;
  }
  deleteNote(id: number) {
    this.notesService.delete(id);
    this.snackbarService.deleteNote();
  }

  filter(query: string) {
    query = query.toLowerCase().trim();
    //split the search query into individual words

    let allResults: Note[] = new Array<Note>();

    let terms: string[] = query.split(' ');
    //remove duplicate search terms

    terms = this.removeDuplicates(terms);
    //compile all relevant results into the allResults arrray

    terms.forEach((term) => {
      let results = this.relevantNotes(term);
      //append results to the allResults array
      allResults = [...allResults, ...results];
    });

    //allResults will include duplicate notes
    //because a particular note can be the result of many seravt terms
    //but we dont want to show the same note multiple time is UI
    //so we first must remove the duplicates

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    //loop through the input array and add items to the set
    arr.forEach((e) => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter((note) => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        //When we return true in the filter callback,we are telling the filter function that
        //the element passed into thecallback should be included in the filtered array
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
    return relevantNotes;
  }

  devButtonClick() {
    // this.notesService.deleteAll();
    this.notes.push(
      {
        title: 'This note is for developing purposes',
        body:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      },
      {
        title: 'Another Note for dev',
        body:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      },
      {
        title: '3rd one to consider...',
        body:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      }
    );
  }
  deleteAllNotes() {
    this.notesService.deleteAll();
  }
}

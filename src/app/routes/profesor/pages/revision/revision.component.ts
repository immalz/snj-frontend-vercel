import { MatDialog } from '@angular/material/dialog';
import { NotaService } from './../../services/nota.service';
import { CursoService } from './../../services/curso.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UpdateNoteComponent } from './update-note/update-note.component';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss']
})
export class RevisionComponent implements OnInit {

  grade: any;
  course: any;
  docente: any;
  courses = [];
  noteList = [];
  noteListTemp = [];
  selectCourse: any = 'todo';

  courseConfig = {
    1: ['matematica', 'Matemática'],
    2: ['matematica', 'Razonamiento Matemático'],
    3: ['matematica', 'Álgebra'],
    4: ['matematica', 'Geometría'],
    5: ['matematica', 'Aritmética'],
    6: ['comunicacion', 'Razonamiento Verbal'],
    7: ['comunicacion', 'Gramática'],
    8: ['comunicacion', 'Literatura'],
    9: ['comunicacion', 'Plan Lector'],
    10: ['ciencia', 'Ciencias Naturales'],
    11: ['ciencia', 'Biología'],
    12: ['historia', 'Geografía'],
    13: ['historia', 'Historia del Perú'],
    15: ['historia', 'Educación Cívica'],
    16: ['religion', 'Educación Religiosa'],
    17: ['arte', 'Arte'],
    18: ['psico', 'Tutoría'],
    19: ['computacion', 'Computación'],
    20: ['ingles', 'Inglés'],
    21: ['danza', 'Danza'],
    22: ['historia', 'Personal Social'],
    23: ['ciencia', 'Ciencia y Ambiente'],
    24: ['religion', 'Religión'],
    25: ['psico', 'Psicomotricidad'],
    26: ['otros', ''],
    27: ['otros', ''],
    28: ['otros', ''],
    29: ['otros', ''],
  }

  constructor(
    private courseService: CursoService,
    private noteService: NotaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.docente = JSON.parse(localStorage.getItem('docente'));
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(
      res => {
        this.courses = [];
        if(this.docente.roles[0].nombre === 'director') {
          this.courses = res;
          console.log(this.courses);
          this.getNotes();
          return;
        }
        for (const item of res) {
          if(item.docente.length > 0) {
            if(item.docente[0]._id === this.docente._id) {
              this.courses.push(item);
            }
          }
        }
        
        this.getNotes();
      },
      err => {
        console.log(err);
      }
    );
  };

  changeValue(e: any): void {
    e.preventDefault();
    console.log(e)
  }

  Approve(item): void {
    console.log('asd', item);
    
    Swal.fire({
      title: '¿Quieres aprobar la corrección de esta Nota?',
      html: 
      `<p style="text-align: start; margin: 0"><b>Docente: </b> ${item.curso[0].docente[0].nombre}</p>` + 
      `<p style="text-align: start; margin: 0"><br> <b>Grado: </b> ${item.grado[0].nombre}</p>` + 
      `<p style="text-align: start; margin: 0"><br> <b>Nota: </b> ${item.nota} puntos</p>`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('confirmo')
        const payload = {
          observacion: true,
          aprobacion: true
        };

        this.noteService.acceptReview(item._id, payload).subscribe(
          res => {
            console.log(res);
            Swal.fire(`Se ha aprobado la corrección!`, '', 'success');
            this.getCourses();
          },
          err => {
            Swal.fire('Los cambios no se guardaron', '', 'info')
          }
        )
        
      } else if (result.isDenied) {
        
      }
    })
  }

  getNotes(): void {
    const arrayID = this.courses.map(element => {
      return element._id
    })

    console.log(arrayID)
    this.noteService.getNoteObserver(arrayID).subscribe(
      res => {
        this.noteList = res.reverse();
        this.noteListTemp = res.reverse();
        console.log(res);
      }
    )
  }

  getYear(item): void {
    return item['año'];
  }

  updateNote (item: any): void {
    console.log(item);
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      data: {
        item
      },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourses();
    });
  }

  filter(): void {

    if (this.selectCourse === 'todo') {
      this.noteList = [...this.noteListTemp];
      return;
    }
    console.log(this.selectCourse);

    const newList = [...this.noteListTemp];

    console.log(newList)

    this.noteList = newList.filter(element => element.curso[0]._id === this.selectCourse);

    // console.log(found)
  }

  getColorClass(name: string) {
    for (const key in this.courseConfig) {
      if(this.courseConfig[key][1] === name) {
        return this.courseConfig[key][0];
      }
    }
    return 'matematica'
  }

}

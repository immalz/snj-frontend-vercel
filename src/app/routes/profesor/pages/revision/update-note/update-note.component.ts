import { NotaService } from './../../../services/nota.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  form: FormGroup;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<UpdateNoteComponent>,
      private fb: FormBuilder,
      private notaService: NotaService
    ) { }
  
    ngOnInit(): void {
      console.log(this.data);
      this.initForm();
     }

     initForm(): void {
      this.form = this.fb.group({
        nota: [this.data.item.nota, Validators.required],
      });
    }

     save(): void {
      console.log(this.form.value);

      Swal.fire({
        title: '¿Quieres guardar los cambios?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.notaService.updateNote(this.data.item._id, this.form.value).subscribe(
            res => {
              console.log(res);
              Swal.fire(`Se actualizo la nota correctamente!`, '', 'success');
              this.dialogRef.close();
            },
            err => {
              Swal.fire('Los cambios no se guardaron', '', 'info')
            }
          )
          
        } else if (result.isDenied) {
          
        }
      })
     }

  
}

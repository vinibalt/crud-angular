import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { MatTableDataSource } from '@angular/material/table';
import { CoursesService } from '../../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/component/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent implements OnInit {

  // courses: Course[] = [
  //   {_id: '1', name: 'Angular', category: 'Livre'}
  // ];
  displayedColumns = ['name', 'category', 'actions'];
  courses$: Observable<Course[]> | null = null;



  constructor(private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

    this.refresh();

  }

  refresh(){
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Não foi possível carregar os cursos disponíveis');
        console.log(error);

        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onDelete(course: Course){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Deseja realmente remover este curso?',

    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
          this.coursesService.delete(course._id)
              .subscribe(
                () => {
                  this.refresh();
                  this.snackBar.open('Curso removido com sucesso!', 'X', {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center'
                  });
                },
                () => this.onError("Erro ao remover curso!")
              );
      }


    });




  }

  onAdd(){
    console.log("clicou");
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id ], {relativeTo: this.route});
  }


  ngOnInit(): void {
  }



}

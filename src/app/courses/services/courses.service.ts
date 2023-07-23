import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { delay, first, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(500),
      tap((courses) => console.log(courses))
    );
  }

  save(course: Partial<Course>) {
    console.log(course);

    if (course._id) {
      console.log("update");

      return this.update(course);
    }
    console.log("create");

    return this.create(course);

  }

  loadById(id: String) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  private create(course: Partial<Course>) {
    return this.httpClient
    .post<Course>(this.API, course)
    .pipe(first());
  }

  private update(course: Partial<Course>) {
    return this.httpClient
      .put<Course>(`${this.API}/${course._id}`, course)
      .pipe(first());
  }

  public delete(id: String){
    return this.httpClient
    .delete(`${this.API}/${id}`)
    .pipe(first());
  }
}

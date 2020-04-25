import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { Workout } from '../model/workout';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private url = environment.baseUrl + 'api/workouts';
  private workouts: Workout[]=[];

  constructor(
    private http: HttpClient,
    // private datePipe : DatePipe,
    private auth : AuthService
  ) { }
  index() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ` + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Workout[]>(this.url + '?sorted=true',httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('index method in workout service failed');
        })
      );
  }

  create(data: Workout) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ` + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.post<Workout>(this.url, data, httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('create method in workout service failed');
      })
    );
  }

  show(id:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ` + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    console.log("show workout with id: "+ id);
    return this.http.get<Workout>(`${this.url}/${id}`,httpOptions)
    .pipe(
      catchError((err: any) => {
      console.log(err);
      return throwError('show single method in workout service failed');
    })
    )
  }
  destroy(workoutId:number){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Basic ` + this.auth.getCredentials(),
    //     'X-Requested-With': 'XMLHttpRequest'
    //   })
    // };
    return this.http.delete<Workout>(this.url+ '/'+  workoutId)//,httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('delete method in workout service failed');
      })
    );
  }
  update(data: Workout, workoutId : number) {
    // if(data.completed){
    //   data.completeDate = this.datePipe.transform(Date.now(), 'shortDate');
    // }else{
    //   data.completeDate = '';
    // }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ` + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.post<Workout>(this.url +'/'+ workoutId, data, httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('update method in workout service failed');
      })
    );
  }
  }



import { Workout } from './../../model/workout';
import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/services/workout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {

  newWorkout = new Workout();
  editWorkout = null;
  showComplete = false;
  workout = new Workout();
  workouts: Workout[]=[];
  selected = null;

  constructor(
    private workSvc: WorkoutService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const wrkIdStr = this.currentRoute.snapshot.paramMap.get('id')
    if (!this.selected && wrkIdStr) {
      const todoId = Number.parseInt(wrkIdStr,10);
      this.workSvc.show(todoId).subscribe(
        workout =>{
          this.selected = workout;
        },
        fail => {
          console.error(fail);
          this.router.navigateByUrl(`/notFound`)
        }
      );
    }
    else{
      this.reload();
    }
  }


  reload(){
    this.workSvc.index().subscribe(
      data => {
        this.workouts = data;
      },
      bad =>{
        console.error('WorkoutListComponent.reload(): error retrieving workout list')
        console.error(bad);
      }
    );
  }



  loadWorkouts(){
    this.workSvc.index().subscribe(
      // data => this.todos = data,
      err => {
        console.error('Error in our loadTodo() method. ' + err);
      }
    );
  }



  setEditWorkout(){
    this.editWorkout = Object.assign({}, this.selected);
  }


  updateWorkout(workout: Workout){
    this.workSvc.update(workout, workout.id).subscribe(
      yay => {
        this.reload();
        this.editWorkout = null;
      },
      boo => {
      console.error('workoutlistComp updating todo error');
      }
    );
  }

  addWorkout(workout: Workout){
    this.workSvc.create(workout).subscribe(
      good => {
        this.reload();
        this.newWorkout = new Workout();
      },
      bad =>{
        console.error('workoutListComponent.addWorkout(): error adding todo')
        console.error(bad);
      }
    );
  }

  displayWorkout(workout){
    this.router.navigateByUrl(`/workouts/${workout.id}`);
  }

  displayTable(table){
    this.selected = null;
    this.router.navigateByUrl(`/workouts`);
  }

  deleteWorkout(id){
    this.workSvc.destroy(id).subscribe(
      yay => {
        this.reload();
      },
      boo => {
      console.error('workoutlistComp delete todo error');
      }
    );
  }




}

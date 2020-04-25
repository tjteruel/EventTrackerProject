export class Workout {

  id: number;
  workout: string;
  category: string;
  targetMuscle: string;
  dateCompleted: string;
  records: string;
  description: string;
  resources: string;
  notes: string;

  constructor(
    id?: number,
    workout?: string,
    category?: string,
    targetMuscle?: string,
    dateCompleted?: string,
    records?: string,
    description?: string,
    resources?: string,
    notes?: string
  ){
    this.id = id;
    this.workout = workout;
    this.category = category;
    this.targetMuscle = targetMuscle;
    this.dateCompleted = dateCompleted;
    this.records = records;
    this.description = description;
    this.resources = resources;
    this.notes = notes
  }
}

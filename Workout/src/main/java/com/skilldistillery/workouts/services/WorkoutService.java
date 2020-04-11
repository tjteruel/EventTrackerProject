package com.skilldistillery.workouts.services;

import java.util.List;

import com.skilldistillery.workouts.entities.Workout;

public interface WorkoutService {
	List<Workout> findAll();
	Workout findById(int id);
	Workout addWorkout(Workout workout);


}

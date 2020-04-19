package com.skilldistillery.workouts.services;

import java.time.LocalDate;
import java.util.List;

import com.skilldistillery.workouts.entities.Workout;

public interface WorkoutService {
	List<Workout> findAll();
	Workout findById(int id);
	Workout addWorkout(Workout workout);
	Workout updateWorkout(Workout workout, int id);
	public boolean deleteWorkout(int id);
	List<Workout> searchByKeyword(String keyword);
	List<Workout> findByRange(LocalDate date1, LocalDate date2);

}

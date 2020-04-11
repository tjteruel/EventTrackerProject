package com.skilldistillery.workouts.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.workouts.entities.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Integer>{
	List<Workout> findAll();
	Workout findById(int id);
//	Workout addWorkout(Workout workout);
}

package com.skilldistillery.workouts.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.workouts.entities.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Integer>{
	List<Workout> findAll();
//	Workout findById(int id);
//	Workout addWorkout(Workout workout);
	List<Workout> findByWorkoutLikeOrCategoryLike(String kw1, String kw2); //same keyword, but needs 2 parameters subbing left to right

}

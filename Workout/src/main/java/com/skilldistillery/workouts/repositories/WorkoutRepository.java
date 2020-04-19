package com.skilldistillery.workouts.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.workouts.entities.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Integer>{
	List<Workout> findAll();
//	Workout findById(int id);
//	Workout addWorkout(Workout workout);
	List<Workout> findByWorkoutLikeOrCategoryLike(String kw1, String kw2); //same keyword, but needs 2 parameters subbing left to right

	@Query("SELECT w FROM Workout w WHERE w.dateCompleted >= :date1 AND w.dateCompleted <= :date2")
	List<Workout> findByRange(@Param("date1")LocalDate date1, @Param("date2")LocalDate date2);
}

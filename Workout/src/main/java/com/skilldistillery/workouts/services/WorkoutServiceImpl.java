package com.skilldistillery.workouts.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.workouts.entities.Workout;
import com.skilldistillery.workouts.repositories.WorkoutRepository;

@Service
public class WorkoutServiceImpl implements WorkoutService {
	
	@Autowired
	private WorkoutRepository workoutRepo;

	@Override
	public List<Workout> findAll() {
		return workoutRepo.findAll();
	}

}

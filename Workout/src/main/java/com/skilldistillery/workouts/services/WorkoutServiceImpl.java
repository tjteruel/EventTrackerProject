package com.skilldistillery.workouts.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.workouts.entities.Workout;
import com.skilldistillery.workouts.repositories.WorkoutRepository;

@Service
public class WorkoutServiceImpl implements WorkoutService {
	
	@Autowired
	private WorkoutRepository workRepo;

	@Override
	public List<Workout> findAll() {
		return workRepo.findAll();
	}

	@Override
	public Workout findById(int id) {
		return workRepo.findById(id);
	}

	@Override
	public Workout addWorkout(Workout workout) {
		try {
			workout = workRepo.saveAndFlush(workout);
			return workout;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}

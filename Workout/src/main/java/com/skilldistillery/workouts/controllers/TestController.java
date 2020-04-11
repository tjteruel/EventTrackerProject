package com.skilldistillery.workouts.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.workouts.entities.Workout;
import com.skilldistillery.workouts.repositories.WorkoutRepository;

@RestController
@RequestMapping("api")
public class TestController {

	@Autowired
	private WorkoutRepository workRepo;

	// returns "pong"
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}

	@GetMapping("posts")
	public List<Workout> findAll() {
		return workRepo.findAll();
	}
}

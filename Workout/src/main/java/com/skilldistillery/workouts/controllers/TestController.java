package com.skilldistillery.workouts.controllers;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.workouts.entities.Workout;
import com.skilldistillery.workouts.repositories.WorkoutRepository;
import com.skilldistillery.workouts.services.WorkoutService;

@RestController
@RequestMapping("api")
public class TestController {

	@Autowired
	private WorkoutService workSvc;

	// returns "pong"
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}

	// Find All Workouts
	@GetMapping("workouts")
	public List<Workout> findAll() {
		return workSvc.findAll();
	}

	// Find Workout By ID
	@GetMapping("workouts/{id}")
	public Workout findById(@PathVariable Integer id, HttpServletResponse response) {
		Workout workout = workSvc.findById(id);
		if (workout == null) {
			response.setStatus(404);
		}
		return workout;
	}

	// create Workout
	@PostMapping("workouts")
	public Workout createWorkout(@RequestBody Workout workout, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			Workout newWorkout = workSvc.addWorkout(workout);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(workout.getId());
			String location = url.toString();
			response.addHeader("Location", location);
			return newWorkout;
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			return null;
		}
	}
	
	// updated Workout
	@PostMapping("workouts/{id}")
	public Workout updateFlight(@PathVariable int id, @RequestBody Workout workout) {
		Workout updatedflight = workSvc.updateWorkout(workout, id);
		return updatedflight;
	}

}

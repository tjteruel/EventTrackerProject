package com.skilldistillery.workouts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import com.skilldistillery.workouts.entities.Workout;

@SpringBootApplication
public class WorkoutApplication extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(WorkoutApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(WorkoutApplication.class, args);
	}

}

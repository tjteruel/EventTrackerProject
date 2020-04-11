package com.skilldistillery.workouts;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.workouts.entities.Workout;
import com.skilldistillery.workouts.repositories.WorkoutRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
class WorkoutApplicationTests {
	
	@Autowired
	private WorkoutRepository repo;

	@Test
	void test_findAll() {
		List<Workout> workouts = repo.findAll();
		assertNotNull(workouts);
	}

}

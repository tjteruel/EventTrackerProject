package com.skilldistillery.workouts.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Workout {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String workout;
	
	private String category;
	
	@Column(name="target_muscle")
	private String targetMuscle;
	
	@Column(name="date_completed")
	private LocalDate dateCompleted;

	private String records;
	
	private String description;
	
	private String resources;
	
	private String notes;
	
	//Constructors
	public Workout() {
	}

	public Workout(int id, String workout, String category, String targetMuscle, LocalDate dateCompleted,
			String records, String description, String resources, String notes) {
		super();
		this.id = id;
		this.workout = workout;
		this.category = category;
		this.targetMuscle = targetMuscle;
		this.dateCompleted = dateCompleted;
		this.records = records;
		this.description = description;
		this.resources = resources;
		this.notes = notes;
	}

	//GETTERS and SETTERS
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getWorkout() {
		return workout;
	}

	public void setWorkout(String workout) {
		this.workout = workout;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTargetMuscle() {
		return targetMuscle;
	}

	public void setTargetMuscle(String targetMuscle) {
		this.targetMuscle = targetMuscle;
	}

	public LocalDate getDateCompleted() {
		return dateCompleted;
	}

	public void setDateCompleted(LocalDate dateCompleted) {
		this.dateCompleted = dateCompleted;
	}

	public String getRecords() {
		return records;
	}

	public void setRecords(String records) {
		this.records = records;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getResources() {
		return resources;
	}

	public void setResources(String resources) {
		this.resources = resources;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	//toString
	@Override
	public String toString() {
		return "Workout [id=" + id + ", workout=" + workout + ", category=" + category + ", targetMuscle="
				+ targetMuscle + ", dateCompleted=" + dateCompleted + ", records=" + records + ", description="
				+ description + ", resources=" + resources + ", notes=" + notes + "]";
	}

	//hashcode and equals
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((category == null) ? 0 : category.hashCode());
		result = prime * result + ((dateCompleted == null) ? 0 : dateCompleted.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + id;
		result = prime * result + ((notes == null) ? 0 : notes.hashCode());
		result = prime * result + ((records == null) ? 0 : records.hashCode());
		result = prime * result + ((resources == null) ? 0 : resources.hashCode());
		result = prime * result + ((targetMuscle == null) ? 0 : targetMuscle.hashCode());
		result = prime * result + ((workout == null) ? 0 : workout.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Workout other = (Workout) obj;
		if (category == null) {
			if (other.category != null)
				return false;
		} else if (!category.equals(other.category))
			return false;
		if (dateCompleted == null) {
			if (other.dateCompleted != null)
				return false;
		} else if (!dateCompleted.equals(other.dateCompleted))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id != other.id)
			return false;
		if (notes == null) {
			if (other.notes != null)
				return false;
		} else if (!notes.equals(other.notes))
			return false;
		if (records == null) {
			if (other.records != null)
				return false;
		} else if (!records.equals(other.records))
			return false;
		if (resources == null) {
			if (other.resources != null)
				return false;
		} else if (!resources.equals(other.resources))
			return false;
		if (targetMuscle == null) {
			if (other.targetMuscle != null)
				return false;
		} else if (!targetMuscle.equals(other.targetMuscle))
			return false;
		if (workout == null) {
			if (other.workout != null)
				return false;
		} else if (!workout.equals(other.workout))
			return false;
		return true;
	}

}

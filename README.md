## Event Tracker Project

#### Week 12 Homework for Skill Distillery

### Overview
The event tracker is a Spring Rest CRUD API that can track a users workouts. Various details of the workout such as the type of workout, focus muscle groups, and record times can be stored by the user.

#### Table of REST Endpoints

RETURN TYPE | ROUTE | Functionality
--- | --- | ---
List <Workout> | GET api/workouts | Gets all workouts
Workout | GET api/workouts/{id} | Gets specific workout by ID
Workout | POST api/workouts | Creates new workout
Workout | POST api/workouts/{id} | Updates existing workout
Void | DELETE api/delete/{id} | Deletes workout by ID
List <Workout> | GET api/search/ {keyword} | Gets a list of workouts by keyword


### How to Use
In the projects current state tests can be run through PostMan. The user will be able to create workouts, update saved workouts, search by ID or keyword, and delete workouts.


### Technologies Used
..-Spring REST
..-Spring Data JPA
..-Spring Tool Suite
..-J-Unit Jupiter
..-JSON
..-PostMan
..-HTTP
..-Gradle
..-Zoom

### Lessons Learned
I misnamed my packages in the Boot project which caused my PostMan tests to fail. Fortunately, our TA's were available to assist over Zoom. Their second set of eyes helped me find this discrepancy and continue on with my project.

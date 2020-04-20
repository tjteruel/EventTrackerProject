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
List <Workout> | GET api/range/{date1}/{date2} | Gets a list of workouts by date range


### How to Use
The user can search for workouts by ID to display a specific workouts details. The user can also search by keyword or date range and view a list of workouts that fit the search criteria. The user also has a full list of the workouts in the database. Clicking on a title of any workout will display full workout details and a count of how many times that workout has been conducted. From this display, the user can also edit a workout or completely delete it from the database. Finally, the user can create a new workout by filling out the forms. This new workout will have the same level of functionality as the previous workouts.




### Technologies Used
* Spring REST
* Spring Data JPA
* Spring Tool Suite
* J-Unit Jupiter
* JSON
* PostMan
* HTTP
* Gradle
* Zoom
* html
* XMLHttpRequest
* ATOM
* Visual Studio Code

### Lessons Learned
I misnamed my packages in the Boot project which caused my PostMan tests to fail. Fortunately, our TA's were available to assist over Zoom. Their second set of eyes helped me find this discrepancy and continue on with my project. Throughout this project I was reinforcing what we learned in class this past week with Rest and how the routes work between repositories and services.

window.addEventListener('load', evt => {
	console.log('window loaded.')
	init();
});

function init(){
	console.log('In init()'); //delete after test
	document.workoutIdSearch.lookup.addEventListener('click', function(event) {
		console.log('in event listener');
		event.preventDefault();
		var workoutId = document.workoutIdSearch.workoutId.value;
		console.log('workoput Id = ' + workoutId); //delete after test
		
		if (!isNaN(workoutId) && workoutId > 0) {
			getWorkout(workoutId);
		}
	});
	document.newWorkout.addWorkout.addEventListener('click', function(event) {
		event.preventDefault();
		let form = document.newWorkout;
		let film = {
				workout: form.workout.value,
				category: form.category.value,
				targetMuscle: form.targetMuscle.value,
				dateCompleted: form.dateCompleted.value,
				records: form.records.value,
				description: form.description.value,
				resources: form.resources.value,
				notes: form.notes.value
		};
		createWorkout(film);
	});

	document.keywordSearch.lookup.addEventListener('click', function(event) {
		console.log('in keyword search listener');
		event.preventDefault();
		var keyword = document.keywordSearch.keyword.value;
		
		if (keyword !== null) {
			getByKeyword(keyword);
		}
	});

	//not functional. delete after testing?
	document.dateRangeSearch.dateRangeButton.addEventListener('click', function(event) {
		event.preventDefault();
		let date1 = document.dateRangeSearch.date1.value;
		let date2 = document.dateRangeSearch.date2.value;
		let date1String = date1.toString();
		let date2String = date2.toString();
		console.log('date1: ' + date1);
		console.log('String 1: ' + date1String);
		console.log('date2: ' + date2);
		console.log('String 2: ' + date2String);

		searchDateRange(date1, date2);
	});

	getAllWorkouts();
}

//GET WORKOUT
function getWorkout(workoutId){
	console.log('in get workout')
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/workouts/' + workoutId);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4) {
			switch(xhr.status){
				case 200:
					let dataJSON = xhr.responseText;
					console.log(dataJSON);
					let data = JSON.parse(dataJSON);
					console.log(data);
					// displayWorkout(data);
					workoutDetail(data);
					break;
				
				case 404:
					let msg = 'workout not found.';
					displayNotFound(msg);
					break;
				default:
					let err = 'Error occurred: ' + xhr.status;
					displayNotFound(err);
					break;
				}
			}
		}
		xhr.send();
	}

	//DISPLAY NOT FOUND MSG
	function displayNotFound(msg) {
		var filmDiv = document.getElementById('displayDiv');
		filmDiv.textContent = msg;	
	}

	//CREATE WORKOUT
	function createWorkout(workout) {
		let workJson = JSON.stringify(workout);
		let xhr = new XMLHttpRequest();
		xhr.open('POST', 'api/workouts');
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				switch (xhr.status) {
				case 200:
				case 201:
					workJson = xhr.responseText;
					let workout = JSON.parse(workJson);
					workoutDetail(workout);
					break;
				case 400:
					displayNotFound("Invalid workout data: " + workJson);
					break;
				default:
					displayNotFound("Error occurred: " + xhr.status);
					break;
				}
			}
		}
		xhr.send(workJson);
	}

	//GET ALL WORKOUTS
	function getAllWorkouts(){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/workouts');
		xhr.onreadystatechange = function() {
		  if (xhr.readyState === 4 && xhr.status < 400) {
			var allWorkouts = JSON.parse(xhr.responseText);
			console.log(allWorkouts)
			displayAllWorkouts(allWorkouts);
		  }
		  if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		  }
		};
		xhr.send(null);
	  }

	  //DISPLAY TABLE OF ALL WORKOUTS
	  function displayAllWorkouts(allWorkouts) {
		let allDiv = document.getElementById('allWorkoutsDiv');
		allDiv.textContent = '';
	
		//create table
		let table = document.createElement('table');
		let thead = document.createElement('thead');
		let headRow = document.createElement('tr');
		//create table headers
		let th1 = document.createElement('th');
		th1.textContent = 'Id';
		let th2 = document.createElement('th');
		th2.textContent = 'Workout Name';
		let th3 = document.createElement('th');
		th3.textContent = 'Description';
	
		headRow.appendChild(th1);
		headRow.appendChild(th2);
		headRow.appendChild(th3);
	
		thead.appendChild(headRow);
		table.appendChild(thead);
	
		let tbody = document.createElement('tbody');
		//loop through workouts and add to table
		allWorkouts.forEach(function (value, index, array) {
	
			let tbodyRow = document.createElement('tr');
	
			let tableWorkoutId = document.createElement('td');
			let tableWorkoutName = document.createElement('td');
			let tableWorkoutDescription = document.createElement('td');
	
			tableWorkoutId.textContent = value.id + ')';
			tbodyRow.appendChild(tableWorkoutId);
	
			tableWorkoutName.textContent = value.workout;
			tableWorkoutName.addEventListener('click', function (e) { //make the name clickable, display workout data
				workoutDetail(value);
			});
			tbodyRow.appendChild(tableWorkoutName);
	
			tableWorkoutDescription.textContent = value.description;
			tbodyRow.appendChild(tableWorkoutDescription);
	
			tbody.appendChild(tbodyRow);
			table.appendChild(tbody);
		});
		allDiv.appendChild(table);
	}
	  
	//DISPLAYS SINGLE WORKOUT DETAILS
	function workoutDetail(workout) {
		let singleWorkoutData = document.getElementById('singleWorkoutData');
		singleWorkoutData.textContent = '';

		//displays and appends workout details
		let h2Title = document.createElement('h2');
		h2Title.textContent = workout.workout;
		singleWorkoutData.appendChild(h2Title);

		let h1category = document.createElement('p');
		h1category.textContent = 'Category: ' + workout.category;
		singleWorkoutData.appendChild(h1category);

		let target = document.createElement('p');
		target.textContent = 'Target Muscle: ' + workout.targetMuscle;
		singleWorkoutData.appendChild(target);

		let date = document.createElement('p');
		date.textContent = 'Date Completed: ' + workout.dateCompleted;
		singleWorkoutData.appendChild(date);

		let record = document.createElement('p');
		record.textContent = 'Records: ' + workout.record;
		singleWorkoutData.appendChild(record);
	
		let description = document.createElement('p');
		description.textContent = 'Description: ' + workout.description;
		singleWorkoutData.appendChild(description);

		let resources = document.createElement('p');
		resources.textContent = 'Resources: ' + workout.resources;
		singleWorkoutData.appendChild(resources);

		let notes = document.createElement('p');
		notes.textContent = 'Notes: ' + workout.notes;
		singleWorkoutData.appendChild(notes);
	
		// back/edit/delete button event + event listeners
		let btnBack = document.createElement('button');
		btnBack.textContent = "Back";
		let btnEdit = document.createElement('button');
		btnEdit.textContent = "Edit Workout";
		let btnDelete = document.createElement('button');
		btnDelete.textContent = "Delete Workout";
	
		btnBack.addEventListener('click', function (e) {
			singleWorkoutData.textContent = '';
			getWorkouts();
		});
		btnEdit.addEventListener('click', function (e) {
			editWorkout(workout);
			getWorkouts();
		});
		btnDelete.addEventListener('click', function (e) {
			e.preventDefault();
			deleteWorkout(workout);
			singleWorkoutData.textContent = '';
			getWorkouts();
		});
	
		// append the buttons to the workout detail
		singleWorkoutData.appendChild(btnBack);
		singleWorkoutData.appendChild(btnEdit);
		singleWorkoutData.appendChild(btnDelete);
	}

		//EDIT/UPDATE WORKOUT
	function editWorkout(workoutObj) {
		let editWorkoutDataDiv = document.getElementById('editWorkoutDiv');
		// create the form, give it a name
		var form = document.createElement('form');
		form.name = 'editForm';
		var div = document.createElement('div');
		console.log(workoutObj);
	
		// fields for form
		var workoutInput = document.createElement('input');
		workoutInput.name = 'id'; // assign a name attribute
		workoutInput.type = 'hidden'; // assign a type attribute
		workoutInput.value = workoutObj.id; // assign the id value
		form.appendChild(workoutInput);
		
		var workoutName = document.createElement('input');
		workoutName.name = 'workoutName'; 
		workoutName.type = 'text'; 
		workoutName.value = workoutObj.workout; //assign workout name value
		form.appendChild(workoutName);
	
		var categoryInput = document.createElement('input');
		categoryInput.name = 'categoryInput'; 
		categoryInput.type = 'text'; 
		categoryInput.value = workoutObj.category; //assign workout category value
		form.appendChild(categoryInput);

		var muscleInput = document.createElement('input');
		muscleInput.name = 'muscleInput'; 
		muscleInput.type = 'text'; 
		muscleInput.value = workoutObj.targetMuscle; //assign workout target muscle value
		form.appendChild(muscleInput);

		var dateInput = document.createElement('input');
		dateInput.name = 'dateInput'; 
		dateInput.type = 'date'; 
		dateInput.value = workoutObj.dateCompleted; //assign workout date value
		form.appendChild(dateInput);

		var recordInput = document.createElement('input');
		recordInput.name = 'recordInput'; 
		recordInput.type = 'text'; 
		recordInput.value = workoutObj.records; //assign workout record value
		form.appendChild(recordInput);
		
		var workDescInput = document.createElement('input');
		workDescInput.name = 'workDescInput'; 
		workDescInput.type = 'text'; 
		workDescInput.value = workoutObj.description; //assign workout description value
		form.appendChild(workDescInput);

		var resourceInput = document.createElement('input');
		resourceInput.name = 'resourceInput'; 
		resourceInput.type = 'text'; 
		resourceInput.value = workoutObj.resources; //assign workout resources value
		form.appendChild(resourceInput);

		var noteInput = document.createElement('input');
		noteInput.name = 'noteInput'; 
		noteInput.type = 'text'; 
		noteInput.value = workoutObj.notes; //assign workout note value
		form.appendChild(noteInput);

		var submit = document.createElement('input');
		submit.name = 'submit'; 
		submit.type = 'submit'; 
		submit.value = 'Submit Form'; // assign a value attribute
	
		submit.addEventListener('click', function (e) { // Assign an event listener to the submit button variable
			e.preventDefault();
			var form = e.target.parentElement;
	
			// reassign the workout with updated info
			workoutObj.workout = form.workoutName.value;
			workoutObj.category = form.categoryInput.value;
			workoutObj.targetMuscle = form.muscleInput.value;
			workoutObj.dateCompleted = form.dateInput.value;
			workoutObj.records = form.recordInput.value;
			workoutObj.description = form.workDescInput.value;
			workoutObj.resources = form.resourceInput.value;
			workoutObj.notes = form.noteInput.value;

			// POST request, update workout
			updateWorkout(workoutObj);
			editWorkoutDiv.textContent = '';
			let singleWorkoutData = document.getElementById('singleWorkoutData');
			singleWorkoutData.textContent = '';
			// clear the form data
			form.reset();
			getWorkouts();
		});
		form.appendChild(submit); //append submit to form
		editWorkoutDataDiv.appendChild(form); //append form to div
	}
	
	//GET ALL WORKOUTS
	function getWorkouts() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/workouts/');
		xhr.onreadystatechange = function () {
			// If status is below error range, and readyState is 4 (DONE)
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status < 400) {
				  var allWorkouts = JSON.parse(xhr.responseText);
				  console.log(allWorkouts)
				  displayAllWorkouts(allWorkouts);
				}
				if (xhr.readyState === 4 && xhr.status >= 400) {
				  console.error(xhr.status + ': ' + xhr.responseText);
				}
			  };
			
			  xhr.send(null);
			}
		}

	//UPDATE WORKOUT
	function updateWorkout(workoutObj) {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', 'api/workouts/' + workoutObj.id, true);
		xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
					var updateWorkout = JSON.parse(xhr.responseText);
					getWorkouts();
				} else {
					console.log("POST request failed.");
					console.error(xhr.status + ': ' + xhr.responseText);
				}
			}
		};
		var userObjectJson = JSON.stringify(workoutObj); // Convert JS object to JSON string
		xhr.send(userObjectJson);
	}

	//DELETE WORKOUT
	function deleteWorkout(workoutObj) {
		let xhr = new XMLHttpRequest();
		xhr.open('Delete', 'api/delete/' + workoutObj.id, true);
		xhr.setRequestHeader("Content-type", "application/json"); 
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status == 200 || xhr.status == 204) { 
					console.log("successfully deleted");
					getWorkouts();
				} else {
					console.log("delete request failed.");
					console.error(xhr.status + ': ' + xhr.responseText);
				}
			}
		};
		var userObjectJson = JSON.stringify(workoutObj); // Convert JS object to JSON string
		xhr.send(userObjectJson);
	}

	//GET WORKOUTS BY KEYWORD
	function getByKeyword(keyword) {
		console.log('in keyword search function');
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/workouts/search/' + keyword);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState === 4 && xhr.status < 400) {
			var allWorkouts = JSON.parse(xhr.responseText);
			console.log(allWorkouts)
			displayKeywordWorkouts(allWorkouts);
		  }
		  if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		  }
		};
		xhr.send(null);
	  }
	
	  //DISPLAY TABLE OF WORKOUTS FROM KEYWORD SEARCH
	  function displayKeywordWorkouts(allWorkouts) {
		let keywordDiv = document.getElementById('keywordSearchDiv');
		keywordDiv.textContent = '';
		let p = document.createElement('p');
		p.textContent = 'There are ' + allWorkouts.length + ' workout(s) matching your keyword.'
	
		//create table
		let table = document.createElement('table');
		let thead = document.createElement('thead');
		let headRow = document.createElement('tr');
		//create table headers
		let th1 = document.createElement('th');
		th1.textContent = 'Id';
		let th2 = document.createElement('th');
		th2.textContent = 'Workout Name';
		let th3 = document.createElement('th');
		th3.textContent = 'Description';
	
		headRow.appendChild(th1);
		headRow.appendChild(th2);
		headRow.appendChild(th3);
	
		thead.appendChild(headRow);
		table.appendChild(thead);
	
		let tbody = document.createElement('tbody');
		//loop through workouts and add to table
		allWorkouts.forEach(function (value, index, array) {
	
			let tbodyRow = document.createElement('tr');
	
			let tableWorkoutId = document.createElement('td');
			let tableWorkoutName = document.createElement('td');
			let tableWorkoutDescription = document.createElement('td');
	
			tableWorkoutId.textContent = value.id + ')';
			tbodyRow.appendChild(tableWorkoutId);
	
			tableWorkoutName.textContent = value.workout;
			tableWorkoutName.addEventListener('click', function (e) { //make the name clickable, display workout data
				workoutDetail(value);
			});
			tbodyRow.appendChild(tableWorkoutName);
	
			tableWorkoutDescription.textContent = value.description;
			tbodyRow.appendChild(tableWorkoutDescription);
	
			tbody.appendChild(tbodyRow);
			table.appendChild(tbody);
		});
		keywordDiv.appendChild(p);
		keywordDiv.appendChild(table);

	}
	
	//GET WORKOUTS IN DATE RANGE

	function searchDateRange(date1, date2){
		console.log('in searchDateRange');
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'api/workouts/range/' + date1 + '/' + date2);
			xhr.onreadystatechange = function() {
			  if (xhr.readyState === 4 && xhr.status < 400) {
				var workoutsInRange = JSON.parse(xhr.responseText);
				console.log(workoutsInRange)
				displayWorkoutsInRange(workoutsInRange);
			  }
			  if (xhr.readyState === 4 && xhr.status >= 400) {
				console.error(xhr.status + ': ' + xhr.responseText);
			  }
			};
			xhr.send(null);
		  }

	//DISPLAY TABLE OF WORKOUTS FROM KEYWORD SEARCH
	function displayWorkoutsInRange(allWorkouts) {
		let rangeDiv = document.getElementById('dateRangeSearchDiv');
		rangeDiv.textContent = '';
		let p = document.createElement('p');
		p.textContent = 'There are ' + allWorkouts.length + ' workout(s) in this date range.'
	
		//create table
		let table = document.createElement('table');
		let thead = document.createElement('thead');
		let headRow = document.createElement('tr');
		//create table headers
		let th1 = document.createElement('th');
		th1.textContent = 'Id';
		let th2 = document.createElement('th');
		th2.textContent = 'Workout Name';
		let th3 = document.createElement('th');
		th3.textContent = 'Description';
	
		headRow.appendChild(th1);
		headRow.appendChild(th2);
		headRow.appendChild(th3);
	
		thead.appendChild(headRow);
		table.appendChild(thead);
	
		let tbody = document.createElement('tbody');
		//loop through workouts and add to table
		allWorkouts.forEach(function (value, index, array) {
	
			let tbodyRow = document.createElement('tr');
	
			let tableWorkoutId = document.createElement('td');
			let tableWorkoutName = document.createElement('td');
			let tableWorkoutDescription = document.createElement('td');
	
			tableWorkoutId.textContent = value.id + ')';
			tbodyRow.appendChild(tableWorkoutId);
	
			tableWorkoutName.textContent = value.workout;
			tableWorkoutName.addEventListener('click', function (e) { //make the name clickable, display workout data
				workoutDetail(value);
			});
			tbodyRow.appendChild(tableWorkoutName);
	
			tableWorkoutDescription.textContent = value.description;
			tbodyRow.appendChild(tableWorkoutDescription);
	
			tbody.appendChild(tbodyRow);
			table.appendChild(tbody);
		});
		rangeDiv.appendChild(p);
		rangeDiv.appendChild(table);

	}

		// O L D  D I S P L A Y .... D E L E T E ... delete pending testing
	// function displayWorkout(workout) {
	// 	console.log('in display workout')
	// 	var dataDiv = document.getElementById('displayDiv');
	// 	dataDiv.textContent = '';
	// 	let h1 = document.createElement('h1');
	// 	h1.textContent = workout.workout;
	// 	dataDiv.appendChild(h1);
	// 	let bq = document.createElement('blockquote');
	// 	bq.textContent = workout.category;
	// 	dataDiv.appendChild(bq);
	// 	// * details in unordered list
	// 	let ul = document.createElement('ul');
	// 	dataDiv.appendChild(ul);
	// 	let li = document.createElement('li');
	// 	li.textContent = 'Target Muscle(s): ' + workout.targetMuscle;
	// 	ul.appendChild(li);
	// 	li = document.createElement('li');
	// 	li.textContent = 'Date Completed: ' + workout.dateCompleted;
	// 	ul.appendChild(li)
	// 	li = document.createElement('li');
	// 	li.textContent = 'Workout Recrods: ' + workout.records;
	// 	ul.appendChild(li);
	// 	li = document.createElement('li');
	// 	li.textContent = 'Description: ' + workout.description;
	// 	ul.appendChild(li)
	// 	li = document.createElement('li');
	// 	li.textContent = 'Resources: ' + workout.resources;
	// 	ul.appendChild(li)
	// 	li = document.createElement('li');
	// 	li.textContent = 'Notes: ' + workout.notes;
	// 	ul.appendChild(li)
	// }

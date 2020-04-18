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
	getAllWorkouts();
}

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
					displayWorkout(data);
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

	function displayWorkout(workout) {
		console.log('in display workout')
		var dataDiv = document.getElementById('displayDiv');
		dataDiv.textContent = '';
		let h1 = document.createElement('h1');
		h1.textContent = workout.workout;
		dataDiv.appendChild(h1);
		let bq = document.createElement('blockquote');
		bq.textContent = workout.category;
		dataDiv.appendChild(bq);
		// * details in unordered list
		let ul = document.createElement('ul');
		dataDiv.appendChild(ul);
		let li = document.createElement('li');
		li.textContent = 'Target Muscle(s): ' + workout.targetMuscle;
		ul.appendChild(li);
		li = document.createElement('li');
		li.textContent = 'Date Completed: ' + workout.dateCompleted;
		ul.appendChild(li)
		li = document.createElement('li');
		li.textContent = 'Workout Recrods: ' + workout.records;
		ul.appendChild(li);
		li = document.createElement('li');
		li.textContent = 'Description: ' + workout.description;
		ul.appendChild(li)
		li = document.createElement('li');
		li.textContent = 'Resources: ' + workout.resources;
		ul.appendChild(li)
		li = document.createElement('li');
		li.textContent = 'Notes: ' + workout.notes;
		ul.appendChild(li)
	}

	function displayNotFound(msg) {
		var filmDiv = document.getElementById('displayDiv');
		filmDiv.textContent = msg;	
	}

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
					displayWorkout(workout);
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


	  function displayAllWorkouts(allWorkouts) {
		let allDiv = document.getElementById('allWorkoutsDiv');
		allDiv.textContent = '';
	
		let table = document.createElement('table');
	
		let thead = document.createElement('thead');
	
		let headRow = document.createElement('tr');
	
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
	
		allWorkouts.forEach(function (value, index, array) {
	
			let tbodyRow = document.createElement('tr');
	
			let tbodyData1 = document.createElement('td');
			let tbodyData2 = document.createElement('td');
			let tbodyData3 = document.createElement('td');
	
			tbodyData1.textContent = value.id + ')';
			tbodyRow.appendChild(tbodyData1);
	
	
			tbodyData2.textContent = value.workout;
			tbodyData2.addEventListener('click', function (e) {
				workoutDetail(value);
			});
			tbodyRow.appendChild(tbodyData2);
	
			tbodyData3.textContent = value.description;
			tbodyRow.appendChild(tbodyData3);
	
			tbody.appendChild(tbodyRow);
			table.appendChild(tbody);
		});
	
		allDiv.appendChild(table);
	
	}
	  
	//displays single workout details from clicking on workout name
	function workoutDetail(workout) {

		let singleWorkoutData = document.getElementById('singleWorkoutData');
		singleWorkoutData.textContent = '';
	
		let h2Title = document.createElement('h2');
		h2Title.textContent = workout.workout;
		singleWorkoutData.appendChild(h2Title);
	
		let description = document.createElement('p');
		description.textContent = workout.description;
		singleWorkoutData.appendChild(description);
	
		let btnBack = document.createElement('button');
		btnBack.textContent = "Back";
	
		// edit and back button event listeners
		let btnEdit = document.createElement('button');
		btnEdit.textContent = "Edit Workout";
	
		let btnDelete = document.createElement('button');
		btnDelete.textContent = "Delete Workout";
	
		btnBack.addEventListener('click', function (e) {
			singleWorkoutData.textContent = '';
			displayAllWorkouts();
		});
	
		btnEdit.addEventListener('click', function (e) {
			// editCrime(crime);
			displayAllWorkouts();
	
		});
	
		btnDelete.addEventListener('click', function (e) {
			e.preventDefault();
			// deleteCrime(crime);
			singleWorkoutData.textContent = '';
			displayAllWorkouts();
		});
	
		// append the buttons to the crime detail
		singleWorkoutData.appendChild(btnBack);
		singleWorkoutData.appendChild(btnEdit);
		singleWorkoutData.appendChild(btnDelete);
	
	
	}
		//edits workouts
	function editWorkout(workoutObj) {

		let editCrimeDataDiv = document.getElementById('editWorkoutDiv');
	
		// create the form, give it a name
		var form = document.createElement('form');
		form.name = 'editForm';
	
		// fields for form
		var workoutInput = document.createElement('input');
		workoutInput.name = 'id'; // assign a name attribute
		workoutInput.type = 'hidden'; // assign a type attribute
		workoutInput.value = workoutObj.id; // assign the id value
		form.appendChild(workoutInput);
	
		var workoutName = document.createElement('input');
		workoutName.workout = 'workoutName'; 
		workoutName.type = 'text'; 
		workoutName.placeholder = workoutObj.workoutName; //assign workout name value
		form.appendChild(workoutName);
	
		var categoryInput = document.createElement('input');
		categoryInput.name = 'categoryInput'; 
		categoryInput.type = 'text'; 
		categoryInput.placeholder = workoutObj.categoryInput; //assign workout category value
		form.appendChild(categoryInput);

		var muscleInput = document.createElement('input');
		muscleInput.name = 'muscleInput'; 
		muscleInput.type = 'text'; 
		muscleInput.placeholder = workoutObj.muscleInput; //assign workout target muscle value
		form.appendChild(muscleInput);

		var dateInput = document.createElement('input');
		dateInput.name = 'dateInput'; 
		dateInput.type = 'text'; 
		dateInput.placeholder = workoutObj.dateInput; //assign workout date value
		form.appendChild(dateInput);

		var recordInput = document.createElement('input');
		recordInput.name = 'recordInput'; 
		recordInput.type = 'text'; 
		recordInput.placeholder = workoutObj.recordInput; //assign workout record value
		form.appendChild(recordInput);
		
		var workDescInput = document.createElement('input');
		workDescInput.name = 'workDescInput'; 
		workDescInput.type = 'text'; 
		workDescInput.placeholder = workoutObj.workDescInput; //assign workout description value
		form.appendChild(workDescInput);

		var resourceInput = document.createElement('input');
		resourceInput.name = 'resourceInput'; 
		resourceInput.type = 'text'; 
		resourceInput.placeholder = workoutObj.resourceInput; //assign workout resources value
		form.appendChild(resourceInput);

		var resourceInput = document.createElement('input');
		resourceInput.name = 'resourceInput'; 
		resourceInput.type = 'text'; 
		resourceInput.placeholder = workoutObj.resourceInput; //assign workout resources value
		form.appendChild(resourceInput);

		var submit = document.createElement('input');
		submit.name = 'submit'; 
		submit.type = 'submit'; 
		submit.value = 'Submit Form'; // assign a value attribute
	
		submit.addEventListener('click', function (e) { // Assign an event listener to the submit button variable
			e.preventDefault();
			var form = e.target.parentElement;
	
			// reassign the crime with updated info
			workoutObj.workoutName = form.workoutName.value;
			workoutObj.workDescInput = form.workDescInput.value;
	
			// PUT request, update crime
			updateCrime(workoutObj);
			editWorkoutDiv.textContent = '';
			let singleWorkoutData = document.getElementById('singleWorkoutData');
			singleWorkoutData.textContent = '';
			// clear the form data
			form.reset();
			getWorkouts();
		});
		form.appendChild(submit); //append submit to form
		editCrimeDataDiv.appendChild(form); //append form to div
	}
	
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
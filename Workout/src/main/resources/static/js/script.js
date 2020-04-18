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
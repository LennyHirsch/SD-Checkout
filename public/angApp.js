var app = angular.module('SDcheckout', []);

app.controller('SDctrl', function($scope){
	var initialUserList = [{"name":"Alan", "value":0}, {"name":"Chantal", "value":0}, {"name":"Jon", "value":0}, {"name":"Daryl", "value":0}, {"name":"Mike", "value":0}, {"name":"Jesse", "value":0}, {"name":"Josh", "value":0}, {"name":"Angus", "value":0}, {"name":"Faraz", "value":0}, {"name":"Marko", "value":0}, {"name":"Pat", "value":0}, {"name":"Derek", "value":0}, {"name":"Joe", "value":0}];
	$scope.users = getUsersFromLocalStorage();
	$scope.admin = false;
	$scope.activeUser = {};
	$scope.activeUser = $scope.users[0];

	// Check if total SDs is in localStorage. If not, set to 0
	if (localStorage.SDcards) {
		$scope.totalSDs = Number(getSDsFromLocalStorage());
	} else {
		$scope.totalSDs = 0;
	};

	$scope.updateActiveUser = function(user) {
		$scope.activeUser = user;
	};

	$scope.updateCardCount = function(amount) {
		$scope.activeUser.value -= Number(amount);
		$scope.totalSDs += Number(amount);

		saveUsersToLocalStorage($scope.users);
		saveSDsToLocalStorage($scope.totalSDs);
	};

	$scope.adminSetCardCount = function() {
		saveSDsToLocalStorage($scope.totalSDs);
	};

});

function clearLocalStorage() {
	localStorage.SDcards = 0;
	localStorage.users = JSON.stringify([{"name":"Alan", "value":0}, {"name":"Chantal", "value":0}, {"name":"Jon", "value":0}, {"name":"Daryl", "value":0}, {"name":"Mike", "value":0}, {"name":"Jesse", "value":0}, {"name":"Josh", "value":0}, {"name":"Angus", "value":0}, {"name":"Faraz", "value":0}, {"name":"Marko", "value":0}, {"name":"Pat", "value":0}, {"name":"Derek", "value":0}, {"name":"Joe", "value":0}]);
};

function getSDsFromLocalStorage() {
	return JSON.parse(localStorage.SDcards);
};

function getUsersFromLocalStorage() {
	var Users = localStorage.users;
	if (typeof(Users) == "undefined") {
		return [{"name":"Alan", "value":0}, {"name":"Chantal", "value":0}, {"name":"Jon", "value":0}, {"name":"Daryl", "value":0}, {"name":"Mike", "value":0}, {"name":"Jesse", "value":0}, {"name":"Josh", "value":0}, {"name":"Angus", "value":0}, {"name":"Faraz", "value":0}, {"name":"Marko", "value":0}, {"name":"Pat", "value":0}, {"name":"Derek", "value":0}, {"name":"Joe", "value":0}];
	}
	return JSON.parse(localStorage.users);
};

function saveSDsToLocalStorage(data) {
	localStorage.setItem('SDcards', JSON.stringify(data));
};

function saveUsersToLocalStorage(data) {
	localStorage.setItem('users', JSON.stringify(data));
};

document.getElementById('localStorageValue').innerHTML = Number(localStorage.SDcards);

// Disable right click
function disableclick(event) {
	if(event.button==2) {
		return false;    
	} else if(event.button==3) {
		return false;
	}
};
document.onmousedown=disableclick;

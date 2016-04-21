'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase']) // => dependency injections go into the array bracket

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', { // => declares when the url shows "/contact"
    templateUrl: 'contacts/contacts.html', // => render the contacts.html form into the view
    controller: 'ContactsCtrl' // => and get all of its functionality from this specific controller
  });
}])


// CONTACTS CONTROLLER
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) { // => shows a list of dependencies for this controller within []

	////INITIALIZE FIREBASE
	var ref = new Firebase('https://mycontacapp.firebaseio.com/contacts')// => this variable represents the connection to the DB in firebase

	//GET CONTACTS
	$scope.contacts = $firebaseArray(ref); // => Getting current contacts within database on firebase

	////SHOW ADD FORM
	$scope.showAddForm = function(){ // => a function dedicated to displaying the form
		$scope.addFormShow = true; // => this the "addFormShow" variable that remains true, whenever the directive has this value it will function

	}

	////SHOW EDIT FORM
	$scope.showEditForm = function(contact){ // => a function dedicated to displaying the edit form
		$scope.editFormShow = true;

		//Passing values to the edit form of the current contact
		$scope.id 						= contact.$id;
		$scope.name 					= contact.name;
		$scope.email					= contact.email;
		$scope.company					= contact.company;

		$scope.work_phone				= contact.phones[0].work_phone;
		$scope.home_phone				= contact.phones[0].home_phone;
		$scope.mobile_phone				= contact.phones[0].mobile_phone;

		$scope.street_address			= contact.address[0].street_address;
		$scope.city						= contact.address[0].city;
		$scope.state					= contact.address[0].state;
		$scope.zipcode					= contact.address[0].zipcode;




	}

	////HIDE FORMS
	$scope.hide = function(){ // => a function dedicated to hiding certain forms
		$scope.addFormShow = false; // => this the "addFormShow" variable that remains false, in so whenever the directive has this value it will call this function, i.e ng-hide="hide()" when its false hide
		$scope.contactShow = false; // => this is the "contactShow" variable that is turned false, when someone interacts with a feature that holds the "hide()" function
	}

	////SUBMIT CONTACT
	$scope.addFormSubmit = function (){
		console.log('Adding Contact');

		///Assigning Values
		if($scope.name){ var name = $scope.name } else {var name = null; }
		if($scope.email){ var email = $scope.email } else {var email = null; }
		if($scope.company){ var company = $scope.company } else {var company = null; }
		if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone } else {var mobile_phone = null; }
		if($scope.home_phone){ var home_phone = $scope.home_phone } else {var home_phone = null; }
		if($scope.work_phone){ var work_phone = $scope.work_phone } else {var work_phone = null; }
		if($scope.street_address){ var street_address = $scope.street_address } else {var street_address = null; }
		if($scope.city){ var city = $scope.city } else {var city = null; }
		if($scope.state){ var state = $scope.state } else {var state = null; }
		if($scope.zipcode){ var zipcode = $scope.zipcode } else {var zipcode = null; }

		///Building each Object
		$scope.contacts.$add({ // => Placing the format of everything into JSON format
			name: name,
			email: email,
			company: company,
			phones: [
				{
					mobile_phone: mobile_phone,
					home_phone: home_phone,
					work_phone: work_phone
				}
			],

			address: [
				{
					street_address: street_address,
					city: city,
					state: state,
					zipcode: zipcode
				}
			]

		}).then(function(ref){

			var id = ref.key(); // =>works as a primary key for each entry/object loaded into the contacts form...establishing the variable
			console.log('Added contact with ID: ' + id);

			///Clear Form
			clearFields(); // => a function dedicated to clearing all fields that have been entered into the form

			///Hide Form
			$scope.addFormShow = false; // => hides the form after data has been entered

			///Send Message
			$scope.msg = "Contact Added!";



		});
	}

		////EDIT CONTACT FORM
		$scope.editFormSubmit = function(){
			console.log('Updating contact');

			///Get the contact id and set it within the scope of the application
			var id = $scope.id;

			//Retrieves the record associated with that contact id
			var record = $scope.contacts.$getRecord(id);

			//Assign the new updated values
			record.name 							= $scope.name;
			record.email 							= $scope.email;
			record.company 							= $scope.company;

			record.phones[0].work_phone				= $scope.work_phone;
			record.phones[0].home_phone				= $scope.home_phone;
			record.phones[0].mobile_phone			= $scope.mobile_phone;

			record.address[0].street_address 		= $scope.street_address;
			record.address[0].city 					= $scope.city;
			record.address[0].state 				= $scope.state;
			record.address[0].szipcode 				= $scope.zipcode;

			///Allow for new values to be saved
			$scope.contacts.$save(record).then(function(ref){
				console.log(ref.key);
			});

			clearFields();

			//Hide the Edit Form
			$scope.editFormShow = false;

			//Sends message to user that contact information has been updated
			$scope.msg == "Contact Updated"




		}
		////SHOW CONTACT FORM
		$scope.showContact = function(contact){ // => This function is dedicated to connecting the values of the contact and showing it at the top of the page
			console.log('Getting Contact');

			//Establishing the variables under scope so it can be usedin the application
			$scope.name = contact.name;
			$scope.email = contact.email;
			$scope.company = contact.company;

			$scope.work_phone		= contact.phones[0].work_phone;
			$scope.home_phone		= contact.phones[0].home_phone;
			$scope.mobile_phone		= contact.phones[0].mobile_phone;
			$scope.street_address	= contact.address[0].street_address;
			$scope.city				= contact.address[0].city;
			$scope.state			= contact.address[0].state;
			$scope.zipcode			= contact.address[0].zipcode;

			$scope.contactShow = true;

		}


		///REMOVE CONTACT
		$scope.removeContact = function(contact){
			console.log ("Removing Contact");

			$scope.contacts.$remove(contact);

			$scope.msg ="Contact Removed";
		}

		///Clear Fields
		function clearFields(){
			console.log('Clearing All Fields...');

			$scope.name = '';
			$scope.email = '';
			$scope.company = '';
			$scope.mobile_phone = '';
			$scope.home_phone = '';
			$scope.work_phone = '';
			$scope.street_address = '';
			$scope.city = '';
			$scope.state = '';
			$scope.zipcode = '';
		}

}]);

console.log('start');
SpaceGame = function(){
	var self = this;
	SpaceGame.apiStatus = ko.observable();
	SpaceGame.db_buildings = ko.observableArray();
	SpaceGame.db_resources = ko.observableArray();

	SpaceGame.apiStatus('fetch');

	// add static test-buildings TODO: load from DB
	var load_db_buildings = function(status){
		SpaceGame.apiStatus('fetch');
		$.ajax({
			url: 'api/init_db_data.php',
			data: {},
			cache: false
		}).done(function(data) {
			//console.log(data);
			var obj = JSON3.parse(data);
			SpaceGame.db_buildings.removeAll();
			$.each(obj.buildings, function(index, value) {
				SpaceGame.db_buildings.push(new DB_Building(value));
				console.log(index, value);
			});
			$.each(obj.resources, function(index, value) {
				SpaceGame.db_resources.push(new DB_Resource(value));
				console.log(index, value);
			});
		}).error(function(data) {
			console.log("NEW AJAX ERROR!", data);
		});
	};
	load_db_buildings();
};
ko.applyBindings(SpaceGame);

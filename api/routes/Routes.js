const monitor = require( "../controllers/monitorController" );

module.exports = app => {

	app
		.route( "/monitor" )
		.get( monitor.show );

};
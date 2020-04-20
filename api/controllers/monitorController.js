const util = require( "util" );
const exec = util.promisify( require( "child_process" ).exec );

exports.show = ( req, res ) => {

	( async function () {res.json( await getPiStatus());})();
};

async function getPiStatus () {
	const output = {};

	try {        
		output.df = { stdout, stderr } = await exec( "df -h" ); 
		output.df.human = output.df.stdout.split( "\n" ).map( function( each ) {return each.split( /\s+/ );});
		output.df.human[ 0 ][ 5 ] += " " + output.df.human[ 0 ][ 6 ]; // wrong on Mac, should work on Pi
		output.df.human[ 0 ].pop(); // this and line above used to combine back into a single element
        
		output.cpu_temp = { stdout, stderr } = await exec( "cat /sys/class/thermal/thermal_zone0/temp" );
		output.cpu_temp.human = ( output.cpu_temp.stdout / 1000 ).toFixed( 1 );

		output.gpu_temp = { stdout, stderr } = await exec( "vcgencmd measure_temp" );
		const gVal = output.gpu_temp.stdout;
		output.gpu_temp.human = gVal.slice( gVal.indexOf( "=" )+1,gVal.indexOf( "'" ));

		output.top = { stdout, stderr } = await exec( "top -b -n 1 -o %MEM" );
		output.top.human = output.top.stdout.split( "\n" );
		output.top.first = output.top.human.splice( 0,6 );
		output.top.human = output.top.human.splice( 0,15 ).map( function( each ) {
			return each.trim().split( /\s+/ );
		});

		return output;
	} catch ( err ) {
		console.error( err );
	};
}

const rowCount = function( num ) {
	let output = 0;
	while ( num > 0 ) {
		output ++;
		num -= 9;
	}
	return output; 
};

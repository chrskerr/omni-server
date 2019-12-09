const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.show = (req, res) => {

    (async function () {res.json( await getPiStatus() )})();
};

async function getPiStatus () {
    let output = {};

    try {
        output.uptime = { stdout, stderr } = await exec('uptime');
        output.uname = { stdout, stderr } = await exec('uname -nro');
        
        output.free = { stdout, stderr } = await exec('free -h'); 
        output.free.stdout = output.free.stdout.split('\n');
        output.free.stdout = output.free.stdout.map(function(each) {return each.split(/\s+/)});
        output.free.stdout[0].unshift('');
        
        output.df = { stdout, stderr } = await exec('df -h'); 
        output.df.stdout = output.df.stdout.split('\n');
        output.df.stdout = output.df.stdout.map(function(each) {return each.split(/\s+/)})
        output.df.stdout[0][5] += ' ' + output.df.stdout[0][6]; // wrong on Mac, should work on Pi
        output.df.stdout[0].pop(); // this and line above used to combine back into a single element
        
        return output;
  } catch (err) {
     console.error(err);
  };
}

const rowCount = function(num) {
    let output = 0
    while (num > 0) {
        output ++
        num -= 9
    }
    return output 
}
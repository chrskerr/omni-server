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
        output.free.human = output.free.stdout.split('\n').map(function(each) {return each.split(/\s+/)});
        output.free.human[0].unshift('');
        
        output.df = { stdout, stderr } = await exec('df -h'); 
        output.df.human = output.df.stdout.split('\n').map(function(each) {return each.split(/\s+/)});
        output.df.human[0][5] += ' ' + output.df.human[0][6]; // wrong on Mac, should work on Pi
        output.df.human[0].pop(); // this and line above used to combine back into a single element
        
        output.cpu_temp = { stdout, stderr } = await exec('cat /sys/class/thermal/thermal_zone0/temp');
        output.cpu_temp.human = (output.cpu_temp.stdout / 1000).toFixed(1);

        output.gpu_temp = { stdout, stderr } = await exec('vcgencmd measure_temp');
        const gVal = output.gpu_temp;
        output.gpu_temp.human = gVal.slice(gVal.indexOf('=')+1,gVal.indexOf("'"));

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
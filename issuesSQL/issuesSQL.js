const sqlite3 = require('better-sqlite3');

class Issues {
    constructor (dbFileLoc) {
        this.db = new sqlite3(dbFileLoc, { verbose: console.log });  
    }

    getAll(args) {
        const output = this.db.prepare("SELECT * FROM Issues").all();
        // add a "have I voted?" lookup too, maybe in a "each()" type loop
        return output;
    }

    getOne(args) {
        const output = this.db.prepare("SELECT * FROM Issues WHERE issueId = ?").get(args.issueId);
        // add a "have I voted?" lookup too
        return output
    }

}

// module.exports = new Issues('/Users/chris/myProjects/omni-server/issuesSQL/issues.sqlite3');
module.exports = new Issues('/home/pi/omni-server/issuesSQL/issues.sqlite3');
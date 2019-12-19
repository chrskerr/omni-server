const sqlite3 = require('better-sqlite3');
const crypto = require('crypto');
const fs = require('fs');

const privateKey = {
    key: fs.readFileSync("/Users/chris/myProjects/private.pem", 'utf8').toString(),
    passphrase: 'block'
};
const publicKey = fs.readFileSync('/Users/chris/myProjects/public.pem', 'utf8').toString();

class Blockchain {

    constructor (dbFileLoc) {
        this.db = new sqlite3(dbFileLoc, { verbose: console.log });
        this.db.pragma("foreign_keys = ON");
    }

    dataDump() {
        const output = {
            blocks: this.db.prepare("SELECT * FROM Blocks").all(),
            transactions: this.db.prepare("SELECT * FROM Transactions").all(),
            tokens: this.db.prepare("SELECT * FROM Tokens").all(),
            votes: this.db.prepare("SELECT * FROM Votes").all()
        };
        return output
    }

    getIdentifier(args) {
        const identifier = crypto.createHash('sha256').update(`${args.licence}${args.stage}${args.surname}`, 'utf8').digest('hex');
        return identifier;
    }

    personsVoteHistory(identifier) {
        // to do, calculate this from Votes table
        return [1, 3]
    }

    recordVote(args) {
        const identifier = this.getIdentifier(args);
        const voteHash = crypto.createHash('sha256').update(`${identifier}-${args.issueId}`, 'utf8').digest('hex');

        if (this.db.prepare("SELECT * FROM Votes WHERE Identifier = ?").all(identifier).length > 0) {
            return "You have already voted"
        } else {
            const newVote = this.db.prepare("INSERT INTO Votes (identifier, IssueID, Hash, HashVersion) VALUES (?, ?, ?, ?)").run(identifier, args.issueId, voteHash, 1)

            console.log(newVote)
            return "New user created"

        }

        // check that the user has not voted yet

        // find current block, call another method

        // insert new vote linked to appropriate block

        // return success / failure 
    }

    findCurrentBlock() {
        // db lookup to find the most recent block. Largest auto-incremented blockId seems best.

        // if transaction count is above 100: create a new block, link it to the previous. call mineBlock on the previous, and then return the new ID.

        // https://stackoverflow.com/questions/41949724/how-does-db-serialize-work-in-node-sqlite3 
        // this could be handy to help ensure order of operations?

        // if transaction count is okay: return ID
    }

    mineBlock(blockId) {
        // pull all the linked Votes to that block and the info contained with previous block? 
        // hash these all together ? 
        let input = Buffer.from('A hash of all the blocks maybe?', 'utf8');
        const output = crypto.privateEncrypt(privateKey, input).toString('base64');

        // https://nodejs.org/api/crypto.html
    }

    // decryptBlock(signedString) {
    //     const origData = crypto.publicDecrypt(publicKey, Buffer.from(signedString, 'base64'))
    // }

}


module.exports = new Blockchain('/Users/chris/myProjects/omni-server/blockchain/blockchain.sqlite3');


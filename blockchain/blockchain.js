const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./votechain.sqlite3');
const crypto = require('crypto');
const fs = require('fs');

const privateKey = {
    key: fs.readFileSync("/Users/chris/myProjects/private.pem", 'utf8').toString(),
    passphrase: 'block'
};
const publicKey = fs.readFileSync('/Users/chris/myProjects/public.pem', 'utf8').toString();

class Votes {

    recordVote(voteObj) {
        // create the vote hash from identifier & issueId

        // check that the user has not voted yet

        // find current block, call another method

        // insert new vote linked to appropriate block

        // return success / failure 
    }

    findCurrentBlock() {
        // db lookup to find the most recent block. Following the linked-list seems slow, they should all be numerical? 

        // if transaction count is above 100: create a new block, link it to the previous. call mineBlock on the previous, and then return the new ID

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



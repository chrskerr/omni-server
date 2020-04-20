
const sqlite3 = require( "better-sqlite3" );
const crypto = require( "crypto" );
const fs = require( "fs" );

const privateKey = {
	// key: fs.readFileSync( `${ __dirname }/private.pem`, 'utf8' ).toString(),
	key: process.env.PRIVATE_KEY,
	passphrase: "block",
};
// const publicKey = fs.readFileSync('./public.pem', 'utf8').toString();

class Blockchain {
	constructor ( dbFileLoc ) {
		this.db = new sqlite3( dbFileLoc, { verbose: console.log });
	}

	dataDump() {
		const output = {
			blocks: this.db.prepare( "SELECT * FROM Blocks" ).all(),
			transactions: this.db.prepare( "SELECT * FROM Transactions" ).all(),
			tokens: this.db.prepare( "SELECT * FROM Tokens" ).all(),
			votes: this.db.prepare( "SELECT * FROM Votes" ).all(),
		};
		return output;
	}

	getIdentifier( args ) {
		const identifier = crypto.createHash( "sha256" ).update( `${args.licence}${args.stage}${args.surname}`, "utf8" ).digest( "hex" );
		return identifier;
	}

	personsVoteHistory( identifier ) {
		// TO-DO: make this work
		const arr = this.db.prepare( "SELECT IssueID FROM Votes WHERE Identifier = ?" ).all( identifier );

		const output = arr.map(( object ) => {
			object.IssueID;
		});

		console.log( output );

		return [ 1,3 ];
	}

	recordVote( args ) {
		// TO DO: determine if voting has expired for an issue
		const identifier = this.getIdentifier( args );
		const voteHash = crypto.createHash( "sha256" ).update( `${identifier}${args.issueId}`, "utf8" ).digest( "hex" );
		const token = crypto.createHash( "sha256" ).update( `${Math.random()}-${Math.random()}-${args.issueId}`, "utf8" ).digest( "hex" );
		const tokenHash = crypto.createHash( "sha256" ).update( `${token}${args.response}${args.issueId}`, "utf8" ).digest( "hex" );

		if ( this.db.prepare( "SELECT * FROM Votes WHERE Hash = ?" ).all( voteHash ).length > 0 ) {
			return {
				message: "",
				error: "You have already voted",
			};

		} else {
			const blockID = this.findCurrentBlock();

			this.db.prepare( "INSERT INTO Votes (identifier, IssueID, Hash, HashVersion) VALUES (?, ?, ?, ?)" ).run( identifier, args.issueId, voteHash, 1 );
			this.db.prepare( "INSERT INTO Transactions (TransactionHash, TransactionType, BlockID) VALUES (?, ?, ?)" ).run( voteHash, "vote", blockID );
			this.db.prepare( "UPDATE Blocks SET TransactionCount = TransactionCount + 1 WHERE BlockID = ?" ).run( blockID );

			this.db.prepare( "INSERT INTO Tokens (Token, Response, IssueID, Hash, HashVersion) VALUES (?, ?, ?, ?, ?)" ).run( token, args.response, args.issueId, tokenHash, 1 );
			this.db.prepare( "INSERT INTO Transactions (TransactionHash, TransactionType, BlockID) VALUES (?, ?, ?)" ).run( tokenHash, "token", blockID );
			this.db.prepare( "UPDATE Blocks SET TransactionCount = TransactionCount + 1 WHERE BlockID = ?" ).run( blockID );

			this.mineBlock( blockID );

			return {
				message: "Vote accepted",
				error: "",
			};
		}
	}

	findCurrentBlock() {
		const blocks = this.db.prepare( "SELECT BlockID FROM Blocks" ).all();
		let output = 1;
		blocks.forEach(( object ) => {
			if ( object.BlockID > output ) output = object.BlockID;
		});
		return output;
	}

	mineBlock( blockId ) {
		const block = this.db.prepare( "SELECT * FROM Blocks WHERE BlockID = ?" ).get( blockId );

		if ( block.TransactionCount >= 6 ) {
			this.db.prepare( "INSERT INTO Blocks (PrevBlockID) VALUES (?)" ).run( blockId ); 

			// https://nodejs.org/api/crypto.html
			const BlockSignature = crypto.privateEncrypt( privateKey, Buffer.from([
				this.db.prepare( "SELECT * FROM Transactions WHERE BlockID = ?" ).all( blockId ),
				blockId,
				block.TransactionCount,
				block.PrevBlockSignature,
			])).toString( "base64" );
            
			this.db.prepare( "UPDATE Blocks SET Signature = $signature, SignatureVersion = $signatureVer WHERE BlockID = $blockID" ).run({
				signature: BlockSignature,
				signatureVer: 1,
				blockID: blockId,
			});

			this.db.prepare( "UPDATE Blocks SET PrevBlockSignature = @signature WHERE PrevBlockID = @blockID" ).run({
				signature: BlockSignature,
				blockID: blockId,
			});
		}
	}


	// decryptBlock(signedString) {
	//     const origData = crypto.publicDecrypt(publicKey, Buffer.from(signedString, 'base64'))
	// }

}

module.exports = new Blockchain( `${ __dirname }/blockchain.sqlite3` );

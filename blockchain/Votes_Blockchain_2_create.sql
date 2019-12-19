-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-12-19 00:19:09.676

-- tables
-- Table: Blocks
CREATE TABLE Blocks (
    BlockID integer NOT NULL CONSTRAINT Blocks_pk PRIMARY KEY AUTOINCREMENT,
    PrevBlockID integer NOT NULL,
    VoteCount integer NOT NULL DEFAULT 0,
    Signature text,
    SignatureVersion integer,
    PrevBlockSignature integer NOT NULL,
    CreatedDateTime datetime NOT NULL,
    CONSTRAINT VotesBlocks_VotesBlocks FOREIGN KEY (PrevBlockID)
    REFERENCES Blocks (BlockID)
);

-- Table: Tokens
CREATE TABLE Tokens (
    Token text NOT NULL,
    Response text NOT NULL,
    IssueID integer NOT NULL,
    Hash text NOT NULL CONSTRAINT Tokens_pk PRIMARY KEY,
    HashVersion integer NOT NULL
);

-- Table: Transactions
CREATE TABLE Transactions (
    TransactionID integer NOT NULL CONSTRAINT Transactions_pk PRIMARY KEY,
    TransactionHash text NOT NULL,
    TransactionType text NOT NULL,
    BlockID integer NOT NULL,
    CONSTRAINT Blocks_Transactions FOREIGN KEY (BlockID)
    REFERENCES Blocks (BlockID),
    CONSTRAINT Transactions_Votes FOREIGN KEY (TransactionHash)
    REFERENCES Votes (Hash),
    CONSTRAINT Transactions_Tokens FOREIGN KEY (TransactionHash)
    REFERENCES Tokens (Hash)
);

-- Table: Votes
CREATE TABLE Votes (
    Identifier text NOT NULL,
    IssueID integer NOT NULL,
    Hash text NOT NULL CONSTRAINT ID PRIMARY KEY,
    HashVersion integer NOT NULL,
    CONSTRAINT hash UNIQUE (Hash)
);


INSERT INTO Blocks (BlockID, PrevBlockID, PrevBlockSignature, CreatedDateTime) VALUES (1, 0, "12345", "2019-12-19 12:00:00");
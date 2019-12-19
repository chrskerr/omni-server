-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-12-19 00:19:09.676

-- tables
-- Table: Blocks
CREATE TABLE Blocks (
    BlockID integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    PrevBlockID integer NOT NULL,
    TransactionCount integer NOT NULL DEFAULT 0,
    Signature text,
    SignatureVersion integer,
    PrevBlockSignature text
);

-- Table: Tokens
CREATE TABLE Tokens (
    Token text NOT NULL,
    Response text NOT NULL,
    IssueID integer NOT NULL,
    Hash text NOT NULL PRIMARY KEY,
    HashVersion integer NOT NULL
);

-- Table: Transactions
CREATE TABLE Transactions (
    TransactionID integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    TransactionHash text NOT NULL,
    TransactionType text NOT NULL,
    BlockID integer NOT NULL
);

-- Table: Votes
CREATE TABLE Votes (
    Identifier text NOT NULL,
    IssueID integer NOT NULL,
    Hash text NOT NULL PRIMARY KEY,
    HashVersion integer NOT NULL,
    CONSTRAINT hash UNIQUE (Hash)
);


INSERT INTO Blocks (BlockID, PrevBlockID, PrevBlockSignature) VALUES (1, 0, "12345");
-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-12-18 12:12:30.838

-- tables
-- Table: Tokens
CREATE TABLE Tokens (
    ID integer NOT NULL CONSTRAINT Tokens_pk PRIMARY KEY,
    Token text NOT NULL,
    Response text NOT NULL,
    Hash text NOT NULL,
    HashVersion integer NOT NULL,
    BlockID integer NOT NULL,
    IssueID text NOT NULL,
    CONSTRAINT TokensBlocks_Tokens FOREIGN KEY (BlockID)
    REFERENCES TokensBlocks (BlockID)
);

-- Table: TokensBlocks
CREATE TABLE TokensBlocks (
    BlockID integer NOT NULL CONSTRAINT TokensBlocks_pk PRIMARY KEY,
    PrevBlockID integer,
    VoteCount integer,
    BlockSignature text,
    SignatureVersion integer,
    PrevBlockSignature integer NOT NULL,
    CreatedDateTime datetime NOT NULL,
    CONSTRAINT TokensBlocks_TokensBlocks FOREIGN KEY (PrevBlockID)
    REFERENCES TokensBlocks (BlockID)
);

-- Table: Votes
CREATE TABLE Votes (
    ID integer NOT NULL CONSTRAINT ID PRIMARY KEY,
    Identifier text NOT NULL,
    IssueID text NOT NULL,
    Hash text NOT NULL,
    HashVersion integer NOT NULL,
    BlockID integer NOT NULL,
    CONSTRAINT hash UNIQUE (Hash),
    CONSTRAINT VotesBlocks_Votes FOREIGN KEY (BlockID)
    REFERENCES VotesBlocks (BlockID)
);

-- Table: VotesBlocks
CREATE TABLE VotesBlocks (
    BlockID integer NOT NULL CONSTRAINT VotesBlocks_pk PRIMARY KEY,
    PrevBlockID integer,
    VoteCount integer,
    BlockSignature text,
    SignatureVersion integer,
    PrevBlockSignature integer NOT NULL,
    CreatedDateTime datetime NOT NULL,
    CONSTRAINT VotesBlocks_VotesBlocks FOREIGN KEY (PrevBlockID)
    REFERENCES VotesBlocks (BlockID)
);

-- End of file.


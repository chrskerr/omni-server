CREATE TABLE Issues (
    IssueId integer NOT NULL CONSTRAINT IssueID_pk PRIMARY KEY AUTOINCREMENT,   
    question text NOT NULL,
    summary text NOT NULL,
    description text NOT NULL,
    caseFor text NOT NULL,
    caseAgainst text NOT NULL,
    closeDate text
);


INSERT INTO Issues (question, summary, description, caseFor, caseAgainst, closeDate) VALUES ("Do you support changing this thing?", "This is issue one", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam obcaecati animi exercitationem modi laudantium. Debitis esse dicta ad nisi porro quo suscipit provident, voluptatum labore iste aperiam officia incidunt neque!", "This is a good idea, a very good idea", "I've never heard a worse idea in my life!", "today");
INSERT INTO Issues (question, summary, description, caseFor, caseAgainst, closeDate) VALUES ("Do you support changing some other thing?", "This is issue two", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam obcaecati animi exercitationem modi laudantium. Debitis esse dicta ad nisi porro quo suscipit provident, voluptatum labore iste aperiam officia incidunt neque!", "This is a good idea, a very good idea", "I've never heard a worse idea in my life!", "today");
INSERT INTO Issues (question, summary, description, caseFor, caseAgainst, closeDate) VALUES ("Do you support changing another thing again?", "This is issue three", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam obcaecati animi exercitationem modi laudantium. Debitis esse dicta ad nisi porro quo suscipit provident, voluptatum labore iste aperiam officia incidunt neque!", "This is a good idea, a very good idea", "I've never heard a worse idea in my life!", "today");
INSERT INTO Issues (question, summary, description, caseFor, caseAgainst, closeDate) VALUES ("Do you support changing another another thing?", "This is issue four", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam obcaecati animi exercitationem modi laudantium. Debitis esse dicta ad nisi porro quo suscipit provident, voluptatum labore iste aperiam officia incidunt neque!", "This is a good idea, a very good idea", "I've never heard a worse idea in my life!", "today");

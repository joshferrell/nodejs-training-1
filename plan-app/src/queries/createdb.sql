DROP TABLE IF EXISTS members

CREATE TABLE members(
    id varchar(255),
    name varchar(255),
    default_plan varchar(255)
)

INSERT INTO members(id, name, default_plan) VALUES('1', 'john', '')
INSERT INTO members(id, name, default_plan) VALUES('2', 'jane', '')

PRAGMA foreign_keys=OFF;
DROP TABLE IF EXISTS myllaScore;
DROP TABLE IF EXISTS pacmanScore;
DROP TABLE IF EXISTS breakoutScore;

BEGIN TRANSACTION;
CREATE TABLE myllaScore (
  name varchar(30),
  score int
);
INSERT INTO "myllaScore" VALUES('Albert Einstein',9);
INSERT INTO "myllaScore" VALUES('Marilyn Monroe',3);
INSERT INTO "myllaScore" VALUES('Abraham Lincoln',8);
INSERT INTO "myllaScore" VALUES('Mother Teresa',4);
INSERT INTO "myllaScore" VALUES('John F. Kennedy',5);
INSERT INTO "myllaScore" VALUES('Martin Luther King',8);
INSERT INTO "myllaScore" VALUES('Nelson Mandela',5);
INSERT INTO "myllaScore" VALUES('Winston Churchill',3);
INSERT INTO "myllaScore" VALUES('Bill Gates',4);
INSERT INTO "myllaScore" VALUES('Muhammad Ali',1);
INSERT INTO "myllaScore" VALUES('Mahatma Gandhi',6);
INSERT INTO "myllaScore" VALUES('Margaret Thatcher',10);
INSERT INTO "myllaScore" VALUES('Elvis Presley',10);
CREATE TABLE breakoutScore (
  name varchar(30),
  score int
);
INSERT INTO "breakoutScore" VALUES('Albert Einstein',100);
INSERT INTO "breakoutScore" VALUES('Marilyn Monroe',30);
INSERT INTO "breakoutScore" VALUES('Abraham Lincoln',20);
INSERT INTO "breakoutScore" VALUES('Mother Teresa',40);
INSERT INTO "breakoutScore" VALUES('John F. Kennedy',50);
INSERT INTO "breakoutScore" VALUES('Martin Luther King',80);
INSERT INTO "breakoutScore" VALUES('Nelson Mandela',50);
INSERT INTO "breakoutScore" VALUES('Winston Churchill',30);
INSERT INTO "breakoutScore" VALUES('Bill Gates',40);
INSERT INTO "breakoutScore" VALUES('Muhammad Ali',10);
INSERT INTO "breakoutScore" VALUES('Mahatma Gandhi',60);
INSERT INTO "breakoutScore" VALUES('Margaret Thatcher',10);
INSERT INTO "breakoutScore" VALUES('Elvis Presley',100);
CREATE TABLE pacmanScore (
  name varchar(30),
  score int
);
INSERT INTO "pacmanScore" VALUES('Albert Einstein',100);
INSERT INTO "pacmanScore" VALUES('Marilyn Monroe',300);
INSERT INTO "pacmanScore" VALUES('Abraham Lincoln',200);
INSERT INTO "pacmanScore" VALUES('Mother Teresa',400);
INSERT INTO "pacmanScore" VALUES('John F. Kennedy',500);
INSERT INTO "pacmanScore" VALUES('Martin Luther King',800);
INSERT INTO "pacmanScore" VALUES('Nelson Mandela',500);
INSERT INTO "pacmanScore" VALUES('Winston Churchill',300);
INSERT INTO "pacmanScore" VALUES('Bill Gates',400);
INSERT INTO "pacmanScore" VALUES('Muhammad Ali',10);
INSERT INTO "pacmanScore" VALUES('Mahatma Gandhi',600);
INSERT INTO "pacmanScore" VALUES('Margaret Thatcher',10);
INSERT INTO "pacmanScore" VALUES('Elvis Presley',10000);
COMMIT;

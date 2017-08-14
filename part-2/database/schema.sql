DROP DATABASE IF EXISTS hotel;

CREATE DATABASE hotel;

\c hotel

DROP TABLE IF EXISTS bookings;

CREATE TABLE bookings(
	id SERIAL PRIMARY KEY,
	room_id INTEGER,
	guest_id INTEGER,
	check_in DATE,
	check_out DATE
);

DROP TABLE IF EXISTS guests;

CREATE TABLE guests(
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	email VARCHAR(30)
);

DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms(
	id SERIAL PRIMARY KEY,
	number VARCHAR(5),
	capacity INTEGER
);


COPY bookings(id,room_id,guest_id,check_in,check_out) FROM '/Users/hellaboredguy/documents/projects/phase-3-challenge-c/part-2/database/bookings.csv' DELIMITER ',' CSV HEADER;

COPY guests(id,name,email) FROM '/Users/hellaboredguy/documents/projects/phase-3-challenge-c/part-2/database/guests.csv' DELIMITER ',' CSV HEADER;

COPY rooms(id,number,capacity) FROM '/Users/hellaboredguy/documents/projects/phase-3-challenge-c/part-2/database/rooms.csv' DELIMITER ',' CSV HEADER;

const command = process.argv[2];
const arg = process.argv[3];
const {
	guests,
	rooms,
	bookings
} = require('./database/database');

if (command === 'guests'){
	guests();
}

if (command === 'rooms'){
	rooms(arg);
}

if (command === 'bookings'){
	bookings(arg);
}

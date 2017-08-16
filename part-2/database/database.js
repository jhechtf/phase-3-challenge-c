const {
  Client
} = require('pg');
const client = new Client({
  database: 'hotel'
});

if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return String(this) + padString.slice(0, targetLength);
    }
  };
}

let guestList = [];

function guests() {
  client.connect();
  try {
    client.query(`SELECT id, name, email FROM guests;`).then(result => {
      let guestList = [];
      result.rows.forEach((item) => {
        guest = {};
        guest.id = item.id;
        guest.name = item.name;
        guest.email = item.email;
        guestList.push(guest);

      })
      client.end();
      console.log('+----+-------------------------+-----------------------------------+');
      console.log('| ID | NAME                    | EMAIL                             |');
      console.log('+----+-------------------------+-----------------------------------+');
      guestList.forEach((item) => {
        console.log(`| ${item.id}`.padEnd(5) + `| ${item.name}`.padEnd(26) + `| ${item.email}`.padEnd(36) + '|');
      })
      console.log('+----+-------------------------+-----------------------------------+');
    })
  } catch (e) {
    console.error(e);
    client.end();
  }
}

function rooms(arg) {
  client.connect();
  try {
    var today = new Date();
    today = [today.getFullYear(), today.getMonth(), today.getDate()].join('-');
    var query_base = `SELECT r.*, b.id is null as available FROM rooms as r
        		LEFT JOIN bookings as b ON b.room_id = r.id 
        		AND '${today}'
        		BETWEEN b.check_in and b.check_out`;
    if (arg) query_base += 'AND b.id is null'
    client.query(query).then(result => {
      let rooms = [];
      result.rows.forEach((item) => {
        room = {};
        room.num = item.number;
        room.capacity = item.capacity;
        room.reserved = item.reserved;
        rooms.push(room);
      });
      client.end();
      console.log('+----+----------+-----------+');
      console.log('| ID | CAPACITY | AVAILABLE |');
      console.log('+----+----------+-----------+');

      rooms.forEach((item) => {
        console.log(`| ${item.num}`.padEnd(5) + `|    ${item.capacity}`.padEnd(11) + `| ${item.available}`.padEnd(11) + `|`)
      })
      console.log('+----+----------+----------+');

    });
  } catch (e) {
    console.error(e);
    client.end();
  }
}

function bookings(arg) {
  client.connect();
  try {
    const bookingList = [];
    if (typeof arg !== 'string') {
      client.query(`SELECT r.number, g.name, b.check_in, b.check_out FROM bookings AS b
    				JOIN rooms AS r on r.id = b.room_id
    				JOIN guests AS g on b.guest_id = g.id
    				ORDER BY r.number ASC;`).then(result => {
        result.rows.forEach((item) => {
          booking = {};
          booking.room = item.number;
          booking.guest = item.name;
          booking.check_in = item.check_in;
          booking.check_out = item.check_out;
          bookingList.push(booking);
        })
        client.end();
        console.log('+--------+--------------------------+--------------+---------------+');
        console.log('| ROOM # | NAME                     | CHECK IN     | CHECK OUT     |');
        console.log('+--------+--------------------------+--------------+---------------+');
        bookingList.forEach((item) => {
          console.log(`| ${item.room}`.padEnd(9) + `| ${item.guest}`.padEnd(27) +
            `| ` + `${item.check_in}`.slice(3, 13).padEnd(12) + ` | ` + `${item.check_out}`.slice(3, 13).padEnd(13) + ` | `);
        })
        console.log('+--------+--------------------------+--------------+---------------+');
      })
    }
    if (typeof arg === 'string') {
      client.query(`SELECT r.number, g.name, b.check_in, b.check_out FROM bookings AS b
    				JOIN rooms AS r on r.id = b.room_id
    				JOIN guests AS g on b.guest_id = g.id
    				WHERE r.number = '${arg}'
    				ORDER BY r.number ASC;`).then(result => {
        result.rows.forEach((item) => {
          booking = {};
          booking.room = item.number;
          booking.guest = item.name;
          booking.check_in = item.check_in;
          booking.check_out = item.check_out;
          bookingList.push(booking);
        })
        client.end();
        console.log('+--------+--------------------------+--------------+---------------+');
        console.log('| ROOM # | NAME                     | CHECK IN     | CHECK OUT     |');
        console.log('+--------+--------------------------+--------------+---------------+');
        bookingList.forEach((item) => {
          console.log(`| ${item.room}`.padEnd(9) + `| ${item.guest}`.padEnd(27) +
            `| ` + `${item.check_in}`.slice(3, 13).padEnd(12) + ` | ` + `${item.check_out}`.slice(3, 13).padEnd(13) + ` | `);
        })
        console.log('+--------+--------------------------+--------------+---------------+');
      })
    }
  } catch (e) {
    console.error(e);
    client.end();
  }
}

module.exports = {
  guests,
  rooms,
  bookings
}

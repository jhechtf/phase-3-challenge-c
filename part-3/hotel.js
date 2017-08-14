const book = document.getElementsByClassName('book');
const modal = document.getElementById('booking');
const close = document.getElementsByClassName('close')[0];
const modalRoomNum = document.getElementById('roomNum');
const modalPrice = document.getElementById('pricePerNight');
const modalTotal = document.getElementById('total');
const quantity = document.querySelector('#quantity');

let room = [];

for (var i = 0; i < book.length; i++) {
    let b = book[i];
    b.addEventListener('click', () => {
        room.num = b.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        room.capacity = b.parentNode.previousElementSibling.previousElementSibling.innerHTML;
        room.price = b.parentNode.previousElementSibling.innerHTML;
        bookingContents();
    });
}



//MODAL
//MODAL: CLOSE
//will 'close' the Modal

function bookingContents() {
    modalRoomNum.innerHTML = 'Room ' + room.num;
    modalPrice.innerHTML = room.price + '/ Night';
    modal.style.display = 'block';
}

close.addEventListener('click', () => {
    modal.style.display = 'none';
})

quantity.addEventListener('change', function(e){
	e.preventDefault();
	let total = this.value * parseFloat(room.price.slice(1));
	modalTotal.innerHTML = '$ ' + total.toFixed(2);
});
const book = document.getElementsByClassName('book');
const modal = document.getElementById('booking');
const close = document.getElementsByClassName('close')[0];

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
//will "close" the Modal

function bookingContents() {
    modal.style.display = "block";
};


close.addEventListener('click', () => {
    modal.style.display = "none";
})
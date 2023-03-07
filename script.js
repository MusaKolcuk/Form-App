const myForm = document.getElementById('myForm');
const mongoose = require('mongoose');
const db = require('./');


myForm.addEventListener('submit', async (event) => {
event.preventDefault();

const name = myForm.elements.name.value;
const email = myForm.elements.email.value;
const phone = myForm.elements.phone.value;
const message = myForm.elements.message.value;
const category = myForm.elements.category.value;

})

const express = require('express');
// creates an array of characters that require to be within the password
const upperCaseCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const lowerCaseCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','','x','y','z'];
const numericalCharacters = ['1','2','3','4','5','6','7','8','9','0'];
const minimumLength = [0-9];
const submitBtn = document.querySelector('#submit');
const loginForm = document.getElementById('form');


function init(){
    let input = document.getElementById('password');
    input.onkeyup = function(){
        localStorage.setItem('input', input.value );
        // allows user to input required charcaters
        if ( input.value.length(minimumLength) >= 8 ){
            input = true;
        } else if ( input.value.length === false ){
            alert ( 'must have a minimum of 8 characters' )
        }

        if ( input.value.match(upperCaseCharacters) ) {
            input = true;
        } else if( input.value === false ){
            alert( 'must include a minimum of 1 uppercase characters' )
        }

        if ( input.value.match(lowerCaseCharacters) ) {
            input = true;
        } else if( input.value === false ) {
            alert( 'must include a minimum of 1 lowercase characters' )
        }

        if ( input.value.match(numericalCharacters) ) {
            input = true;
        } else if (input.value ===false ){
            alert( 'must include a minimum of 1 numerical characters' )
        }
        // Display in console
        console.log('password: ', password);
        return password;
    };
}
window.onload = init

// Show password
function checkPassword() {
    var x = document.getElementById('password');
    if (x.type === 'password') {
        x.type = 'text';
    } else {
        x.type = 'password';
    }
}

// Add event listener to submit button
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const password = form.password.value;

    if (password === true ) {
        alert('You have successfully logged in.');
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

// when the generate button is triggered and the user inputs their desired password length a password is generated
function click() {
    password = input();
    if( password ){
        let password = document.querySelector('#password');
        localStorage.password;

        password.value = password;
    }
}


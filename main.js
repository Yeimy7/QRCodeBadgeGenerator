'use strict'
window.addEventListener('load', function () {

    let form = document.getElementById('profile');
    let name = document.getElementById('name');
    let lastname = document.getElementById('lastname');
    let email = document.getElementById('email');
    let twitter = document.getElementById('twitter');
    let github = document.getElementById('github');
    const generate = document.getElementById('generate');
    const cancel = document.getElementById('cancel');
    const messages = document.querySelectorAll('.message');
    let inputs = document.querySelectorAll('input');

    generate.addEventListener('click', (e) => {
        e.preventDefault();
        let credential = `
        Assistan: ${name.value} ${lastname.value} 
        Email: ${email.value}
        Twitter: ${(twitter.value) ? twitter.value : 'None'}
        GitHub: ${(github.value) ? github.value : 'None'}
        `;
        if (validateForm()) {
            generateCode(credential);
            generateBadge();
        }

    });
    twitter.addEventListener('focus', () => {
        twitter.value = '@';
    });
    twitter.addEventListener('blur', () => {
        if (twitter.value.length === 1) {
            twitter.value = '';
        }
    });
    cancel.addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
        document.getElementById('placeHolder').innerHTML = 'Enter data to generate QR'
        document.getElementById('badge').innerHTML = `
          <p><b>Name:</b>  None</p>
          <p><b>LastName:</b>  None</p>
          <p><b>Email:</b>  None</p>
          <p><b>Twitter:</b>  None</p>
          <p><b>GitHub:</b>  None</p>
        `;
        messages.forEach(e => {
            e.style.display = 'none';
        });
    })
    inputs.forEach((element, index) => {
        element.addEventListener('focus', () => {
            messages[index].style.display = 'none';
        })
    });
    function generateCode(text) {
        let typeNumber = 10;
        let errorCorrectionLevel = 'M';
        let qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(text);
        qr.make();
        document.getElementById('placeHolder').innerHTML = qr.createImgTag();
    }
    function generateBadge() {
        let badge = `
          <p><b>Name:</b>  ${name.value}</p>
          <p><b>LastName:</b>  ${lastname.value}</p>
          <p><b>Email:</b>  ${email.value}</p>
          <p><b>Twitter:</b>  ${(twitter.value) ? twitter.value : 'None'}</p>
          <p><b>GitHub:</b>  ${(github.value) ? github.value : 'None'}</p>
        `;
        document.getElementById('badge').innerHTML = badge;
    }
    function validateForm() {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        let pass = true;
        if (name.value === '') {
            messages[0].style.display = 'block';
            pass = false;
        }
        if (lastname.value === '') {
            messages[1].style.display = 'block';
            pass = false;
        }
        if (email.value === '' || !emailRegex.test(email.value)) {
            messages[2].style.display = 'block';
            pass = false;
        }
        if (twitter.value !== '' && twitter.value.substring(0, 1) !== '@') {
            messages[3].style.display = 'block';
            pass = false;
        }
        return pass;
    }

});
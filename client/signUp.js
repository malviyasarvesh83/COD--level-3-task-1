const validateForm = () => {
    try {
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let phone = document.getElementById('phone').value;
        let email = document.getElementById('email').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let state = document.getElementById('state').value;
        let pin = document.getElementById('pin').value;
        let password = document.getElementById('password').value;

        if (firstName == '') {
            alert('First Name is Required');
            return false;
        }
        if (lastName == '') {
            alert('Last Name is Required');
            return false;
        }
        if (phone == '') {
            alert('Phone Number is Required');
            return false;
        }
        if (email == '') {
            alert('Email Address is Required');
            return false;
        }
        if (address == '') {
            alert('Address is Required');
            return false;
        }
        if (city == '') {
            alert('City is Required');
            return false;
        }
        if (state == '') {
            alert('State is Required');
            return false;
        }
        if (pin == '') {
            alert('Pin Code is Required');
            return false;
        }
        if (password == '') {
            alert('Password is Required');
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
}

const createAccount = async () => {
    try {
        if (validateForm() == true) {
            let firstName = document.getElementById('firstName').value;
            let lastName = document.getElementById('lastName').value;
            let phone = document.getElementById('phone').value;
            let email = document.getElementById('email').value;
            let address = document.getElementById('address').value;
            let city = document.getElementById('city').value;
            let state = document.getElementById('state').value;
            let pin = document.getElementById('pin').value;
            let password = document.getElementById('password').value;

            let response = await axios.post('http://localhost:4000/user/signup', {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                address: address,
                city: city,
                state: state,
                pin: pin,
                password: password,
            });
            console.log(response);
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('email').value = '';
            document.getElementById('address').value = '';
            document.getElementById('city').value = '';
            document.getElementById('state').value = '';
            document.getElementById('pin').value = '';
            document.getElementById('password').value = '';
            alert(response.data.message);
            location.href = 'login.html';
        }
    } catch (error) {
        alert(error.response.data.message);
    }
}

const login = () => {
    try {
        location.href = 'login.html';
    } catch (error) {
        console.log(error);
    }
}
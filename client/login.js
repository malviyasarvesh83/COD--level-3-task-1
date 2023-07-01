const validateForm = () => {
    try {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if (email == '') {
            alert('Email Address is Required');
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

const login = async () => {
    try {
        if (validateForm() == true) {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            let response = await axios.post('http://localhost:4000/user/login', {
                email: email,
                password: password,
            })
            console.log(response);
            localStorage.setItem('flipKartToken', response.data.token);
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            alert(response.data.message);
            location.href = 'homepage.html';
        }
    } catch (error) {
        console.log(error);
    }
}
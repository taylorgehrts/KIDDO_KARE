// public/js/login.js/EF

const loginForm = document.querySelector('#login-form');
const createAccountForm = document.getElementById('create-account-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userData = {
        userName: formData.get('userName'),
        //email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // const data = await response.json(); -- may not be needed, depending on route structure
        
        if (response.ok) {
            // Successfully logged in
            window.location.href = '/profile'; // Redirect to profile or another page
        } else {
            // Handle login error
            console.error(data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

const parseChildren = (agesStr, namesStr) => {
    const ages = agesStr.replace(/\s/g, '').split(',');
    const names = namesStr.replace(/\s/g, '').split(',');
    const children = [];

    for (let i = 0; i < ages.length; i++) {
        children.push({
            age: ages[i],
            name: names[i]
        });
    }

    return children;
}

createAccountForm.addEventListener('submit', async event => {
    // All users
    const userName = document.getElementById('username-signup').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password-signup').value;
    const phoneNumber = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // Parents
    const numberOfChildren = document.getElementById('num-children').value.trim();
    const agesOfChildrenString = document.getElementById('ages').value.trim();
    const dietaryRestrictions = document.getElementById('dietary-restrictions').value;
    const childrenNamesString = document.getElementById('children-names').value.trim();
    const bedTime = document.getElementById('bed-time').value.trim();

    // Sitters
    const age = document.getElementById('age').value.trim();
    const certifications = document.getElementById('certifications').value;
    const yearsExperience = document.getElementById('experience').value.trim();
    const qualifications = document.getElementById('qualifications').value;

    const isSitter = age ? true : false;

    const data = {
        userName,
        email,
        password,
        phoneNumber,
        address
    };
    if (isSitter) {
        data.certifications = certifications;
        data.yearsExperience = yearsExperience;
        data.qualifications = qualifications;
        data.isSitter = isSitter;
    } else {
        data.bedTime = bedTime;
        data.childData = parseChildren(agesOfChildrenString, childrenNamesString);
    }

    const result = await fetch(`/api/users?isSitter=${isSitter}`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data)
    });

    if (result.ok) {
        alert('User signed up successfully!');
    } else {
        alert('There was an error');
    }
});
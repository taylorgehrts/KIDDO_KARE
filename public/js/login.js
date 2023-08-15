// public/js/login.js/EF

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userData = {
        userName: formData.get('userName'),
        email: formData.get('email'),
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

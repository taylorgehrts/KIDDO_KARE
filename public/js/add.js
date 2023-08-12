const addChildFormSubmitHandler = async event => {
    event.preventDefault();

    const age = document.getElementById('age').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const userId = document.getElementById('user-id').dataset.id;

    const result = await fetch(`/api/children/${userId}`, {
        method: 'POST',
        body: {
            age,
            firstName,
            lastName
        },
        headers: { 'Content-Type': 'application/json' }
    });

    if (result.ok) {
        alert('Child Info updated successfully!');
    } else {
        alert('There was an error updating the child');
    }
};

document.getElementById('add-child').addEventListener('submit', addChildFormSubmitHandler);
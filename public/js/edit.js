const submitEditFormHandler = async event => {
    event.preventDefault();

    const userNameValue = document.getElementById('user-name').value.trim();
    const firstNameValue = document.getElementById('first-name').value.trim();
    const lastNameValue = document.getElementById('last-name').value.trim();
    const addressValue = document.getElementById('address').value.trim();
    const bioValue = document.getElementById('bio').value.trim();
    const userId = document.getElementById('user-id').dataset.id;

    let yearsExperienceValue;
    let qualificationsValue
    const yearsExperienceElement = document.getElementById('years-experience');
    if (yearsExperienceElement) {
        yearsExperienceValue = yearsExperienceElement.value.trim();
        qualificationsValue = document.getElementById('qualifications').value.trim();
    }

    const body = {};
    let query = '';
    
    if (userNameValue) body.userName = userNameValue;
    if (firstNameValue) body.firstName = firstNameValue;
    if (lastNameValue) body.lastName = lastNameValue;
    if (addressValue) body.address = addressValue;
    if (bioValue) body.bio = bioValue;
    if (yearsExperienceValue) {
        query = '?isSitter=true';
        body.yearsExperience = yearsExperienceValue;
    }
    if (qualificationsValue) body.qualifications = qualificationsValue;

    const result = await fetch(`/api/users/${userId}${query}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });

    if (result.ok) {
        alert('Profile updated successfully!');
    } else {
        alert('There was an error updating your profile');
    }
};

document.getElementById('edit-form').addEventListener('submit', submitEditFormHandler);
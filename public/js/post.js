const submitJobHandler = async event => {
    event.preventDefault();

    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const description = document.getElementById('description').value;
    const requiresCooking = document.getElementById('requires-cooking').checked;
    const userId = document.getElementById('user-id').dataset.id;

    const result = await fetch(`/api/jobs/${userId}`, {
        method: 'POST',
        body: {
            startTime,
            endTime,
            description,
            requiresCooking,
            userId
        },
        headers: { 'Content-Type': 'application/json' }
    });

    if (result.ok) {
        alert('Job posted successfully!');
    } else {
        alert('There was an error posting the job');
    }

};

document.getElementById('job-info').addEventListener('submit', submitJobHandler);
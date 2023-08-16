const submitJobHandler = async event => {
    event.preventDefault();

    const startTime = document.getElementById('start-time').value.trim();
    const endTime = document.getElementById('end-time').value.trim();
    const description = document.getElementById('description').value;
    const requiresCooking = document.getElementById('requires-cooking').checked;
    const userId = document.getElementById('user-id').dataset.id;
    const instructions = document.getElementById('instructions').value;

    const result = await fetch(`/api/jobs/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
            startTime,
            endTime,
            description,
            requiresCooking,
            userId,
            instructions
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (result.ok) {
        alert('Job posted successfully!');
    } else {
        alert('There was an error posting the job');
    }

};

document.getElementById('job-info').addEventListener('submit', submitJobHandler);
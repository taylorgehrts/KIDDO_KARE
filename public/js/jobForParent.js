const jobId = document.getElementById('job-id').dataset.id;

document.querySelectorAll('.accept-sitter').forEach(btn => {
    btn.addEventListener('click', async event => {
        event.preventDefault();

        const sitterId = btn.dataset.sitterId;
        const result = await fetch(`/api/sitter/${sitterId}/accept/${jobId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if(result.ok) {
            alert("Sitter accepted!");
        } else {
            alert("There was an error");
        }
    });
});


const interestSitterClickHandler = async event => {
    event.preventDefault();

    const query = `?jobId=${document.getElementById('job-id').dataset.id}`;

    await fetch(`/api/sitters/interest${query}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    });

    location.reload();
};

document.getElementById('interest-sitter').addEventListener('click', interestSitterClickHandler);
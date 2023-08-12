const sitterSearchFormSubmitHandler = async event => {
    event.preventDefault();

    const yearsExperience = document.getElementById('years-experience').value.trim();
    const qualifications = document.getElementById('qualifications').value.replace(/\s/g, '');
    const resultsContainer = document.getElementById('results-container');

    resultsContainer.innerHTML = '';

    const query = `?yearsExperience=${yearsExperience}&qualifications=${qualifications}`;

    const result = await fetch(`/api/sitters${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });
    const json = await result.json();

    // console.log(json);

    for (let sitter of json) {
        const user = sitter.User;
        const outerDiv = document.createElement('div');
        const link = document.createElement('a');

        link.setAttribute('href', `/sitter/${user.id}`);
        link.innerText = user.userName;

        outerDiv.append(link);
        resultsContainer.append(outerDiv);
    }

};

document.getElementById('filters').addEventListener('submit', sitterSearchFormSubmitHandler);
const searchFormSubmitHandler = async event => {
    event.preventDefault();

    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const cookingNotOk = document.getElementById("require-cooking").checked ? false: true;
    const resultsContainer = document.getElementById("search-results");

    resultsContainer.innerHTML = '';

    const query = `?from=${startTime}&to=${endTime}&cookingNotOk=${cookingNotOk}`;

    const result = await fetch(`/api/jobs${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}

    });
    const json = await result.json();

    console.log(json);

    for (let job of json) {
        const outerDiv = document.createElement('div');
        const link = document.createElement('a');

        link.setAttribute('href', `/job/${job.id}`);
        link.innerText = job.description;

        outerDiv.append(link);
        resultsContainer.append(outerDiv);
    }
};

document.getElementById("filters").addEventListener("submit", searchFormSubmitHandler);
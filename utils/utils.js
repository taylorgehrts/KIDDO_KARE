const convertJobDatesStore = job => {
    const newData = Object.create(job);

    newData.startTime = job.startTime.toISOString();
    newData.endTime = job.endTime.toISOString();

    return newData;
}

module.exports = {
    convertJobDatesStore
}
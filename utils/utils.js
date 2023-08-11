const convertJobDatesStore = job => {
    const newData = {}
    Object.assign(newData, job);

    newData.startTime = job.startTime.toISOString();
    newData.endTime = job.endTime.toISOString();

    return newData;
}

module.exports = {
    convertJobDatesStore
}
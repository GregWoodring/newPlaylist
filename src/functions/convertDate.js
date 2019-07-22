function convertDate(date){
    date = new Date(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear() - 2000;
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    hours = hours === 0 ? 12 : hours;
    let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    let amPM = date.getHours > 11 && date.getHours !== 0 ? 'AM' : 'PM';

    return `${month}/${day}/${year} ${hours}:${minutes} ${amPM}`;
}

export default convertDate;
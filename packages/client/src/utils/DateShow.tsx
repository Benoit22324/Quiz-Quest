export const DateShow = (value: string) => {
    const date = new Date(value);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    const convertDate = `${month}/${day}/${year}`;

    // const hour = date.getHours();
    // const min = date.getMinutes() === 0 ? "00" : date.getMinutes();
    // const convertTime = `${hour}h${min}`;

    // const dateTime = `${convertTime} ${convertDate}`;

    return convertDate
}
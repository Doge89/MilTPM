export const twoDigits = number => number < 10 ? `0${number}` : number

export const getDate = (date) => {
    const newDate = new Date(date)
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${twoDigits(newDate.getHours())}:${twoDigits(newDate.getMinutes())}`
}
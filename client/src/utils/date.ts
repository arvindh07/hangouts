export const getTime = (d: any) => {
    let date: any = new Date(d);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const customFormatDate = (date: any) => {
    if(date){
        let formatDate: any = date.toDateString().split(" ");
        formatDate = `${formatDate[2]} ${formatDate[1]} ${formatDate[3]}`;
        return formatDate;
    }

    return null;
}

let prev: any = null;
let next: any = null;

export const getDateAndTime = (createdAt: any) => {
    if(!createdAt) {
        prev = null;
        next = null;
        return;
    }
    const date = new Date(createdAt.toString());
    const currentDate = new Date();
    const previousDay = new Date(new Date().getDate() - 1);
    const res = {
        date: ""
    }
    let returnDate = false;
    
    let temp = customFormatDate(date);
    let currentTemp = customFormatDate(currentDate);
    let prevTemp = customFormatDate(previousDay);

    if(prev) {
        next = customFormatDate(date);
    } else {
        prev = customFormatDate(date);
    }

    if(prev) {
        if(prev !== next){
            returnDate = true;
        }
        if(next) {
            prev = next;
        }
    }

    if (temp === currentTemp) {
        res.date = "Today";
    } else if (temp === prevTemp) {
        res.date = "Yesterday";
    } else {
        res.date = temp;
    }
    
    return returnDate ? res.date : null;
}
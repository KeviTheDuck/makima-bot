let current = new Date();

export function getTime(): string {
    var cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    return cTime;
}
export function ID() :number {
    return current.getTime()
}

export function getDate() : string {
    var cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    return cDate
}

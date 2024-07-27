export const capitalizeWords = (inputWords: string) => {
    return inputWords.toLowerCase().charAt(0).toUpperCase() + inputWords.slice(1).toLowerCase();
}

export const getOtherUser = (usersArr: any, loggedInUserObj: any) => {
    return usersArr[0] === loggedInUserObj._id ? usersArr[1]: usersArr[0];
}
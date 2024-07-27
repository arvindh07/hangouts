export const capitalizeWords = (inputWords: string) => {
    return inputWords.toLowerCase().charAt(0).toUpperCase() + inputWords.slice(1).toLowerCase();
}
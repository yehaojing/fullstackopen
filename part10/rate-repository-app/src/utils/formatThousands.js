const formatThousands = (number) => {
    if (number > 1000) {
        const formattedNumber = Math.round(number/100)/10;
        return `${formattedNumber.toString()}k`;
    } else {
        return number
    }
}

export default formatThousands;
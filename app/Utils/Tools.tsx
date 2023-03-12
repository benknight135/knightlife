enum CurrencyCode {
    GDP = "GDP"
}

const numberToString = (num: number, dp: number): string => {
    return (Math.round(num * 100) / 100).toFixed(dp);
}

const numberToCurrency = (num: number, currencyCode: CurrencyCode): string => {
    var absNum = Math.abs(num);
    var value = numberToString(absNum,2);
    var currency: string;
    switch(currencyCode){
        case CurrencyCode.GDP:
            currency = "£" + value;
            if (num < 0){
                currency = "-" + currency;
            }
            break;
        default:
            throw new Error("Unsupported currency code");
    }
    return currency;
}

export { numberToString };
export { CurrencyCode, numberToCurrency };
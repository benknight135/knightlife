enum CurrencyCode {
    GDP = "GDP"
}

const NumberToString = (num: number, dp: number): string => {
    return (Math.round(num * 100) / 100).toFixed(dp);
}

const NumberToCurrency = (num: number, currencyCode: CurrencyCode): string => {
    var value = NumberToString(num,2);
    var currency: string;
    switch(currencyCode){
        case CurrencyCode.GDP:
            currency = "£" + value;
            break;
        default:
            throw new Error("Unsupported currency code");
    }
    return currency;
}

export { NumberToString };
export { CurrencyCode, NumberToCurrency };
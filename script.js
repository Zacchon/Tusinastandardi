// TODO? Luvuista erillinen objekti/luokka

// Create a representation of a floating point number in an arbitrary base number system.
// The return value consists of two arrays that contain the coefficients with the most
// significant digits first.
function floatToBaseArray(floatNumber, base) {
    let integerPart = parseInt(floatNumber);
    let fractionalPart = floatNumber - integerPart;
    let intArray = [];
    let fracArray = [];

    let maxIters = 2000;
    while(integerPart > 0 && maxIters-- > 0) {
        intArray.push(integerPart % base);
        integerPart = Math.floor(integerPart / base);
    }
    maxIters = 2000;
    while(fractionalPart > 0 && maxIters-- > 0) {
        fractionalPart *= base;
        let digit = Math.floor(fractionalPart);
        fracArray.push(digit);
        fractionalPart -= digit;
    }

    return {intArray, fracArray}
}

// Create a string from the integer and fractional parts, using given characters as digits
function numToString(intArray, fracArray, baseString) {
    function numsToStr(numArray) {
        return numArray.map(x => baseString[x]).join(""); 
    }
    let numString = numsToStr(intArray.reverse());
    if (fracArray.length > 0) {
        numString += "." + numsToStr(fracArray);
    }
    return numString; 
}

// A useful special case combining two previously defined functions
function toDozenal(floatNumber) {
    let x = floatToBaseArray(floatNumber, 12);
    return numToString(x.intArray, x.fracArray, "0123456789XE");
}
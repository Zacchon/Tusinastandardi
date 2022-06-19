// TODO? Luvuista erillinen objekti/luokka

const dozenalDigits = "023456789XE";

// Create a representation of a floating point number in an arbitrary base number system.
// The return value consists of two arrays that contain the coefficients with the most
// significant digits first.
function floatToBaseArray(floatNumber, base) {
    let integerPart = Math.floor(floatNumber);
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
    return numToString(x.intArray, x.fracArray, dozenalDigits);
}

function truncFraction(frac, precision) {
    let idx_point = frac.indexOf(".");
    let idx_e = frac.indexOf("e");
    if (idx_e == -1) idx_e = frac.length;

    if (idx_point == -1 || precision > idx_e-1-idx_point) {
        return frac;
    }
    return frac.slice(0, idx_point+precision+1) + frac.slice(idx_e);
} 

function numstringToExponential(numString) {
    // ASSUMES NUMSTRING IS NONNEGATIVE
    if (numString.length == 1) {
        return numString;
    }
    if (!numString.includes(".")) {
        return numString[0] + "." + numString.slice(1) + "e+" + (numString.length-1);
    }

    if (numString[0] == ".") {
        numString = "0" + numString;
    }

    let i = numString.indexOf(".");
    if (i > 1) {
        let intPart = numString.slice(0,i);
        return intPart[0] + "." + intPart.slice(1) + numString.slice(i+1) + "e+" + (i-1);
    }
    // i == 1
    if (numString[0] != "0") {
        return numString;
    }

    while (numString[i+1] == "0") {
        i++;
    }  
    return numString[i+1] + "." + numString.slice(i+2) + "e-" + (i);
}

let convertOutput = document.getElementById("convertedNum");
let convertInput = document.getElementById("numConverterInput");
convertInput.oninput = function() {
    convertOutput.innerHTML = toDozenal(convertInput.value);
};

let lengthMeters = 1.0;
let massKilograms = 1.0;
let timeSeconds = 1.0;
let temperatureKelvins = 1.0;
let chargeCoulombs = 1.0;

function createConstantsTable() {
    let divWrapper = document.getElementById("natureValues");
    divWrapper.innerHTML = "";

    let constantsTable = document.createElement("table");

    let heading = document.createElement("tr");
    heading.innerHTML = "<th>Constant</th> <th>Dozenal value</th> <th>Decimal value</th> <th>Dozenal value (SI)</th> <th>Decimal value (SI)</th>";
    constantsTable.appendChild(heading);
    
    for (const [key, value] of Object.entries(naturalConstants)) {
        let row = document.createElement("tr");
        
        let name = document.createElement("td");
        name.innerHTML = key;
        
        let doz = document.createElement("td");
        let dec = document.createElement("td");
        let dozSI = document.createElement("td");
        let decSI = document.createElement("td");

        const precision = 8;
        decSI.innerHTML = value.value.toExponential(precision);
        dozSI.innerHTML = truncFraction( numstringToExponential(toDozenal(value.value)), precision );
        let newUnits = value.value / lengthMeters**value.dim[0] / massKilograms**value.dim[1] / timeSeconds**value.dim[2] / temperatureKelvins**value.dim[3] / chargeCoulombs**value.dim[4];
        dec.innerHTML = truncFraction( newUnits.toExponential(), precision );
        doz.innerHTML = truncFraction( numstringToExponential(toDozenal(newUnits)), precision );

        [name, doz, dec, dozSI, decSI].forEach(x => row.appendChild(x));

        constantsTable.appendChild(row);
    }

    divWrapper.appendChild(constantsTable);
}

function unitsUpdated() {
    lengthMeters = parseFloat(document.getElementById("inputLengthMeters").value);
    massKilograms = parseFloat(document.getElementById("inputMassKilograms").value);
    timeSeconds = parseFloat(document.getElementById("inputTimeSeconds").value);
    temperatureKelvins = parseFloat(document.getElementById("inputTemperatureKelvins").value);
    chargeCoulombs = parseFloat(document.getElementById("inputChargeCoulombs").value);
    createConstantsTable();
}

unitsUpdated();
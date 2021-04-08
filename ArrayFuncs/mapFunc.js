var numbers = [2, 6, 1, 7, 3, 9];
function squareOfNumber(num) {
    return num * num;
}
function myMap(array, funcMethod) {
    var result = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var i = array_1[_i];
        result.push(squareOfNumber(i));
    }
    return result;
}
//calling my map function 
console.log("Output from My Map Func ", myMap(numbers, squareOfNumber));
//calling in built function
console.log("Output from Built in Map Func ", numbers.map(squareOfNumber));

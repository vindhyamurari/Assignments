var numbers = [2, -1, 5, -8, -3, 7, 22, -9, -54];
function positiveNums(num) {
    return num > 0;
}
//writing the logic for filter function
function myfilter(array, funcMethod) {
    var result = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var i = array_1[_i];
        if (funcMethod(i))
            result.push(i);
    }
    return result;
}
console.log("Output from My Filter Func ", myfilter(numbers, positiveNums));
//calling the in built filter function  
console.log("Output from Built In Filter Func ", numbers.filter(positiveNums));

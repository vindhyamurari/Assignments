var numbers = [15.5, 2.3, 1.1, 4.7];
// 1 Example
var resultRounded = numbers.reduce(getSum, 0);
function getSum(total, num) {
    return total + Math.round(num);
}
console.log("Rounded Result " + resultRounded);
//2 Example 
var sum = numbers.reduce(function (total, amount) {
    return total + amount;
});
console.log('Sum is ' + sum);
//3 Example
var average = numbers.reduce(function (total, amount, index, array) {
    total += amount;
    if (index == array.length - 1)
        return total / array.length;
    else
        return total;
}, 0);
console.log('Avearge is ' + average);

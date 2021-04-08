var numbers :number[] = [15.5, 2.3, 1.1, 4.7];

// 1 Example
let resultRounded=numbers.reduce(getSum,0)

function getSum(total:number, num:number) {
  return total + Math.round(num);
}

console.log("Rounded Result "+resultRounded);
//2 Example 
var sum = numbers.reduce( function(total:number, amount:number){
  return total + amount
});
console.log('Sum is '+sum);
//3 Example
const average = numbers.reduce((total:number, amount:number, index:number, array:number[]) => {
    total += amount
    if(index==array.length-1)
    return total/array.length
    else 
    return total
  }, 0);
console.log('Avearge is '+average); 

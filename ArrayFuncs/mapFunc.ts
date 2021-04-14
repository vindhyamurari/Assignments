let numbers:number[]=[2,6,1,7,3,9]

function squareOfNumber(num:number){
    return num*num;
}

function myMap(array:number[],funcMethod:Function){
    let result:number[]=[];
    for(let i of array){
        result.push(squareOfNumber(i))
    }
    return result;
}

//calling my map function 
console.log("Output from My Map Func ",myMap(numbers,squareOfNumber));

//calling in built function
console.log("Output from Built in Map Func ",numbers.map(squareOfNumber));

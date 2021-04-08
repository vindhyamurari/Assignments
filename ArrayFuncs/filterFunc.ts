let numbers:number[]=[2,-1,5,-8,-3,7,22,-9,-54]

function positiveNums(num:number){
    return num>0;
}

//writing the logic for filter function
function myfilter(array:number[],funcMethod:Function){
    let result:number[]=[];
    for(let i of array){
        if(funcMethod(i))
        result.push(i)
    }
    return result;
}

console.log("Output from My Filter Func ",myfilter(numbers,positiveNums));

//calling the in built filter function  
console.log("Output from Built In Filter Func ",numbers.filter(positiveNums));
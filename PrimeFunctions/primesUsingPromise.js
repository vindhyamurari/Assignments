const isPrimeSync = function(number){
    if(number<2)
        return false;
    if(number==2)
        return true;
   for(let i=2;i<number;i++)
    if(number%i===0)
        return false;

    return true;
}

const findPrimes= (min,max)=>{

    let primes=[]; 
    let lo=min;

    let hi= Math.min(lo+1000,max); 

   return new Promise((resolve)=>{
    let iid=setInterval( ()=>{

        for(let i=lo;i<hi;i++)
            if(isPrimeSync(i))
                primes.push(i);
    
        lo=hi;
        hi=Math.min(lo+100,max);
        if(lo>=max){
            clearInterval(iid);
            resolve(primes); 
        }
   },1); 
   }
   )
}

function testFindPrimes(min,max){
    findPrimes(min,max)
        .then(primes=> console.log(`Total primes between ${min}-${max} is ${primes.length}`))
    console.log(`finding primes between ${min}-${max}...`);
}

testFindPrimes(2,10000); 
testFindPrimes(2,100000);
testFindPrimes(2,100);
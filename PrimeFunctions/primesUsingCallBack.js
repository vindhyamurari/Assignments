const isPrimeSync = function(number){
    if(number<2)
        return false;
    if(number==2)
        return true;
   for(let i=2;i<=number/2;i++)
    if(number%i===0)
        return false;
 
    return true;
}
 
function* generatorFunc(min,max,callback){
 
    let primes=[];
 
    for(i=min;i<=max;i++)
    {
        if(isPrimeSync(i))
                primes.push(i);
        if(i%1000==0)
        yield i
        if(i==max)
        yield callback(primes)  
    }
}
 
function testFindPrimes(min,max){
    let gen=generatorFunc(min,max, primes=> console.log(`Total primes between ${min}-${max} is ${primes.length}`))
        let end
        let id=setInterval(()=>{
            end=gen.next()
            if(end["done"]==true)
            clearInterval(id)    
        },100)
    
    console.log(`finding primes between ${min}-${max}...`);
}
 
testFindPrimes(2,10000); 
testFindPrimes(2,100000);
testFindPrimes(2,100);

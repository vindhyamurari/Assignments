const eventEmitter  = require("events");

const isPrime = function (number) {
  //function to find if the given number is prime or not
  if (number < 2) 
    return false;
  if (number == 2) 
    return true;
  for (let i = 2; i < number; i++) 
    if (number % i === 0) 
      return false;

  return true;
};

function primeFinder(min, max) {
  //creating a object for eventEmitter
  let event = new eventEmitter();

  //checking for the error condition 
  //using it in async format so that on is called before emit
  if (min > max) {
    setTimeout(()=>{
      event.emit('error');
    },0) 
  }

  //making batches to find out the primes between low and high 
  else{
    let lo = min;
  let hi = Math.min(lo + 100, max);
  let iid = setInterval(() => {
    //emitting  numbers if they are prime
    for (i = lo; i < hi; i++) 
        if (isPrime(i)) 
            event.emit('raisePrime', i);

    //calculating percentage and emitting progress
    let percent = Math.trunc((hi / max) * 100);
    event.emit('progress', percent);

    //emitting abort if 70% is reached
    if(percent>=70){
        event.emit('abort');
        clearInterval(iid);
    } 
    lo = hi;
    hi = Math.min(lo + 100, max);

    //emitting done if 100% is reached
    if (lo >= max) {
      event.emit('done');
      clearInterval(iid);
    }
  }, 500);
  }
  
  return event;
}

 module.exports.primeFinder=primeFinder


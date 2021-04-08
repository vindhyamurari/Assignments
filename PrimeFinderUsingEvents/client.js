const eventEmitter  = require("events");
const primeModule=require('./primes');
const Progress = require('cli-progress');


//creating event and calling prime finder
let primeFinderEvent = primeModule.primeFinder(1,1000);
let primes = [];

//creating an event for the client to abort the function
let clientEvent=new eventEmitter();

//using the progress bar
const bar = new Progress.SingleBar({format: '[{bar}] {percentage}%'}, Progress.Presets.legacy);
bar.start(100, 0);

//adding listeners for events
primeFinderEvent
    .on('error',(errorMessage)=>{
        console.log(errorMessage);
        bar.stop();
    })
    .on("raisePrime", (newPrime) => {
        primes.push(newPrime);
     })
    .on('progress',(percent)=>{
        bar.update(percent);
        if(percent==80){
            clientEvent.emit('abort');
        }
    })
    .on('stopOnAbort',()=>{
        bar.stop();
        console.log('Finding Primes is Aborted');
        console.log('Total Primes found before Aborting');
        for(i=0;i<primes.length;i++){
            console.log(`${i} --> ${primes[i]}`);
        }
        
    })
    .on('done',()=>{
        bar.stop();
        console.log('Finding Primes is Completed');
        console.log('Total Primes found ');
        for(i=0;i<primes.length;i++){
            console.log(`${i} --> ${primes[i]}`);
        }
        
    })

module.exports.clientEvent=clientEvent;
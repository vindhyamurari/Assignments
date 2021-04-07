const primeModule=require('./primes');
//const ProgressBar = require('progress');
const Progress = require('cli-progress');

//creating event and calling prime finder
let primeFinderEvent = primeModule.primeFinder(1,1000);
let primes = [];
//const equalsBar = new ProgressBar(':bar', { total: 10 })

//using the progress bar
const bar = new Progress.SingleBar({format: '[{bar}] {percentage}%'}, Progress.Presets.legacy);
bar.start(100, 0);

//adding listeners for events
primeFinderEvent
    .on('error',()=>{
        console.log(`The Range of Numbers to be Found is Incorrect`);
    })
    .on("raisePrime", (newPrime) => {
        primes.push(newPrime);
     })
    .on('progress',(percent)=>{
        //equalsBar.tick()
        bar.update(percent);
    })
    .on('abort',()=>{
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
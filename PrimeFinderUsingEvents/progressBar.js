const ProgressBar = require('progress')

const bar = new ProgressBar(':bar', { total: 100 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100) 

const Progress = require('cli-progress');
const bar1 = new Progress.SingleBar({format: '[{bar}] {percentage}%'}, Progress.Presets.legacy);
bar1.start(100, 0);
bar1.update(60);
bar1.stop();

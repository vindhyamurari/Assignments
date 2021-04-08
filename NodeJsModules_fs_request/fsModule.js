 var fs=require('fs');
 
//logging data to console
fs.readFile('./sampleRead.txt','utf8',function(error,data){
    console.log(data);
})

console.log('Hello')

//creating a folder and deleting after 10 secs
fs.mkdir('newFolder',function() {
    setTimeout(function(){
        fs.rmdir('newFolder',function(){
            console.log('Folder Deleted');
        })
    },10000)
        
})
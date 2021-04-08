var fs=require('fs')
var request=require('request')

 request('https://www.google.com',function(error,response,body){
    if(error){
        console.log(error);
        //console.log(response.statusCode);
        return;
    }
     console.log(body);  
     fs.writeFile('ContentOfGoogleHomePage.txt',body,()=>{
         console.log(`Logged Details to the File "ContentOfGoogleHomePage"`);
     }) 
}) 

//request('https://google.com').pipe(fs.createWriteStream('newData.txt'))

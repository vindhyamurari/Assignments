function getPostedData(request:any){
    return new Promise((resolve,reject)=>{
        try{
            let body:any=''
            request.on('data',(chunk:any)=>{
                body+=chunk.toString()
            })
            request.on('end',()=>resolve(body))
        }
        catch(error){
            reject(error)
        }
    })
}

export{getPostedData}
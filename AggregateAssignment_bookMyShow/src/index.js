let p=document.getElementById('display')
fetch('http://localhost:4000/movies')
    .then((response)=>{
        return response.json();
    })
    .then((movies)=>{
        p.innerHTML+=`<h2>PVR</h2>`
        for(let m of movies){
            p.innerHTML+=`Movie : ${m.movie}<br>Show Time : ${m.timing}<br><br>`;
        }
    })
    .catch((error)=>{
        console.log('Couldnt Fetch the Movies port 4000');
    })
fetch('http://localhost:4001/movies')
    .then((response)=>{
        return response.json();
    })
    .then((movies)=>{
        p.innerHTML+=`<h2>INOX</h2>`
        for(let m of movies){
            p.innerHTML+=`Movie : ${m.movie}<br>Show Time : ${m.timing}<br><br>`;
        }
    })
    .catch((error)=>{
        console.log('Couldnt Fetch the Movies port 4001');
    })
fetch('http://localhost:4002/movies')
    .then((response)=>{
        return response.json();
    })
    .then((movies)=>{
        p.innerHTML+=`<h2>IMAX</h2>`
        for(let m of movies){
            p.innerHTML+=`Movie : ${m.movie}<br>Show Time : ${m.timing}<br><br>`;
        }
    })
    .catch((error)=>{
        console.log('Couldnt Fetch the Movies port 4003');
    })
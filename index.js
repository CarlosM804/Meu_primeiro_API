const http = require('http');

//vamos criar uma estrutura de servidor com node puro

http
    .createServer((request,response) =>{
        response.writeHead(200 , {'Content-Type': 'application/json'});

        if(request.url === '/produto'){
            response.end(JSON.stringify({
                menssage:'Rota de produto'
            }))
        }
        if(request.url ==='/usuario'){
            response.end(JSON.stringify({
                menssage:'Rota de usuario'
            }))
        }

       
    })

    .listen(4001 ,()=> console.log("servidor está rodando na porta 4001"))
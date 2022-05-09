//criando o server e rotas com express

const express = require('express')
const {randomUUID} = require("crypto"); // cria um id (numeros random) universal para cada item que vamo colocar no array produccfts
const { stringify } = require('querystring');
const { response } = require('express');

const app = express(); //pra chamar a função

app.use(express.json()) // para conserguirmo ver os arquivos json


const products = [];  //Lugar para inserir os produtos ,array em memoria

app.post('/products' , (request , response) =>{
    const {name , price} = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    }

    products.push(product) // empurra os produtos para o array

    return response.json(product); // responde em formato JSon

})

app.get("/products", (request , response) =>{
    return response.json(products); // responde o array (banco de dados)
})

app.get("/products/:id", (request , response)=>{
    const {id} = request.params; //desestruturou pegou o paramento da requisição no caso o id
    const product = products.find((product) => product.id === id);// ele vai procura dentro do array o produto e se o id do produto for igual ao id requisitado e vai retorna
    return response.json(product);
})

app.put("/products/:id", (request ,response) => {
    const {id} = request.params;
    const {name, price} = request.body;//receber os dados que vão ser alterado

    const productIndex = products.findIndex(product => product.id === id);//vai retorna index do produtos
    products[productIndex] = {
        ...products[productIndex],//Rest operator ,outra opção id:products[productIndex]
        name,
        price
    }
    return response.json({menssage: "Produto alterado com sucesso"})
})
  
app.delete("/products/:id",(request , response) => {
    const {id} = request.params;
    const productIndex = products.findIndex(product => product.id === id);
    
    products.splice(productIndex, 1)//pega uma posição e remove
    return response.json({menssage:"produto deletado com sucesso"})

})



app.listen(4002 , () => console.log("Servidor está rodando na porta 4002"))




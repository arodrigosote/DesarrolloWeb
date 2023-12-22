const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res)=>{
  res.send('Hola, este es un server en express');
})

app.get('/nueva-ruta', (req, res) =>{
  res.send('Hola esta es un nueva ruta');
})

app.get('/products', (req,res)=>{
  res.json([
    {
      name: 'Product 1',
      price: 1000
    },
    {
      name: 'Product 12',
      price: 3000
    }
  ]);
});

app.get('/products/:id', (req,res)=>{
  //const id = req.params.id;
  const {id} = req.params;
  res.json({
    id,
    name: 'Product 12',
    price: 3000
  });
})

app.get('/categories/:category_id/products/:product_id', (req, res) => {
  const {category_id, product_id} = req.params;
  res.json({
    category_id,
    product_id,
  });
})

app.listen(port, ()=>{
  console.log('Mi puerto es: ' + port);
})

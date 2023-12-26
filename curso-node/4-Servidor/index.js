const http = require('http')

http.createServer((req, res) => {
    console.log('Esta es la peticion', req.url)
    if(req.url == '/'){
        res.write('hola mundo')
        res.end()
    }else{
        res.write('Error 404')
        res.end()
    }
}).listen(3000)

console.log('Servidor prendido y escuchando en el puerto 3000')
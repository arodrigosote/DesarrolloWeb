let padres = false
const carnitaAsada = new Promise((resolve, reject)=>{
    setTimeout(() => {
        if (padres) {
            resolve("si se arma")
        } else {
            reject("no se arma")
        }
    }, 3000)
})



async function hacerCarnita(){
    try{
        let result = await carnitaAsada
        console.log(result)
    }catch(err){
        console.log(err)
    }
}
hacerCarnita()

// carnitaAsada.then((result)=>{
//     console.log(result)
//     console.log("comprar carnita")
// }).catch((err)=>{
//     console.log(err)
// })


console.log("esperando...")
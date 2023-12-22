//spread operator
let person = {name:'rodrigo', age:21};
let country = 'mx';

//to join
let data = {id:1, ...person, country};
console.log(data)

//rest 
function sum(num, ...values){
    console.log(values);
    console.log(num+values[0]);
    return num+values[0];
}


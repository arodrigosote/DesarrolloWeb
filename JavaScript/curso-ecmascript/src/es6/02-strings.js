let hello = 'Hello';
let world = 'World';

//To join 
let phrase = hello+' '+world;
console.log(phrase);

//Using template literals
let phrase2 = `${hello} ${world}`; //were using french quotation marks
console.log(phrase2);

//multi-line strings
//old way
let lorem = 'this is a string \n ' + 'this is another string'
// using template literals
let lorem2 = `this is a phrase 
    this is still the phrase
    `;
console.log(lorem);
console.log(lorem2);
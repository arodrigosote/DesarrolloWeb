var lastName = 'Sotelo';
lastName = 'Ramirez';
console.log(lastName);

let fruit = 'Apple';
fruit = 'kiwi';
console.log(fruit);

const animal = 'dog';
animal = 'cat';
console.log(animal);

//The next function is an error because of the fruit2, as it is a let, it cannot be used outside the block if,  so the const.
const fruits = () => {
    if (true){
        var fruit1 = 'apple';
        let fruit2 = 'kiwi';
        const fruit3 = 'banana';
    }
    console.log(fruit1);
    console.log(fruit2);
    console.log(fruit3);
}
fruits()
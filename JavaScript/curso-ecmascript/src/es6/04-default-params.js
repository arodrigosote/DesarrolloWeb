function newUser(name, age, country){
    //default parametrers 
    var name = name || 'Rodrigo';
    var age = age || 21;
    var country = country || 'Mexico';
    console.log(name, age, country);
}

newUser()
newUser('Hector', 19, 'Mexico')

//Another way to do the above 
function newAdmin(name = 'Rodrigo', age = 21, country = 'Mexico'){
    console.log(name, age, country);
}

newAdmin();

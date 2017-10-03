
var person = {
    firstName : "John",
    lastName  : "Doe",
    age       : 50,
    eyeColor  : "blue"
};

function myFunction(name) {
    person.firstName = name;
    var text = document.getElementById("demo").innerHTML;
    document.getElementById("demo").innerHTML = 
    person.firstName + " " + person.lastName + " is " + person.age + " years old and " + person.eyeColor + " eyes";
}

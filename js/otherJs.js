function otherFunction(name) {
    person.firstName = name;
    var text = document.getElementById("demo").innerHTML;
    document.getElementById("demo").innerHTML = 
    person.firstName + " " + person.lastName + " is " + person.age + " years old and " + person.eyeColor + " eyes";
}
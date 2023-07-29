// console.log("hello world")

class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        const message = `Hi my name is ${this.name}`;
        console.log(message)
    }
}

chris = new Person("Chris");
jesse = new Person("Jesse");

chris.greet()
jesse.greet()

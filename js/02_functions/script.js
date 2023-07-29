
import { adding } from "./addObject.js";

let objects = []

adding('Object 1', 'IfcBuildingElementProxy', objects)
adding('Object 4', 'IfcWall', objects)
adding('Object 5', 'IfcSlab', objects)
adding('Object 8', 'IfcWallStandardCase', objects)
adding('Object 30', 'IfcWall', objects)
adding('Object 8', 'IfcBuildingElementProxy', objects)
adding('Object 47', 'IfcBuildingElementProxy', objects)
adding('Object 3', 'IfcSystem', objects)

console.log(objects)




console.log("hello world");

// function sum(first, second) {
//   const result = first + second;
//   return result
// }

const hello = () => console.log("hello world!")
const hello_you = (name)=> console.log("hello" + name)

console.log(hello_you("chris"))

// -------------------------
// 1-line arrow function. it's used the most bc it's the most concise
// -------------------------
// const sum = (first,second) => console.log( first + second )

// const sum = (first, second) => {
//   console.log(first + second);
// };

function sum(){
  console.log(arguments)
  console.log(typeof arguments)
  var s = 0
  for (var i=0; i<arguments.length; i++ ) {
    s += arguments[i];
  }
  console.log(s)
  return s
}

const firstResult = sum(1, 2);
const secondResult = sum(2, 4);
const thirdResult = sum(1, 2, 3);

// // console.log(firstResult);
// // console.log(secondResult)
// // console.log(thirdResult)

// const chris = {
//   age: 30,
//   name: "Chris",
//   location: "Hong Kong",
// };

// const saysHi = (person = chris) => {
//   const hiMessage =
//     `${person.name}, who is ${person.age}, says hi from ${person.location}!`;
//   console.log(hiMessage);
// };

// saysHi();
// saysHi(chris);

// const name = "Chris"
// const text = `Hello ${name}!`;



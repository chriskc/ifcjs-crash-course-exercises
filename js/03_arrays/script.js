
console.log("hello world")

let objects = [{
        'name' : 'Wall 2',
        'ifcClass' : 'IfcWall',
        'dimensions' : 'null'
    },
    {
        'name' : 'Column',
        'dimensions' : 'IfcColumn',
        'ifcClass' : null
    },
    {
        'name' : 'Paving Zahorra',
        'dimensions' : 'IfcBuildingElelmentProxy' ,
        'ifcClass' : null
    },
    {
        'name' : 'Roof',
        'dimensions' : 'IfcSlab',
        'ifcClass' : null
    },
    {
        'name' : 'Roof2',
        'dimensions' : 'IfcSlab',
        'ifcClass' : null
    }
]

console.log(objects[0].name)
console.log(objects)
// console.log(objects.pop())
// console.log(objects)

const filtered = objects.filter( n => n['name'][0].toLowerCase() === "r")
console.log(filtered)




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
    }
]

// console.log(objects[0].name)
console.log(objects)
console.log(objects.pop())


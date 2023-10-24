//Inferencia

const a = 2
const b = 3
const c = a + b

console.log(c);

// Como a y b son numeros typeScript infiere que c es un numnero 
//Funciones
// function saludar (name:string){
//     return (`Hello ${name}`)
// }
// saludar('hello')

//Tipando fucnciones
//FORMA 1
function saludar ({name,age}:{name:string, age:number}){
    return (`Hola tu nombre es ${name} y tu edad es ${age}`)
}
saludar({name:'Juan', age:24})



//FORMA 2
function saludando (persona:{name:string,age:number}){
    const {name,age}=persona
    return (`Hola tu nombre es ${name} y tu edad es ${age}`)
}
saludando({name:'Hola',age:23})

//Tipando arrow funtions
//FORMA 1
const sumar = (a:number , b:number):number=>{
    return a+b
}

//FORMA2
const restar:(a:number, b:number)=>number=(a,b)=>{
    return a-b
}
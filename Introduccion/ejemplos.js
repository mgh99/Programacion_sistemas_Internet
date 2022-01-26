let a:number[] = [1,2,3,4];

/*
for(let i = 0; i <a.length; i++){ // imprime numeros separados del 1 al 4 con saltos de linea
    console.log(a[i]); //log es mostrar por pantalla
}
*/

a.forEach(elem => console.log(elem));

//Declaracion de variables
const suma = (a: number, b: number): number =>  a + b; //si solo devuleve la suma de a + b se puede poner: number => a + b (es decir solo hay  una linea o solo un parametro)
const doble = (a: number) => 2*a;
console.log(suma(3,3));

const dihola = () => {
    console.log("hola");
    return 3;
}

//Declaracion de funciones
const printdouble = (num:number): void => {
    console.log(2*num);
}
printdouble(3); //Devuelve un 6 (2 * 3 = 6)

a.forEach(printdouble); //Muestra por pantalla 2 4 6 8 10

//Funcion de una sola vez, no se puede reutilizar
a.forEach(( num: number): void => {
    num = num *3;
    console.log(2*num);
})

//Funcion que saque por pantalla numeros parse
const printpares = (num: number): void => {
    if(num % 2 === 0) console.log(num);
}
a.forEach(printpares);

//Array de arrays
const b:Array<Array<number>> = [[2, 3], [4,3], [3, 3, 4, 5]]; //b es una referencia que referemcia a 3 arrays
b.forEach(elem => {
    elem.forEach(c => c = 1)
})

b.forEach((elem:number[])=> console.log(elem));//

//Arrays de numeros
const c:Array<number> =[3,3,4,5];
const d = c.map((elem:number):number => 2*elem);

//Array de palabras que si encuentra la palabra perro la cambia por Gato 
const palabras:string[] = ["hola", "perro", "leon", "que tal"];

const otrasPalabras: string[] = palabras.map(palabra => {
    if(palabra === "perro") return "gato";
    return palabra;
})

console.log(otrasPalabras);

//
const unarr = [[1,2], [2,3], [4,5]]; //tengo un array que es una referencia de 3 elementos
const otroarr = unarr.map(elem => elem); // un map es una nueva 

//
const animales: string[] = palabras.filter(palabra => ["perro", "gatos", "leon"].includes(palabra));
console.log(animales)

//DEVUELVE LA 1º PALABRA QUE EMPIEZA POR P
//const perr = palabras.find(palabra => palabra[0] === "p"); //me devuelve la primera palabra que empieza por p, pero sino hay ninguna devuleve null
const todas: string[] =palabras.filter(palabra => palabra[0] === "p") //todas las palabras que empiezan por p

palabras    //concatena
    .filter(palabra => palabra[0] === "p")
    .forEach(palabra => console.log(palabra));

const perr:string |undefined = palabras.find(palabra => palabra[0] === "p");

//Multiplo de 3
const arr:number[] = [1,2,3,4,5,6,7,8,9,67,12,45,89]
if (arr.some(num => num %3 === 0)) console.log("Hay algún múltiplo de 3"); //some me dice si alguno cumple la condicion
//cuantos hay que sean multiplos de 3
const cuantos = arr.filter(num => num%3 === 0).length;
//mostrar cadenas que unen variables y texto 
console.log(`Hay ${cuantos} numeros multiplos de tres`); //para meter variables solo sirven comillas hacia atras (``)
//primer multiplo de 3
const elprimero = arr.find(num => num %3 === 0);
if(elprimero) console.log(elprimero);
//ultimo multiplo de 3
const elultimo = arr.reverse().find(num => num%3 === 0);
//de los multiplos de 3 aquellos que son > 8 y encadenando funciones


//mostrar todos los numeros hasta el primer 3
arr.find(num => {
    console.log(num);
    return num === 3;
})
// ó
arr.some(num => {
    console.log(num);
    return num = 3;
})

//mostrar el array hasta el primer 3
const arr3: number[] = [];
arr.some(num => {
    console.log(num);
    arr3.push(num);
    return num === 3;
})

//solo hasta el 3
const solohasta = arr.filter((num) => {
    console.log(num);
    return num === 3;
})

//desectructurar un array
const e = [...arr];
const f = [1,2,3, ...arr];
const g =  [...arr, ...b, 3, 4] //esto sirve para combinar arrays
const h = arr.slice(0); //modo de hacer una copia
const i = arr.splice(1); //quitar un trozo y los borra los que haya quitado

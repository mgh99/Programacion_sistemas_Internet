/*PROMESAS: mando una instruccion asíncrona y esa instruccion responde con 
"te prometo que te lo voy a traer" y cuando eso se resuleve se ejecuta
*/
console.log("empiezo");

/*
//Voy ha lanzar una promesa que cuando pase 1 seg la resulevo con el texto
new Promise ((resolve, reject) => {
    //dentro está la función que ejecuto que se resolverá o no
    setTimeout(
        //la función: dentro de 1 seg, resuleveme con este texto
        () => {resolve("dentro del timeout de 1000")} //resolve: resuelve la promesa
        ,1000
    );
//es decir cuando se resuelva muestra un string por pantalla
}).then(valor_resuelto => console.log(valor_resuelto));*/

//Igual que la anterior pero con reject: no se ejecuta si pasa algo
new Promise((resolve, reject) => {
    reject("hola");
}).then(valor_resuelto => console.log(valor_resuelto))
    .catch(e => console.log(`error ${e}`));

console.log("Aqui hago cosas");
//PUEDO RESOLVER O RECHAZAR UNA PROMESA, PERO NO AMBAS COSAS

//EJERCICIO: Mostrar por pantalla una cuenta del 1 al 10 cada segundo
const f = (i: number) => {
    console.log(i);
    if (i <= 10) {
        setTimeout(() => f(i + 1), 1000);
    }
}
f(1);

//Opción b, pero en vez de que salgan los numeros cada segundo uno tras otro se ejecutan de forma síncrona todos
for (let i: number = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i)
    }, 1000);
}

//PROMESAS ENCADENADAS
let coordenadas: string = "";
//Hacemos una función y la simulamos devolviendo una promesa
const pedir_gps = (direccion: string) => {
    return new Promise<string>(resolve => {
        setTimeout(() => resolve("Las coordenadas GPS"), 1000);
    })
}

const pedir_tiempo = (coordenadas_gps: string) => {
    return new Promise<string>(resolve => {
        setTimeout(() => resolve("el tiempo"), 1000);
    })
}
/*
//esto me devuleve una promesa
pedir_gps("mi direccion").then((r) => coordenadas = r); //esta va después de la de pedir tiempo, ya que una vez que tengo las coordenas puedo tener la direccion
//Una vez inicializada una cadena vacía de las coordenas
while(coordenadas == ""){};//Solo se ejecuta cuando en coordenadas haya algo
pedir_tiempo(coordenadas).then(s => console.log(`el tiempo es ${s}`));//Esta se ejecuta primero siempre, pq tiene que esperar a saber las coordenas
*/

//promesa encadenada de resolución
pedir_gps("mi direccion")
    .then((r) => pedir_tiempo(r))
    .then(s => console.log(s));

//ARRAY DE PROMESAS
const arrProm: Array<Promise<string>> = [];
arrProm.push(new Promise<string>(
    resolve => setTimeout(() => resolve("promesa 1"), 3000)));

arrProm.push(new Promise<string>(
    resolve => setTimeout(() => resolve("promesa 2"), 2000)));

arrProm.push(new Promise<string>(
    resolve => setTimeout(() => resolve("promesa 3"), 1000)));

//Para facturar que se han resuleto todas las promesas de los arrays
//Y va a tenir el mismo orden de las promesas, no de resolución
Promise.all(arrProm).then((res:Array<string>) => {
    res.forEach(r => console.log(r));
})

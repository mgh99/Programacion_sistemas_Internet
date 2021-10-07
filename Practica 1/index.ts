import { type } from "os";
import { json } from "stream/consumers";

const variable ={
    a:"hola",
    b:"a",
    c:[1,2,3],
    d:{

        f:3,
        c:{
            j:[{a:1,b:2},3,{c:1,a:2}]
        }
    }
}

const toString=(parametro:any):String=>{

        var retorno:String="";// va a ser la variable que se va a declarar cada vez que entremos y se encadenará con sus recursivos
        if(!Array.isArray(parametro) && typeof(parametro) !== "object") {
            // si no es un array y tampoco es un objeto
            if(typeof(parametro)=="string"){//si es un string devuelvo la palabra entr ""
                return ("\""+String(parametro)+"\"");
            }else if(typeof(parametro)=="number"){// si es un numero solo devuelvo el numero pasado a string
                return String(parametro);
            }else if(typeof(parametro)=="boolean"){
                return String(parametro);
            }
        }else {// un tipo complejo
            if(Array.isArray(parametro)){// si es una array
                retorno+="["// indicamos que es una array
                for (var i = 0; i < parametro.length; i++) {
                    if(i==parametro.length-1){
                        retorno+=String(toString(parametro[i]))
                    }else{
                        retorno+=(String(toString(parametro[i]))+",");
                    }
                }
                retorno+="]";
            }else if(typeof(parametro)=="object"){
                // si es un objeto 
                retorno+="{";
            Object.keys(parametro).forEach((indexclave:string) => {// me da las claves del objeto
                if(indexclave==Object.keys(parametro)[Object.keys(parametro).length-1]){
                    retorno+=("\""+String(indexclave)+"\":"+toString(parametro[indexclave]));
                }else{
                    retorno+=("\""+String(indexclave)+"\":"+toString(parametro[indexclave])+",");
                }
            });
            retorno+="}";
            }
        }
 
        return retorno;
}
console.log(JSON.stringify(variable));
console.log(toString(variable));
if(toString(variable)==JSON.stringify(variable)){
    console.log("Ejercicio 1 funciona");
}else{
    console.log("No funciona");
}

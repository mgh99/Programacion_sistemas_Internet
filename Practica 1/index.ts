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

        var retorno:String="";
        if(!Array.isArray(parametro) && typeof(parametro) !== "object") {
            // si no es un array y tampoco es un objeto
            if(typeof(parametro)=="string"){
                return ("\""+String(parametro)+"\"");
            }else if(typeof(parametro)=="number"){
                return String(parametro);
            }
        }else {// un tipo complejo , tipo objeto creo 
            if(Array.isArray(parametro)){// si es una array
                retorno+="["
                for (var _i = 0; _i < parametro.length; _i++) {
                    if(_i==parametro.length-1){
                        retorno+=String(toString(parametro[_i]))
                    }else{
                        retorno+=(String(toString(parametro[_i]))+",");
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
    console.log("Jodete")
}

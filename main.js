const mensajeInicial = document.getElementById("mensajeInicial")
const empezarBoton = document.getElementById("empezarBtn");
const siguienteBoton = document.getElementById("siguienteBtn");
const preguntaContenedor = document.getElementById("preguntaContainer");
const respuestaBotonElement = document.getElementById("respuestaBoton")
const question = document.getElementById("questions")
const mensajeFinal = document.getElementById("mensaje")
const reintentarBoton = document.getElementById("volverEmpezarBtn")


    
let preguntas = []
let bucle10 = 0 
let respuestasCorrectas =[]

axios.get("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
.then((res)=>{
preguntas = res.data.results
console.log(preguntas);


})
.catch((err)=> console.log(err))


const pintarPreguntas = ((preguntas)=>{
    if(bucle10 < 10){
    respuestaBotonElement.classList.remove("disable")
    respuestaBotonElement.innerHTML = ""
    console.log(preguntas[bucle10].question)
    question.innerHTML = preguntas[bucle10].question;

    const button = document.createElement("button")
    button.innerHTML = preguntas[bucle10].correct_answer;
    respuestaBotonElement.appendChild(button)


    preguntas[bucle10].incorrect_answers.forEach(element => {
        const buttonIncorrectos = document.createElement("button")
        buttonIncorrectos.textContent = element 
        respuestaBotonElement.appendChild(buttonIncorrectos)
        buttonIncorrectos.addEventListener("click", ()=>pintarRespuesta(buttonIncorrectos, button))

    });
        button.addEventListener("click", ()=>pintarRespuesta(button, button))
        
    bucle10++
    }else{
        preguntaContenedor.classList.add("hide"),
        empezarBoton.innerText= "Reintentar"
        empezarBoton.classList.remove("hide"),
        siguienteBoton.classList.add("hide"),
        mensajeFinal.classList.remove("hide"),
        mensajeInicial.classList.add("hide"),
        mensajeFinal.innerHTML = `Tu puntuación es de ${respuestasCorrectas}/10`
    }
    
    
});

const pintarRespuesta = ((respuestaseleccionada, correcta)=>{
    
    if(respuestaseleccionada === correcta){
        respuestaseleccionada.classList.add("green")
        respuestasCorrectas ++ 
        respuestaBotonElement.classList.add("disable")
    }else{
        respuestaseleccionada.classList.add("red")
        respuestaBotonElement.classList.add("disable")
        
    }
})

function empezarJuego() {
    mensajeInicial.classList.remove("hide")
    mensajeFinal.classList.add("hide")
    empezarBoton.classList.add("hide");
    preguntaIndex = 0;
    bucle10=0
    preguntaContenedor.classList.remove ("hide");
    siguienteBoton.classList.remove("hide")
    llamarALaPregunta()
    
}

function llamarALaPregunta() {
    pintarPreguntas(preguntas)
    
}

const reintentarJuego = ()=>{
    reintentarBoton.classList.add("hide");
    preguntaIndex = 0;
    preguntaContenedor.classList.remove("hide");
    siguienteBoton.classList.remove("hide")
    llamarALaPregunta()
    
}




empezarBoton.addEventListener("click", empezarJuego);
siguienteBoton.addEventListener("click",()=>pintarPreguntas(preguntas));
//reintentarBoton.addEventListener("click", reintentarJuego()) 


const mensajeInicial = document.getElementById("mensajeInicial")
const empezarBoton = document.getElementById("empezarBtn");
const siguienteBoton = document.getElementById("siguienteBtn");
const preguntaContenedor = document.getElementById("preguntaContainer");
const respuestaBotonElement = document.getElementById("respuestaBoton")
const question = document.getElementById("questions")
const mensajeFinal = document.getElementById("mensaje")
const reintentarBoton = document.getElementById("volverEmpezarBtn")
const usuarioDiv = document.getElementById("containerUsuario")
const audioNelson = document.getElementById("audioNelson")
const audioFestejo = document.getElementById("audioFestejo")
    
let preguntas = []
let bucle10 = 0 
let respuestasCorrectas =[]

// axios.get("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
// .then((res)=>{
    // preguntas = res.data.results
    preguntas = [
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "Which Pok&eacute;mon can learn the move &quot;Secret Power&quot; by leveling up?",
          "correct_answer": "Audino",
          "incorrect_answers": [
            "Type:Null",
            "Arceus",
            "Silvally"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "Which of these is not a wonder weapon in &quot;Call Of Duty: Zombies&quot;?",
          "correct_answer": "R115 Resonator",
          "incorrect_answers": [
            "GKZ-45 Mk3",
            "Ray Gun",
            "Scavenger"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "What is the main ship used by Commander Shepard in the Mass Effect Franchise called?",
          "correct_answer": "Normandy",
          "incorrect_answers": [
            "Osiris",
            "Infinity",
            "Endeavour"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "Pok&eacute;mon Go is a location-based augmented reality game developed and published by which company?",
          "correct_answer": "Niantic",
          "incorrect_answers": [
            "Rovio",
            "Zynga",
            "Supercell"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "In which year was League of Legends released?",
          "correct_answer": "2009",
          "incorrect_answers": [
            "2010",
            "2003",
            "2001"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "In the &quot;Hitman&quot; series, what is the name of the main character?",
          "correct_answer": "Agent 47",
          "incorrect_answers": [
            "Agent 27",
            "Agent Smith",
            "Agent 67"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "Which game did NOT get financed via Crowdfunding?",
          "correct_answer": "Enter the Gungeon",
          "incorrect_answers": [
            "Town of Salem",
            "Undertale",
            "Tower Unite"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "Who is the writer of the game &quot;Half-Life&quot;?",
          "correct_answer": "Marc Laidlaw",
          "incorrect_answers": [
            "Gabe Newell",
            "Robin Walker",
            "Chet Faliszek"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "In what year was the game &quot;FTL: Faster Than Light&quot; released?",
          "correct_answer": "2012",
          "incorrect_answers": [
            "2014",
            "2013",
            "2011"
          ]
        },
        {
          "type": "multiple",
          "difficulty": "easy",
          "category": "Entertainment: Video Games",
          "question": "The &quot;Day of Defeat&quot; series of games take place during which war?",
          "correct_answer": "World War II",
          "incorrect_answers": [
            "World War I",
            "Vietnam War",
            "Iraq War"
          ]
        }
      ]

// })
// .catch((err)=> console.log(err))


const pintarPreguntas = ((preguntas)=>{
    if(bucle10 < 10){
        siguienteBoton.classList.add("disable")
        respuestaBotonElement.classList.remove("disable")
        respuestaBotonElement.innerHTML = ""
        console.log(preguntas);
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
        reproducirAudioNelson()
        reproducirAudioFestejo()
        
    
    }
    
    
});

const pintarRespuesta = ((respuestaseleccionada, correcta)=>{
    
    if(respuestaseleccionada === correcta){
        respuestaseleccionada.classList.add("green")
        respuestasCorrectas ++ 
        respuestaBotonElement.classList.add("disable")
        siguienteBoton.classList.remove("disable")
    }else{
        respuestaseleccionada.classList.add("red")
        respuestaBotonElement.classList.add("disable")
        siguienteBoton.classList.remove("disable")
        
    }
})

function empezarJuego() {
    usuarioDiv.classList.add("hide");
    mensajeInicial.classList.remove("hide");
    mensajeFinal.classList.add("hide")
    empezarBoton.classList.add("hide");
    preguntaIndex = 0;
    bucle10=0;
    respuestasCorrectas = 0;
    preguntaContenedor.classList.remove ("hide");
    siguienteBoton.classList.remove("hide");
    llamarALaPregunta()
    
}

function llamarALaPregunta() {
    pintarPreguntas(preguntas)
    
}

const reintentarJuego = ()=>{
    reintentarBoton.classList.add("hide");
    preguntaIndex = 0;
    preguntaContenedor.classList.remove("hide");
    siguienteBoton.classList.remove("hide");
    llamarALaPregunta()
    
}

const reproducirAudioNelson = () =>{
    if (respuestasCorrectas < 5){
        audioNelson.play()
    }
}

const reproducirAudioFestejo = () =>{
    if(respuestasCorrectas == 10){
        audioFestejo.play()
    }
}


empezarBoton.addEventListener("click", empezarJuego);
siguienteBoton.addEventListener("click",()=>pintarPreguntas(preguntas));




//Inicializacion
let uncovoredCards = 0;
let card1 = null;
let card2 = null;
let firstResults = null;
let secondResults = null;
let movements = 0;
let hits = 0;
let timer = false;
let time = 30;
let initialTime = time;
let backwardTime = null;

//apuntar a elementos HTML
let showMovements = document.getElementById('movimientos');
let showHits = document.getElementById('aciertos');
let showTime = document.getElementById('t-restante');

//Generacion de numeros aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=> Math.random()-0.5);

//funciones

function countTime(){
    backwardTime = setInterval(()=>{
        time--;
        showTime.innerHTML = `Tiempo: ${time} segundos`;

        if(time == 0){
            //el tiempo se detiene cuando llega a 0
            clearInterval(backwardTime);
            blockCards();
        }
    }, 1000);
}

function blockCards(){
    for(let i = 0; i<=15; i++){
        let blockCard = document.getElementById(i);
        blockCard.innerHTML = numbers[i];
        blockCard.disabled = true;
    }
}


//funcion princial
function show(id){

    if(!timer){
        countTime();
        timer = true;
    }

    uncovoredCards++;

    if(uncovoredCards == 1){

        //mostrar el pirmer numero
        card1 = document.getElementById(id);
        firstResults = numbers[id];
        card1.innerHTML = firstResults;

        //desabilitar boton
        card1.disabled = true;
    }
    else if(uncovoredCards == 2){

        card2 = document.getElementById(id);
        secondResults = numbers[id];
        card2.innerHTML = secondResults;

        card2.disabled = true;
        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;

        if(firstResults == secondResults){

            uncovoredCards = 0;

            //incrementar contador de aciertos
            hits++;
            showHits.innerHTML = `Aciertos: ${hits}`

            if(hits == 8){
                clearInterval(backwardTime);
                showHits.innerHTML = `Aciertos: ${hits} 😱`;
                showTime.innerHTML = `Fantástico! 🎉, solo demoraste ${initialTime - time} segundos`;
                showMovements.innerHTML = `Movimientos: ${movements} 🤘😎`;
            }
        }
        else{

            //mostrar momentaneaente valores y volver a mostrar
            setTimeout(()=>{
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';

                card1.disabled = false;
                card2.disabled = false;

                uncovoredCards = 0;
            }, 800);
        }
    }

}




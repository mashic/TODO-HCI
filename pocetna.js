const postavljeni = document.querySelector("#postavljeniNumber");
const dovrseni = document.querySelector("#dovrseniNumber");
const aktivni = document.querySelector("#aktivniNumber");



refresh();
progressCircle();
var test = 0.40;

function progressCircle() {
    let options = {
        startAngle: -1.55,
        size: 150,
        value: 0.40,
        fill: { gradient: ['#3d6353', '#4d9653'] }
    }
    options.value=0.69;
    $(".bar").circleProgress(options).on('circle-animation-progress',
        function (event, progress, stepValue) {
            $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
        });
    // $(".bar").circleProgress({
    //     value: 0.40
    // });
}

function refresh() {
    let todos;
    let brojPosao=0;
    let brojLicno=0;
    let brojZabava=0;
    let brojOstalo=0;
    let brojac = 0;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        brojac++;
       if(todo.kategorija="posao"){
           brojPosao++;
       }
       if(todo.kategorija="licno"){
        brojLicno++;
       }
       if(todo.kategorija="zabava"){
        brojZabava++;
       }
       if(todo.kategorija="ostalo"){
        brojOstalo++;
       }
    });

    
   
    postavljeni.innerText = brojac;
    // dovrseni.innerText=
    console.log((brojPosao*100)/brojac);
    kateg1.value=(brojPosao*100)/brojac;
}
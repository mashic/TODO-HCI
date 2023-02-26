const zabList = document.querySelector('.zab-list');
const dodajNoviBtn = document.querySelector("#dodajZab");

document.addEventListener('DOMContentLoaded', getZabiljeske);

dodajNoviBtn.addEventListener('click', dodajNoviRedirect);

function dodajNoviRedirect() {
    location.href = "/dodavanjeZabiljeske/dodavanjeZabiljeske.html";
}

zabList.addEventListener('click', deleteCheck);

//redirect danas
const idiDanas = document.querySelector("#danas");
idiDanas.addEventListener('click', idiDanasRedirect);
function idiDanasRedirect() {
    location.href = "/danas.html";
}
function deleteCheck(event) {
    const item = event.target;
    const zab = item.parentElement;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        //animation
        zab.classList.add('fall');
        removeFromLocalStorage(zab);
        //localStorage.removeItem(zab);
        zab.addEventListener("transitionend", function () {
            zab.remove();
        });
    }
}
function removeFromLocalStorage(zab) {
    //check if there are items in already
    let zabiljeske;
    if (localStorage.getItem("zabiljeske") === null) {
        alert("jes");
        zabiljeske = [];
    }
    else {
        zabiljeske = JSON.parse(localStorage.getItem("zabiljeske"));
    }
    const zabIndex = zab.children[0].innerText;
    zabiljeske.splice(zabiljeske.indexOf(zabIndex), 1);
    localStorage.setItem("zabiljeske", JSON.stringify(zabiljeske));
    location.href = "/zabiljeske/zabiljeske.html";
}


function getZabiljeske() {
    let zabiljeske;
    if (localStorage.getItem("zabiljeske") === null) {
        zabiljeske = [];
    } else {
        zabiljeske = JSON.parse(localStorage.getItem("zabiljeske"));
    }
    zabiljeske.forEach(function (zab) {
        //todo div creation
        const zabDiv = document.createElement('div');
        zabDiv.classList.add('card');
        //header creation
        const header = document.createElement('h5');
        header.classList.add('card-header');
        zabDiv.appendChild(header);
        header.innerText=zab.header;
        //div zabiljeska text
        const zabTextdiv = document.createElement('div');
        zabTextdiv.classList.add('card-body');
        zabDiv.appendChild(zabTextdiv);
        //zabiljeska text
        zabTextdiv.innerHTML = zab.text;
        zabList.appendChild(zabDiv);
        //delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
        trashButton.classList.add("trash-btn");
        zabDiv.appendChild(trashButton);
        zabList.appendChild(zabDiv);
    });
}
const zabTitle = document.querySelector('.zab-title');
const zabInput= document.querySelector('.zab-input');
const zabButton= document.querySelector('.zab-button');


zabButton.addEventListener('click', addZab);

function addZab(event) {
    let bool=1;
    if (zabTitle.value == "") {
        alert("Niste unijeli naslov stavke");
        bool=0;
    }
    if (zabInput.value == "") {
        alert("Niste unijeli opis za todo stavku");
        bool=0
    }
    if(bool==1) {
        //prevents from reloading the page, because the submit button is clicked
        event.preventDefault();
        const arr = [
            {
                header: zabTitle.value,
                text: zabInput.value,
            }];
        saveToLocalStorage(arr[0]);

        alert("Uspješno dodana zabilješka");
        location.href = "/zabiljeske/zabiljeske.html";

    }
}

function saveToLocalStorage(zab)
{
    //check if there are items in already
    let zabiljeske;
    if(localStorage.getItem('zabiljeske')===null)
    {
        zabiljeske=[];
    }
    else{
        zabiljeske=JSON.parse(localStorage.getItem('zabiljeske'));
    }
    zabiljeske.push(zab);
    localStorage.setItem('zabiljeske',JSON.stringify(zabiljeske));
}


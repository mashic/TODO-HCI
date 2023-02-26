const vratinazad = document.querySelector("#nazad");
vratinazad.addEventListener('click', vratiNazadRedirect);
function vratiNazadRedirect() {
    location.href = "/danas.html";
}
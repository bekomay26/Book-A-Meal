var signinAnchor = document.getElementById("signin-trigger");
var modal_container = document.getElementById("modal-container");

// signinAnchor.onclick =  function(event) {
//     this.modal_container.classList.add('show');
// };

window.onclick = function(event) {
    if (event.target == modal_container) {
        document.getElementById("modal-container").style.display = "none";
    }
}
function onSign() {
    document.getElementById("modal-container").style.display ="block";
}

function onClose() {
    document.getElementById("modal-container").style.display ="none";
}

// to load js after page loads
window.onload=function(){
    var list = document.querySelector('ul');
    // var list = document.getElementById("todayslist")
    list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    }, false);
}


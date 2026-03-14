
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if(id){
  document.getElementById("product"+id).style.display = "block";
}

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close");

window.onload = function(){
setTimeout(function(){
popup.style.display = "flex";
},1000);
}

closeBtn.onclick = function(){
popup.style.display = "none";
}

window.onclick = function(e){
let popup = document.getElementById("popup");

if(e.target === popup){
popup.style.display = "none";
}
}

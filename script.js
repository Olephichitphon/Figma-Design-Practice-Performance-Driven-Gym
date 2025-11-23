function toggleHam(x) {
  x.classList.toggle("change");

  let myMenu = document.getElementById("myMenu");
  if (myMenu.className === "nav-wrapper") {
    myMenu.className += " menu-active";
}else{
    myMenu.className = "nav-wrapper";
}
}
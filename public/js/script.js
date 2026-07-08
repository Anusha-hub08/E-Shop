const search=document.getElementById("searchInput");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"block":"none";

});

});

}
router.get("/contact",(req,res)=>{

res.render("contact");

});
const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {

document.body.classList.toggle("light-theme");

if(document.body.classList.contains("light-theme")){

themeBtn.innerHTML="☀️";

}else{

themeBtn.innerHTML="🌙";

}

});
const toggleButton = document.getElementsByClassName("toggle-button")[0]
const sectionLinks = document.getElementsByClassName("section-links")[0]
console.log(sectionLinks)
console.log(toggleButton)
toggleButton.addEventListener('click',()=>{
    sectionLinks.classList.toggle('active')
    console.log("changed")

})
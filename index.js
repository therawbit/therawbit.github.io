const toggleButton = document.getElementsByClassName("toggle-button")[0]
const sectionLinks = document.getElementsByClassName("section-links")[0]
const themeToggle = document.getElementById("dark-light")

toggleButton.addEventListener('click',()=>{
    sectionLinks.classList.toggle('active')
    console.log("changed")

})
themeToggle.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme')
    if(document.body.classList.contains('dark-theme'))
        themeToggle.src= "images/sun.png"
    else
        themeToggle.src = "images/moon.png"

})



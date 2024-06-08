const toggleButton = document.getElementsByClassName("toggle-button")[0]
const sectionLinks = document.getElementsByClassName("section-links")[0]
const themeToggle = document.getElementById("dark-light")

toggleButton.addEventListener('click',()=>{
    sectionLinks.classList.toggle('active')
})
themeToggle.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme')
    if(document.body.classList.contains('dark-theme'))
        themeToggle.src= "images/sun.png"
    else
        themeToggle.src = "images/moon.png"
    sectionLinks.classList.toggle('active')
})

// map projects to dom 
const projects = [
    {"name":"Secware",
        "imageUrl":"https://raw.githubusercontent.com/therawbit/Secware/main/icons/virus.png",
        "info":"A sophisticated desktop application designed to watch for changes in a selected folder. It detects the occurrence of any Windows executables, disassembles the sample, and feeds it to a pre-trained machine learning model for classification and notify the user.",
        "githubUrl":"https://github.com/therawbit/Secware/"
    },
    {"name":"Query-Us.",
        "imageUrl":"https://raw.githubusercontent.com/therawbit/QueryUs/main/assets/icon.png",
        "info":"Backend API for a Discussion Forum Application made using Spring Boot and PostgreSQL.The features include the ability to ask questions and post answers, perform a full text search using tags and text, upvoting system, and question views count.",
        "githubUrl":"https://github.com/therawbit/QueryUs/"}
    ,{"name":"Budget On",
        "imageUrl":"images/budgeton.png",
        "info":"Full Stack expense tracker application created using Java. Backend is built using the Spring-Boot and front end is a native Android application.",
        "githubUrl":"https://github.com/therawbit/Budget-On"
    },

    {"name":"iOrder",
        "imageUrl":"https://raw.githubusercontent.com/therawbit/iOrder/main/images/iOrder.png",
        "info":"Android application created as a project for KU Hackfest 2022. It can be implemented by restaurant to allow their customers to order their foods with their own device by scanning the QR code placed at the table.",
        "githubUrl":"https://github.com/therawbit/iOrder"
    },
    {"name":"YT-MP3",
        "imageUrl":"https://raw.githubusercontent.com/therawbit/YT-Mp3/main/ytmp3-nobg.png",
        "info":"A command line utility built on Python to download youtube videos as mp3 file. It is capable of downloading either a Single video or the whole Playlist based on the link you provide.",
        "githubUrl":"https://github.com/therawbit/YT-Mp3"
    },
    {"name":"Peak Productive",
        "imageUrl":"images/pp.png",
        "info":"A Simple Productivity Focused Android app written in Java. It has basic tools for productivity like ToDo/Task to better manage task based on priority, Flash Card to quickly recall anything important and Pomodoro Clock to perform any task effeciently. ",
        "githubUrl":"https://github.com/therawbit/PeakProductive"
    },
]
const cardContainer = document.getElementsByClassName("cards-container")[0]

cardContainer.innerHTML = projects.map(project =>
    `
    <div class="card">
        <div class="faces">
            <div class="face1">
                <img src="${project.imageUrl}">
            </div>
            <div class="face2">
                <div class="project-info">${project.info}</div>
                <div class="project-links">
                    <a target="_blank" href="${project.githubUrl}"><i class="fa-brands fa-github fa-2x" style="color:whitesmoke;"></i></a>
                </div>
            </div>
         </div>
         <div class="project-name">${project.name}</div>
    </div>
    `
    ).join('')



// Select Element
const landingPage = document.querySelector(".landing-page");
const randomBtns = document.querySelectorAll(".random-background .buttons button");
const colorsLi = document.querySelectorAll(".bullets-colors div");
const setting = document.querySelector(".setting");
const gearIcon = document.querySelector(".setting .icon-gear");
const icon = document.querySelector(".icon")
const bulletsBtn = document.querySelectorAll(".show-bullets .buttons button");
const bulletsBox = document.querySelector(".bullets");
const bulletSpans = document.querySelectorAll(".bullets li span");
const resetBth = document.querySelector(".reset");
const spansProgress = document.querySelectorAll(".skills .progress span");
const ourSkills = document.querySelector(".our-skills");
const images = document.querySelectorAll(".our-gallery .images img");
const over = document.querySelector(".over");
const menu = document.querySelector(".menu");
const nav = document.querySelector(".landing-page .head .nav");

////////////////// Landing Page Menu ///////////////////
menu.addEventListener("click", () => {
    nav.classList.toggle("display-block");
})
document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu") && !e.target.closest(".nav")) {
        nav.classList.remove("display-block")
    }
})


const imgs = ["imgs/01.jpg", "imgs/10.jpg", "imgs/03.jpg", "imgs/04.jpg", "imgs/05.jpg"];

let defaults = {color: "#FF9800", randomImg: true, bulletsBox: true};
let options = {...defaults, ...JSON.parse(localStorage.getItem("options"))};

// Add And Reomve Active
function setActive(list, test) {
    list.forEach((btn) => btn.classList.toggle("active", test(btn)));
}

///////////////////// saved Data In LocalStorage //////////
function save() {
    localStorage.setItem("options", JSON.stringify(options));
}

///////////////////// Random Image ////////////////////////
let last = -1;
let intervalBg;
function randomImg() {
    let i;

    do {
        i = Math.floor(Math.random() * imgs.length);
    } while(last === i); 
        last = i;
        landingPage.style.backgroundImage = `url("${imgs[i]}")`;
    
}

function startBg() {
    clearInterval(intervalBg);
    if (options.randomImg) {
        intervalBg = setInterval(randomImg, 10000);
    }
    setActive(randomBtns, (btn) => btn.classList.contains("Yes") === options.randomImg);
}

randomBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        options.randomImg = btn.classList.contains("Yes");
        save();
        startBg();
    })
});

///////////////////// Bullets Funtion //////////////////////
function applyColor() {
    document.documentElement.style.setProperty("--main-color", options.color);
    setActive(colorsLi, (el) => el.dataset.color === options.color);
}

colorsLi.forEach((bullet) => {
    bullet.style.backgroundColor = bullet.dataset.color;
    bullet.addEventListener("click", (event) => {
        options.color = event.currentTarget.dataset.color;
        document.documentElement.style.setProperty("--main-color", event.currentTarget.dataset.color);
        save();
        applyColor();
    })
})

///////////////////// Show Bullets /////////////////////////
function applyBullets() {
    bulletsBox.style.display = options.bulletsBox ? "block" : "none";
    setActive(bulletsBtn, (btn) => btn.classList.contains("Yes") === options.bulletsBox);
}
bulletsBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        options.bulletsBox = btn.classList.contains("Yes");
        save();
        applyBullets();
    })
})

///////////////////// Bullets Hover ////////////////////////
bulletSpans.forEach((bullet) => {
    bullet.addEventListener("mouseenter", () => {
        const span = document.createElement("span");
        span.classList.add("child");
        span.textContent = bullet.dataset.title;
        bullet.appendChild(span);
    });
    bullet.addEventListener("mouseleave", () => {
        bullet.innerHTML = "";
    })
})
///////////////////// Funtion SideBar //////////////////////
icon.addEventListener("click", () => {
    setting.classList.toggle("open");
    gearIcon.classList.toggle("fa-spin");
})
document.addEventListener("click", (e) => {
    if (!e.target.closest(".setting")) {
        setting.classList.remove("open")
        gearIcon.classList.remove("fa-spin")
    }
})

///////////////////// Bullets Active On Scroll ////////////////
const sections = document.querySelectorAll("#about, #skills, #gallery, #timeline, #features, #testimonials");
const bulletLinks = document.querySelectorAll(".bullets li a");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            bulletLinks.forEach((link) => {
                const span = link.querySelector("span");
                span.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach((section) => sectionObserver.observe(section));
const landing = document.querySelector(".landing-page");

new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            bulletLinks.forEach((link) => link.querySelector("span").classList.remove("active"));
        }
    });
}, { threshold: 0.5 }).observe(landing);
///////////////////// Reset Button /////////////////////////
resetBth.addEventListener("click", () => {
    localStorage.removeItem("options");
    options = {...defaults};
    applyAll()
})
///////////////////// Apply All Funtion ////////////////////
function applyAll() {
    randomImg();
    startBg();
    applyColor();
    applyBullets();
}
applyAll();

///////////////////// Transition Our Skills //////////
window.addEventListener("scroll", () => {
    const ourSkillsTop = ourSkills.offsetTop;
    const ourSkillsHeight = ourSkills.offsetHeight;
    const windowHeight = window.innerHeight;
    const reached = window.scrollY >= ourSkillsTop + ourSkillsHeight - windowHeight;

        spansProgress.forEach((span) => {
            span.style.width = reached ? span.dataset.width : "0";
        })
})


//////////////////// Our Gallery ////////////////////
function gallery() {
    images.forEach((img) => {
        img.addEventListener("click", () => {
            over.innerHTML = `
                <div>
                    <div class="img-content">
                        <div class="icon-x"><i class="fa-solid fa-xmark"></i></div>
                        <span class="id">${img.dataset.id}</span>
                        <img src="${img.dataset.img}">
                    </div>
                </div>
            `
            over.style.width = "100%";
        })
    })
}
gallery()
over.addEventListener("click", (e) => {
    if (e.target === over || e.target.closest(".icon-x")) {
        over.style.width = "0";
        over.innerHTML = "";
    }
})

// Button Up 
const buttonUp = document.querySelector(".up");
window.addEventListener("scroll", (e) => {
    const reached = window.scrollY >= 1000
    buttonUp.style.display = reached ? "block" : "none";
})
buttonUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})
/**We use JS to build navigation 
* scroll to anchor from navigation 
* highlight section in viewport */

/** dependencies: None 
* JS version : ES2015/ES6 
* JS standard : ESlint */

/**  Define global variables */

const sectionList = Array.from(document.querySelectorAll('section[data-nav]'));
const navList = document.querySelector('#navbar-list')

/** End global variables */

/** Start helper functions */

function smoothScroll(){
    document.querySelectorAll(`a[href^="#"]`).forEach(el =>{
        el.addEventListener('click' , function(e){
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior:'smooth'
            });
        });
    });
}

/** End helper functions */

/**Begin main functions */

// Build the nav //

function navBar() {
    const navFragment = document.createDocumentFragment();

    for(section of sectionList){
        const linkElement = document.createElement("a");
        const listElement = document.createElement("li");

        linkElement.textContent = section.dataset.nav;
        linkElement.setAttribute('href' , `#${section.id}`);
        linkElement.addEventListener("click" , function(){
            activationSection(linkElement);
        });

        listElement.append(linkElement);
        navFragment.append(listElement);
    }
    navList.append(navFragment);
}

// Add class "active" to section near the top of viewport //

function activationSection(event){
    const els = document.querySelectorAll(".active");
    [].forEach.call(els , function(el){
        el.classList.remove("active");
    });
    event.className = "active";
}

/** Scroll to anchor ID */

setTimeout(() => {
    const navLinks = document.querySelectorAll('a')
    window.addEventListener("scroll" , function(){
        const fromTop = window.scrollY - 50;

        navLinks.forEach(link =>{
            const hashLink = document.querySelector(link.hash)
            if(
                hashLink.offsetTop <= fromTop + 60 &&
                hashLink.offsetTop + hashLink.offsetHeight >fromTop + 60 
            ){
                link.classList.add("active");
            }else{
                link.classList.remove("active");
            }
        });
    });
}, 500);

/** End main functions */

/** Begin events */

// Build menu //

navBar();
smoothScroll();

/** End events */
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to references from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const menu = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// add active class
function addClass(sec) {
    sec.classList.add('your-active-class');
}

// remove active class
function removeClass () {
    sections.forEach(sec => {
        if (sec.classList.contains('your-active-class')) {
            sec.classList.remove('your-active-class');   
        }
    });
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function createNavBar(){
    const item = document.createDocumentFragment();
    for (let sec of sections) {
        const list = document.createElement('li');
        const reference = document.createElement('a');
        reference.href = '#' + sec.id;
        reference.className = "menu__link";
        reference.setAttribute('data-id', sec.id);
        reference.textContent = sec.getAttribute('data-nav');
        list.appendChild(reference);
        item.appendChild(list);
    }
    menu.appendChild(item);
}

// This toggles the active class

function toggle() {
    sections.forEach(sec => {
        let frame = sec.getBoundingClientRect();
         // using getboundingClientRec for width and height
        let references = document.querySelectorAll('.menu__link');
        if (frame.top > -50 && frame.top < 250) { 
            removeClass(); // if class already applied remove
            addClass(sec); // if class removed then add
        }
        references.forEach(anchor => {
            anchor.classList.remove('active__class');
            if (sec.getAttribute('data-nav') == anchor.textContent ) {
                anchor.classList.add('active__class');
            }
        });
    });
}


// Scroll to section

function scrollToSection(evt) {
    const link = evt.target;
    if (link.nodeName == 'A') {
        evt.preventDefault();
        const element = document.getElementById(link.getAttribute('data-id'));
        element.scrollIntoView({behavior:"smooth"});
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 

createNavBar();

// Scroll to section on link click

menu.addEventListener('click', scrollToSection);

// Set sections as active

document.addEventListener('scroll', toggle);
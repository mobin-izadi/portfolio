import { myProject } from "./data.js"
console.log(myProject);
// public
const blurElem=document.querySelector('#blur-wrapper')
const bodyElem=document.body
// Type effect
const homeTypingSkillElem = document.querySelector('#home__skill')
const mySkills = ['\'Front-End Developer\'', '\'Html\'', '\'Css\'', '\'Javascript❤️\'']//Write the skills you want to put in the home section here
let countArr = 0 //Array index counter to know which index we are in
// menu mobile
const menuMobileCloseBtn=document.querySelector('#close-btn-mobile-menu')
const menuMobileOpenBtn=document.querySelector('#open-menu-mobile-btn')
const menuMobileWrapper=document.querySelector('#mobile-menu-wrapper')
const mobileMenuLinks=document.querySelectorAll('.mobile-menu-link')
// loading
const loadingWrapper=document.querySelector('.loading')

// -----------------------------------functions
// To apply the type effect
async function typeSkills() {
    homeTypingSkillElem.innerHTML = ''
    let skillName = mySkills[countArr].split('')
    let index = 0
    let typing = setInterval(() => {
        homeTypingSkillElem.innerHTML = ''
        let skill = skillName.slice(0, index).join('')
        homeTypingSkillElem.innerHTML = skill
        index++
        if (index > skillName.length) {
            clearInterval(typing)
            erase(skillName)
        }
    }, 200);

}
// To apply the erase effect
function erase(skillArr) {
    let index = skillArr.length
    let typing = setInterval(() => {
        homeTypingSkillElem.innerHTML = ''
        let skill = skillArr.slice(0, index).join('')
        homeTypingSkillElem.innerHTML = skill
        index--
        if (index < 0) {
            clearInterval(typing)
            if (countArr < mySkills.length - 1) {
                countArr++
            } else {
                countArr = 0
            }
            typeSkills()
        }
    }, 200);
}

function closeMobileMenu(){
    menuMobileWrapper.classList.add('invisible')
    menuMobileWrapper.classList.add('opacity-0')
    menuMobileWrapper.classList.add('-right-60')
    menuMobileWrapper.classList.remove('right-0')
    blurElem.classList.add('hidden')
    bodyElem.classList.remove('overflow-hidden')
}

// remove loading
function removeLoading(){
    loadingWrapper.classList.add('hidden')
    bodyElem.classList.remove('overflow-hidden')
}

// -----------------------------------events
window.addEventListener('load', () => {
    typeSkills()
    removeLoading()
})

// menu mobile
menuMobileCloseBtn.addEventListener('click',closeMobileMenu)

menuMobileOpenBtn.addEventListener('click',()=>{
  
    menuMobileWrapper.classList.remove('invisible')
    menuMobileWrapper.classList.remove('opacity-0')
    menuMobileWrapper.classList.remove('-right-60')
    menuMobileWrapper.classList.add('right-0')
    blurElem.classList.remove('hidden')
    document.body.classList.add('overflow-hidden')
})

mobileMenuLinks.forEach(link=>{
    link.addEventListener('click',closeMobileMenu)
})
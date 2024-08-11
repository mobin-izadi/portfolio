import { myProject } from "./data.js"

// public
const blurElem = document.querySelector('#blur-wrapper')
const bodyElem = document.body
// Type effect
const homeTypingSkillElem = document.querySelector('#home__skill')
const mySkills = ['\'Front-End Developer\'', '\'Html\'', '\'Css\'', '\'Javascript❤️\'']//Write the skills you want to put in the home section here
let countArr = 0 //Array index counter to know which index we are in
// menu mobile
const menuMobileCloseBtn = document.querySelector('#close-btn-mobile-menu')
const menuMobileOpenBtn = document.querySelector('#open-menu-mobile-btn')
const menuMobileWrapper = document.querySelector('#mobile-menu-wrapper')
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link')
// loading
const loadingWrapper = document.querySelector('.loading')
// portfolio
let portfolioCates = document.querySelectorAll('.portfolio-category')
let portfolioWrapper = document.querySelector('#portfolio-wrapper')



// -----------------------------------functions
// To apply the type effect
function typeSkills() {
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
function closeMobileMenu() {
    menuMobileWrapper.classList.add('invisible')
    menuMobileWrapper.classList.add('opacity-0')
    menuMobileWrapper.classList.add('-right-60')
    menuMobileWrapper.classList.remove('right-0')
    blurElem.classList.add('hidden')
    bodyElem.classList.remove('overflow-hidden')
}

// remove loading
function removeLoading() {
    loadingWrapper.classList.add('hidden')
    bodyElem.classList.remove('overflow-hidden')
}

// portfolio
function showProject(cateElm) {
    // Before choosing a category
    if (!cateElm) {
        cateElm = document.querySelector('[data-cat="all"]')
    }

    // clean active class
    portfolioCates.forEach(cateElm => {
        cateElm.classList.remove('portfolio-category--active')
    })
    // Add the active class to the target element
    cateElm.classList.add('portfolio-category--active')
    // find project by filter
    let filterCate = cateElm.dataset.cat
    let targetProject = null
    if (filterCate == 'all') {
        targetProject = myProject
    } else {
        targetProject = myProject.filter(project => project.category === filterCate)
    }
    // show project
    portfolioWrapper.innerHTML = ''
    if (targetProject.length) {
        targetProject.forEach(project => {
            portfolioWrapper.insertAdjacentHTML('beforeend', `
                 <div class="col-span-2 md:col-span-1 bg-gray-800/50 rounded-lg p-3 overflow-hidden h-[300px] md:h-[500px] relative group ">
                                <img src="images/portfolio/${project.image}" alt="${project.name}">
                            <div
                                class="absolute right-0 left-0 -bottom-40 group-hover:bottom-0 transition-all duration-200 h-40  bg-gray-800/90 z-20 backdrop-blur-sm p-3 flex items-center justify-around gap-2">
                                <div>
                                    <p class="text-xl font-bold">${project.name}</p>
                                    <p class="font-light mt-3 max-w-[500px] line-clamp-3">
                                    ${project.description}
                                    </p>
                                </div>
                                <a href="#">
                                    <svg class="w-8 h-8 transition-all hover:-translate-y-1">
                                        <use href="#arrow-left-circle"></use>
                                    </svg>
                                </a>
    
                            </div>
                        </div>
                `)
        })
    } else {
        portfolioWrapper.innerHTML = ` <p class="col-span-2 text-center text-red-400"> متاسفانه در این دسته بندی محصولی نمونه کاری در حال حاضر وجود ندارد</p>`
    }



}

// -----------------------------------events
window.addEventListener('load', async () => {
    typeSkills()
    await showProject()
    removeLoading()
})

// menu mobile
menuMobileCloseBtn.addEventListener('click', closeMobileMenu)
menuMobileOpenBtn.addEventListener('click', () => {

    menuMobileWrapper.classList.remove('invisible')
    menuMobileWrapper.classList.remove('opacity-0')
    menuMobileWrapper.classList.remove('-right-60')
    menuMobileWrapper.classList.add('right-0')
    blurElem.classList.remove('hidden')
    document.body.classList.add('overflow-hidden')
})
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu)
})

// portfolio
portfolioCates.forEach(cate => {
    cate.addEventListener('click', event => {
        showProject(event.target)
    })
})
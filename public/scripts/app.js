import { myProject, aboutMeCounter } from "./data.js"

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
const portfolioCates = document.querySelectorAll('.portfolio-category')
const portfolioWrapper = document.querySelector('#portfolio-wrapper')
// about
const aboutMeSection = document.getElementById('about')
const experienceElem = document.getElementById('experience')
const clientElem = document.getElementById('client')
const customerSatisfactionElem = document.getElementById('customer-satisfaction')
let isVisitAbout = false
let offetTopAboutMeSection = null
// resume
const resumeItems = document.querySelectorAll('.resume__item')
const resumeContents = document.querySelectorAll('.resume__content')
// Customers feedback
var swiper = new Swiper(".customers-feedback", {

    loop: true,
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,

    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {

        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1536: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

// modal
const modalWrapper = document.querySelector('.modal-wrapper')


// -----------------------------------functions
// modal
function modal(massage, massageColor) {
    let newModal = `
    <div class="bg-gray-900 border w-72 h-36 rounded-lg p-3 relative ">
            <svg class="w-8 h-8 close-modal-btns absolute top-1 right-1 cursor-pointer">
                <use href="#x-mark" class="pointer-events-none"></use>
            </svg>
            <div class="flex justify-center items-center h-full w-full font-light  ${massageColor}">
                ${massage}
            </div>
        </div>
    `

    modalWrapper.insertAdjacentHTML('afterbegin',newModal)

    setEventModal()
}

function setEventModal(){
    let closeModalBtns=document.querySelectorAll('.close-modal-btns')

    closeModalBtns.forEach(btn=>{
        btn.addEventListener('click',event=>{  
            let modalTarget=event.target.parentElement
            modalTarget.remove()
        })
    })
}

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
                 <div class="col-span-2 md:col-span-1 bg-gray-800/50 rounded-lg p-3 overflow-hidden aspect-square relative group ">
                                <img src="images/portfolio/${project.image}" loading="lazy" class="w-full h-full object-cover object-top" alt="${project.name}">
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

// counter about
function aboutCounter() {
    experienceElem.innerHTML = ''
    clientElem.innerHTML = ''
    customerSatisfactionElem.innerHTML = ''
    let data = aboutMeCounter
    counter(experienceElem, data.experience, 300)
    counter(clientElem, data.client, 20)
    counter(customerSatisfactionElem, data.customerSatisfaction, 50)
}
function counter(element, endCount, interval) {
    let index = 0
    let counterAbout = setInterval(() => {
        element.innerHTML = index
        index++
        if (index - 1 == Math.floor(endCount)) {
            element.innerHTML = endCount
            clearInterval(counterAbout)
        }
    }, interval);

}

// resume
function showHandlerResume(resumeItem) {
    resumeItems.forEach(item => {
        item.classList.remove('resume__item--active')
    })

    resumeItem.classList.add('resume__item--active')
    let targetId = resumeItem.dataset.cate
    resumeContents.forEach(content => {
        content.classList.add('hidden')
        content.classList.remove('grid')
    })
    let targetContent = document.getElementById(targetId)
    targetContent.classList.remove('hidden')
    targetContent.classList.add('grid')

}

// Animate on scroll library
function initAos() {
    AOS.init({
        once: true,
        easing: 'ease-in-out',
        duration: 600,

    }
    );
}

// -----------------------------------events
window.addEventListener('load', async () => {
    typeSkills()
    await showProject()
    offetTopAboutMeSection = aboutMeSection.offsetTop
    initAos()
    removeLoading()

})
window.addEventListener('scroll', () => {
    offetTopAboutMeSection = aboutMeSection.offsetTop
    if (!isVisitAbout && window.scrollY >= (offetTopAboutMeSection - 600)) {
        aboutCounter()
        isVisitAbout = !isVisitAbout
    }
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

// resume
resumeItems.forEach(item => {
    item.addEventListener('click', event => {
        showHandlerResume(event.target)
    })
})

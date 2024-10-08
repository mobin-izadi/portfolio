import { myProject, aboutMeCounter } from "./data.js"
import { blurElem, removeLoading, menuMobileCloseBtn, closeMobileMenu, menuMobileOpenBtn, openMobileMenu,mobileMenuLinks } from "./public.js"


// Type effect
const homeTypingSkillElem = document.querySelector('#home__skill')
const mySkills = ['\'Front-End Developer\'', '\'Html\'', '\'Css\'', '\'Javascript❤️\'']//Write the skills you want to put in the home section here
let countArr = 0 //Array index counter to know which index we are in
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
let modalCount = 0

// contact
let isValid = false
const regexName = /^[\u0600-\u06FF\s A-Z a-z]{3,100}$/
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexPhone = /^09\d{9}$/
const nameInput = document.getElementById('name-input')
const emailInput = document.getElementById('email-input')
const phoneInput = document.getElementById('phone-input')
const massageInput = document.getElementById('massage-input')
const formBtn = document.getElementById('form-btn')

// introduction-video
const introPlayBtns = document.querySelectorAll('.play-introduction-video')
const introVideoWrapper = document.getElementById('introduction-video')
const introVideoCloseBtn = document.getElementById('introduction-video__close-btn')

// -----------------------------------functions
// introduction-video
function openIntroVideo() {
    closeMobileMenu()
    introVideoWrapper.classList.remove('hidden')
    blurElem.classList.remove('hidden')
}
// modal
function modal(massage, massageColor) {
    let newModal = `
    <div class="bg-gray-900 border w-72 h-36 rounded-lg p-3 relative transition-all  " id="modal${modalCount}">
            <svg class="w-8 h-8 close-modal-btns absolute top-1 right-1 cursor-pointer">
                <use href="#x-mark" class="pointer-events-none"></use>
            </svg>
            <div class="flex justify-center items-center h-full w-full font-light  ${massageColor}">
                ${massage}
            </div>
        </div>
    `

    modalWrapper.insertAdjacentHTML('afterbegin', newModal)
    setEventModal(`modal${modalCount}`)
    modalCount++
}

function modalRemove(modalTarget) {
    modalTarget.remove()
}

function setEventModal(id) {
    setTimeout(() => {
        let modalTarget = document.getElementById(`${id}`)
        modalRemove(modalTarget)
    }, 3000);

    let closeModalBtns = document.querySelectorAll('.close-modal-btns')
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            let modalTarget = event.target.parentElement
            modalRemove(modalTarget)
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
menuMobileOpenBtn.addEventListener('click', openMobileMenu)
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

// contact
nameInput.addEventListener('blur', () => {
    let result = regexName.test(nameInput.value.trim())
    if (!result) {
        modal('اسم حداقل 3 کارکتر و حداکثر 100 کارکتر باید باشد.', 'text-red-500')
        isValid = false
    } else {
        isValid = true
    }
})
emailInput.addEventListener('blur', () => {
    let result = regexEmail.test(emailInput.value.trim())
    if (!result) {
        modal('لطفا ایمیل خود را به درستی وارد کنید.', 'text-red-500')
        isValid = false
    } else {
        isValid = true
    }
})
phoneInput.addEventListener('blur', () => {
    let result = regexPhone.test(phoneInput.value.trim())
    if (!result) {
        modal('لطفا شماره تلفن خود را به درستی وارد کنید شماره تلفن به 09 شروع میشود و 11 کارکتر است', 'text-red-500')
        isValid = false
    } else {
        isValid = true
    }
})
formBtn.addEventListener('click', event => {
    event.preventDefault()

    if (isValid) {
        modal('پیام شما با موفقیت ارسال شد به زودی با شما تماس میگیرم', 'text-green-500')
        nameInput.value = ''
        emailInput.value = ''
        phoneInput.value = ''
        massageInput.value = ''
    } else {
        modal(' لطفا تمامی فیلد ها رو به درستی پرکنید. ', 'text-red-500')
    }

})

// introduction-video
introPlayBtns.forEach(btn => {
    btn.addEventListener('click', openIntroVideo)
})

introVideoCloseBtn.addEventListener('click', () => {
    introVideoWrapper.classList.add('hidden')
    blurElem.classList.add('hidden')

})
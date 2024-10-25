// blur
const blurElem = document.querySelector('#blur-wrapper')

// loading
const loadingWrapper = document.querySelector('.loading')
const bodyElem = document.body
function removeLoading() {
    loadingWrapper.classList.add('hidden')
    bodyElem.classList.remove('overflow-hidden')
}

// menu mobile
const menuMobileCloseBtn = document.querySelector('#close-btn-mobile-menu')
const menuMobileOpenBtn = document.querySelector('#open-menu-mobile-btn')
const menuMobileWrapper = document.querySelector('#mobile-menu-wrapper')
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link')

function closeMobileMenu() {
    menuMobileWrapper.classList.add('invisible')
    menuMobileWrapper.classList.add('opacity-0')
    menuMobileWrapper.classList.add('-right-60')
    menuMobileWrapper.classList.remove('right-0')
    blurElem.classList.add('hidden')
    bodyElem.classList.remove('overflow-hidden')
}
function openMobileMenu() {
    menuMobileWrapper.classList.remove('invisible')
    menuMobileWrapper.classList.remove('opacity-0')
    menuMobileWrapper.classList.remove('-right-60')
    menuMobileWrapper.classList.add('right-0')
    blurElem.classList.remove('hidden')
    document.body.classList.add('overflow-hidden')
}




export { blurElem, removeLoading, menuMobileCloseBtn, closeMobileMenu, menuMobileOpenBtn, openMobileMenu, mobileMenuLinks }
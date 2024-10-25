import { blurElem, removeLoading, menuMobileCloseBtn, closeMobileMenu, menuMobileOpenBtn, openMobileMenu, mobileMenuLinks } from "./public.js"


// menu mobile
menuMobileCloseBtn.addEventListener('click', closeMobileMenu)
menuMobileOpenBtn.addEventListener('click', openMobileMenu)
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu)
})

window.addEventListener('load', async () => {
    removeLoading()
})
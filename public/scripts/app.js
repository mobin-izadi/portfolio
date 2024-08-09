// Type effect
const homeTypingSkillElem = document.querySelector('#home__skill')
const mySkills = ['\'Front-End Developer\'', '\'Html\'', '\'Css\'', '\'Javascript❤️\'']//Write the skills you want to put in the home section here
let countArr = 0 //Array index counter to know which index we are in





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






// -----------------------------------events
window.addEventListener('load', () => {
    typeSkills()
})
const dropdownMenu = document.querySelector('header .header-menu .dropdown__menu')
const arrow_icon = document.querySelector('header .header-menu .navbar ul .uslugi i')
const upToButton = document.querySelector('#top')




// Raqamlarni Formatlash uchun 1000000 > 1 000 000
const priceNumber = document.querySelectorAll('.formatPrice span')
async function formattingNumber(){
    for(let i = 0 ; i < priceNumber.length; i++){
        var nums = await Number(priceNumber[i].textContent)
        priceNumber[i].textContent = nums.toLocaleString('ru-Ru')
    }
}
formattingNumber()

// Droopdown menu function 
function dropdown_show() {
    dropdownMenu.classList.toggle("show");
    arrow_icon.classList.toggle("arrow_icon")
}


// active function Header Menu
function activeFunc() {
    const currentLocation = location.href
    const menuItem = document.querySelectorAll('.header-menu .navbar ul li a')

    for(let i = 0; i < menuItem.length; i++){
        if(menuItem[i].href === currentLocation){
            menuItem[i].className = 'active'
        } 
    }
  }
  activeFunc()

// active function uslugi Menu
function activeFuncUslugi() {
    const currentLocation = location.href
    const menuItem = document.querySelectorAll('.dropdown__menu ul li a')
    for(let i = 0; i < menuItem.length; i++){
        if(menuItem[i].href === currentLocation){
            menuItem[i].className = 'active'
        } 
    }
  }
  activeFuncUslugi()

// Fixed Navbar 
window.addEventListener('scroll', scroolTop)
function scroolTop() {
    const scrool = Math.floor(window.scrollY)

    dropdownMenu.classList.remove("show")

    const navbar = document.querySelector(".header-menu")
    if (scrool > 160) {
        navbar.classList.add('fixedNavbar')
        
        upToButton.style.opacity = '1';
        dropdownMenu.style.top = '80px';
    } else {
        navbar.classList.remove('fixedNavbar');
        upToButton.style.opacity = '0';
        dropdownMenu.style.top = '208px';
    }
};



function closeAdressLocation(){
    document.querySelector('.location-screen-box').style.display = 'none'
}
function openAdressLocation(){
    document.querySelector('.location-screen-box').style.display = 'block'
}


// CONTACT SEND RESUME FUNCTION | 


const btn  = document.querySelector('.submit-resume-page  #contactButton')
const contact_page  = document.querySelector('.contact-page')
const succes_screen = document.querySelector('.succes-screen') 

btn.addEventListener('click',  () => {
    succes_screen.style.display = 'block'
    contact_page.style.display = 'none'
})






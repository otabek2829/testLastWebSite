// Admin Navbar
const openBtn = document.querySelector('.menu-admin-bars')
const closeBtn = document.querySelector('.bi-x-circle')
const menu = document.querySelector('.fixed-right-menu')


openBtn.addEventListener('click', () => {
    menu.classList.add("hide")
    openBtn.style.display = "none"
    closeBtn.style.display = "block"
})
closeBtn.addEventListener('click', () => {
    menu.classList.remove("hide")
    closeBtn.style.display = "none"
    openBtn.style.display = "block"
})


window.addEventListener('scroll', adminNavbarFixed)
const admin_nav = document.querySelector('#admin-navbar') 

function adminNavbarFixed(){
    // dropdownMenu.classList.remove("show")
    const scrool = Math.floor(window.scrollY)
    
    const navbar = document.querySelector(".header-menu")
    if (scrool > 0) {
        admin_nav.classList.add('fixedNavbar')
        
    } else {
        admin_nav.classList.remove('fixedNavbar');
    }
}



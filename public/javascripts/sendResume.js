// const CHAT_ID = "5902586780";
// const TOKEN = "5759950502:AAHWwkF9cNAl6QEaK4H9pkJf9UUoF52ffHY";
const CHAT_ID = "5797979499";
const TOKEN = "5951246355:AAEq6VemTIv0qjCktLo5mvetvoA5zEXUBbE";
const form = document.querySelector("#form-message");
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const submitBtn = document.querySelector("#submit-btn");
const phoneNumber = document.querySelector("#phoneNumber");
const userName = document.querySelector("#userName");
const successPage = document.querySelector('form .success-page')
const bodyPage = document.querySelector('form .body-page')
const title = document.querySelector('form .title')



const close_button = document.querySelector(".sendResumeScreen .close-button");
const blur = document.querySelector('section')

function closeResumeScreen() {
    document.querySelector(".sendResumeScreen").style.display = "none";
    blur.classList.remove('blur')
}

function openResumeScreen() {
    document.querySelector(".sendResumeScreen").style.display = "block";
    blur.classList.add('blur')

    // Telefon Raqamni Filterlash
    var maskOptions = {
        mask: '+99{8}(00)000-00-00',
        lazy : false
      };
      var mask = new IMask(phoneNumber, maskOptions)
      mask.updateValue()
}



form.addEventListener("submit", (e) => {
    e.preventDefault();

    let message = `<b>  Message came: 📩 </b> \n`;
    message += `<b> 👤 Name: </b>${this.userName.value}\n`;

    message += `<b> 👔 Категория: </b>${this.inputState.value}\n`;
    
    message += `<b> ☎️ Telephone: </b>${this.phoneNumber.value}\n`; 

    const formData = new FormData();

   

    formData.append(`chat_id`, CHAT_ID);
    formData.append(`document`, message);

    // Post orqali xabar yuborish
    axios
        .post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message,
        })
        .then((res) => {
            console.log(true);
            successPage.style.display = 'block'
            bodyPage.style.display = 'none'
            title.style.display = 'none'

            // Inputni tortib olish
                setTimeout(() => {
                    userName.value = "";
                    phoneNumber.value = "";
                }, 1500);
        })
        .catch((err) => {
            console.log('Error');
            console.log(err);
        });
});



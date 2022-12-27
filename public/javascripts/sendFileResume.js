// Contact Pagedan Xabar YuBorish uchun Telefon Raqam Filter Funksiyasi

const senResumePhoneNumber = document.querySelector('.formatMaskNumber')
    
var maskOptions = {
    mask: '+99{8}(00)000-00-00',
    lazy : false
  };
  var mask = new IMask(senResumePhoneNumber, maskOptions)
  mask.updateValue()
function PopupUI() {
  const popupModal = document.querySelector("#popup-modal");
  const popupModalTitle = document.querySelector("#popup-modal .title");
  const popupModalContent = document.querySelector("#popup-modal .content");
  const popupModalBg = document.querySelector(
    "popup-modal .generic-image-card__image"
  );

  const popupOverlay = document.querySelector("#popup-overlay");

  const cardItems = document.querySelectorAll("#show-popups .swiper-slide");
  const btnClose = document.querySelector("#popup-modal .close");

  btnClose.addEventListener("click", function () {
    popupModal.classList.remove("active");
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "visible";
  });

  cardItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      var width = document.body.clientWidth;
      if (width < 1024) return;
      // event.stopPropagation();
      const title = item.querySelector(".generic-image-card__pill").innerHTML;
      const content = item.querySelector(
        ".generic-image-card__title"
      ).innerHTML;
      // const image = item.querySelector(".generic-image-card__image img").src;
      // popupModal.setAttribute("style", `background-image: url('${image}')`);

      popupModalTitle.innerHTML = title;
      popupModalContent.innerHTML = content;
      popupModal.classList.add("active");
      popupOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
  popupOverlay.addEventListener("click", () => {
    popupModal.classList.remove("active");
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "visible";
  });
}

PopupUI();

function onLinkClick() {
  document.getElementById("contactus").scrollIntoView();
  // will scroll to 4th h3 element
}

function myFunction(id, dotId, moreTextId) {
  var btnText = document.getElementById(id);
  var dots = document.getElementById(dotId);
  var moreText = document.getElementById(moreTextId);

  if (dots)
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
}

const btnAccordion = document.querySelectorAll(".accordion_s");
const showAccordion = document.querySelectorAll(".panel_s");
function toggleAccordion() {
  btnAccordion.forEach((btn) => {
    btn.addEventListener("click", function () {
      showAccordion.forEach((content) => content.classList.remove("active"));
      const idElement = this.getAttribute("data-bs-taget");
      const contentElement = document.querySelector(idElement);
      contentElement.classList.add("active");
      
    });
  });
}
toggleAccordion();

$("a[href^='#']").click(function (e) {
  e.preventDefault();

  var position = $($(this).attr("href")).offset().top - 110;

  $("body, html").animate(
    {
      scrollTop: position,
    } /* speed */
  );
});

function validateContactForm() {
  const formContactEle = document.querySelector("#contact-form");
  const inputEles = formContactEle.querySelectorAll("input");
  inputEles.forEach((item) => {
    item.addEventListener("keyup", () => {
      const inputName = item.name;
      item.classList.remove("validate-has-error");
      let hasError = false;
      switch (inputName) {
        case "email":
          hasError = validateEmail(item.value);
          break;
        case "fullname":
          hasError = validateName(item.value);
          break;
        case "phone":
          hasError = validatePhone(item.value);
          break;
        default:
          break;
      }

      if (hasError) {
        item.classList.add("validate-has-error");
      }
    });
  });
}

validateContactForm();

const regexEmail = /\S+@\S+\.\S+/;
const regExp = /^((\+)33|0)[1-9](\d{2}){4}$/;

function validateEmail(value) {
  if (!value) {
    return true;
  }

  if (!regexEmail.test(value)) {
    return true;
  }

  return false;
}

function validateName(value) {
  if (!value) {
    return true;
  }

  if (value.length < 3) {
    return true;
  }
  return false;
}

function validatePhone(value) {
  if (!value) {
    return true;
  }

  if (!value.match(regExp)) {
    return true;
  }

  return false;
}

const buttonBrands = document.querySelectorAll(".button-brand");
const displayContents = document.querySelectorAll(".display-content");
function showSolutionSuite() {
  buttonBrands.forEach((btn) => {
    btn.addEventListener("click", function () {
      displayContents.forEach((content) => content.classList.remove("active"));
      const idElement = this.getAttribute("data-target-content");
      const contentElement = document.querySelector(idElement);
      contentElement.classList.add("active");
    });
  });
  // console.log("showSolutionSuite");
}

showSolutionSuite();

(function topFunction() {
  // document.querySelector(".list-button-brand").scrollTop = 1000;
  const btnClick = document.querySelector(".button-scroll");
  btnClick.addEventListener("click", () => {
    const turnImg = btnClick.querySelector(".fa-arrow-down");
    turnImg.classList.toggle("turn");
    const addHeight = document.querySelector(".brandWrapper");
    addHeight.classList.toggle("auto");
    const heightImg = document.querySelectorAll(".photoimage");
    heightImg.forEach((height) => {
      height.classList.toggle("add");
    });
  });
})();

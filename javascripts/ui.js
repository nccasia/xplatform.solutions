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

var acc = document.getElementsByClassName("accordion_s");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active_s");
    var panel_s = this.nextElementSibling;
    if (panel_s.style.display === "block") {
      panel_s.style.display = "none";
    } else {
      panel_s.style.display = "block";
    }
  });
}

$("a[href^='#']").click(function (e) {
  e.preventDefault();

  var position = $($(this).attr("href")).offset().top - 110;

  $("body, html").animate(
    {
      scrollTop: position,
    } /* speed */
  );
});

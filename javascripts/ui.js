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

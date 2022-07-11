function MenuCircle() {
  const getButton = document.querySelectorAll(".sector");
  const getPath = document.querySelectorAll(".sector path");
  const getText = document.querySelectorAll(".sector text");

  const Sector = document.querySelectorAll(".sector");

  getButton.forEach((item) => {
    item.addEventListener("click", () => {
      var testtt2 = document.getElementById("midc");
      testtt2.classList.remove("them");

      var testtt3 = document.getElementById("midT");
      testtt2.addEventListener(
        "mouseover",
        function (event) {
          // highlight the mouseenter target
          event.target.style.fill = `url("#myGradient")`;
          document.getElementById("midT").style.fill = "white";
        },
        false
      );

      testtt2.addEventListener(
        "mouseout",
        function (event) {
          // highlight the mouseenter target

          if (testtt2.classList.contains("them")) {
            event.target.style.fill = `url("#myGradient")`;
            document.getElementById("midT").style.fill = "white";
          }
          {
          }
        },
        false
      );

      document.getElementById("midc").style.fill = "white";
      document.getElementById("midT").style.fill = `url("#myGradient")`;

      document.getElementById("midc").addEventListener("onmousemove", () => {
        document.getElementById("midc").style.fill = `url("#myGradient")`;
        document.getElementById("midT").style.fill = "white";
      });

      const IdAtr = item.getAttribute("data-id");
      getPath.forEach((path) => path.classList.remove("changer-color"));
      item.childNodes[0].classList.add("changer-color");
      getText.forEach((text) => text.classList.remove("changer-text"));
      item.childNodes[1].classList.add("changer-text");
      const Content = document.getElementById(IdAtr);
      const testt = document.querySelectorAll(".display-content");
      testt.forEach((item) => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");

          const getXx = document.getElementsByClassName("center");
        }
      });
      Content.classList.add("active");
      document.getElementById("midc").classList.remove("fillBlue");
    });
  });
}
const getX = document.getElementsByClassName("center");
const html = `<circle id="midc" cx="0" cy="0" r="19"></circle> <text style="
font-size: 7px;font-weight: 500;" x="-9.5" y="3" id="midT" fill="white">KOMU</text>`;
const tag = document.createElement("text");
const Text2 = document.createTextNode("KOMU");
getX[0].innerHTML = html;

getX[0].onclick = function () {
  document.getElementById("midc").classList.add("them");
  document.getElementById("midc").style.fill = `url("#myGradient")`;
  document.getElementById("midT").style.fill = "white";

  if (document.getElementById("komu").classList.contains("active")) {
    document.getElementById("komu").classList.remove("active");
    document.getElementById("komu").classList.add("hidden");
  }
  {
    const testt = document.querySelectorAll(".display-content");
    document.getElementById("midc").classList.add("fillBlue");
    const getPath = document.querySelectorAll(".sector path");
    getPath.forEach((path) => path.classList.remove("changer-color"));
    const getText = document.querySelectorAll(".sector text");
    getText.forEach((text) => text.classList.remove("changer-text"));

    testt.forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
    document.getElementById("komu").classList.add("active");
  }
};

MenuCircle();

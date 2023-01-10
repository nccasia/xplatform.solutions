function printMess(elemId, message) {
  document.getElementById(elemId).innerHTML = message;
}
const formEl = document.querySelector("#contact-form");
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const content = document.getElementById("content").value;

  const data = {
    email: email,
    content: `Name: ${fullName}\n Phone: ${phone}\n Content: ${content} \nxplatform`,
  };

  fetch("https://email.ncc.asia/ncc-site-api-sendmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((result) => {
      if (result.data.success) {
        printMess(
          "nameSuccess",
          "Thank you, your submission has been received."
        );
        formEl.reset();
      } else {
        printMess("nameError", `${result.data.message}`);
      }
    })
    .catch((err) => {
      printMess(
        "nameError",
        "Oops, something went wrong. Please try again later."
      );
    });
});

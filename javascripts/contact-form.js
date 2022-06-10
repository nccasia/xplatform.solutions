$(document).ready(function () {
  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Most browsers.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // IE8 & IE9
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }

    xhr.setRequestHeader("Content-Type", "application/json");

    return xhr;
  }

  function recaptchaCallback() {
    $("#hiddenRecaptcha").valid();
  }

  //Contact form validation and submit with ajax
  $("#contact-form").validate({
    ignore: ".ignore",
    errorPlacement: function (error, element) {},
    highlight: function (element, errorClass) {
      $(element).parent().removeClass("success").addClass("error");
    },
    unhighlight: function (element, errorClass) {
      $(element).parent().removeClass("error").addClass("success");
    },
    rules: {
      fullname: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
      },
      message: {
        required: true,
      },
      grecaptcha: {
        required: true,
      },
      hiddenRecaptcha: {
        required: function () {
          if (grecaptcha.getResponse() == "") {
            return true;
          } else {
            return false;
          }
        },
      },
    },
    submitHandler: function (form) {
      var url =
        "https://us-central1-ncc-asia.cloudfunctions.net/app/ncc-site-api-sendmail";
      var method = "POST";
      var xhr = createCORSRequest(method, url);

      xhr.onload = function () {
        $("#btn-submit").show();
        $("#loading-send").removeClass("acitve");
        $(".input").val("");
        $(".form-sent").slideDown(400); // show response from the php script.
      };

      xhr.onerror = function () {
        $("#btn-submit").show();
        document.querySelector("#loading-send").classList.remove("active");
      };

      $("#loading-send").addClass("active");
      $("#btn-submit").hide();

      var dataform = $(form).serializeArray();

      var data = {};
      data.email = dataform[1].value;
      data.content =
        dataform[0].value + "\n" + dataform[2].value + "\n" + dataform[3].value;
      var json = JSON.stringify(data);

      xhr.send(json);
    },
  });
});

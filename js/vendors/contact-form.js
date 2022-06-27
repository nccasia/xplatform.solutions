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
    };

    function recaptchaCallback() {
        $('#hiddenRecaptcha').valid();
    };

    //Contact form validation and submit with ajax
    $('#contact-form').validate({
        ignore: ".ignore",
        errorPlacement: function (error, element) {
        },
        highlight: function (element, errorClass) {
            $(element).parent().removeClass('success').addClass('error');
        },
        unhighlight: function (element, errorClass) {
            $(element).parent().removeClass('error').addClass('success');
        },
        rules: {
            FNAME: {
                required: true
            },
            EMAIL: {
                required: true,
                email: true
            },
            LNAME: {
                required: true
            },
            PHONE: {
                required: true
            },
            MESSAGE: {
                required: true
            },
        },
        submitHandler: function (form) {
            var url = 'https://us-central1-ncc-asia.cloudfunctions.net/app/ncc-site-api-sendmail';
            var method = 'POST';
            var xhr = createCORSRequest(method, url);

            xhr.onload = function() {
                $("#btn-submit").show();
                $("#loading-send").hide();
                $('.input').val('');
                $('.form-sent').slideDown(400); // show response from the php script.
            };

            xhr.onerror = function() {
                $("#btn-submit").show();
                $("#loading-send").hide();
            };

            $("#loading-send").show();
            $("#btn-submit").hide();

            var dataform = $(form).serializeArray()

            var data = {};
            data.email = dataform[1].value;
            data.content  = dataform[0].value + "\n" + dataform[2].value + "\n" + dataform[3].value + "\n" + dataform[4].value + "\nxplatform";
            var json = JSON.stringify(data);
            xhr.send(json);
        }
    });
});

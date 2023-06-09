// Đối tượng `Validator`
function Validator(options) {
    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
        );

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.classList.add("invalid");
        } else {
            errorElement.innerText = "";
            inputElement.classList.remove("invalid");
        }
    }

    var formElement = document.querySelector(options.form);

    if (formElement) {
        options.rule.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };

                // Xử lý trường hợp khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(
                        options.errorSelector
                    );
                    errorElement.innerText = "";
                    inputElement.classList.remove("invalid");
                };
            }
        });
    }
}

// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả message lỗi
// 2. Khi hợp lệ => không trả về cái gì (undefined)

Validator.isRequired = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min && value.trim()
                ? undefined
                : `Enter your password (At least ${min} characters)`;
        },
    };
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Enter your Email";
        },
    };
};

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min
                ? undefined
                : `Enter your password (At least ${min} characters)`;
        },
    };
};

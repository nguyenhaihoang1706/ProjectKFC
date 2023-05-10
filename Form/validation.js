const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});



function Validation(options) {
    function validate(inputEle,rule) {
      let errorMess = rule.test(inputEle.value);
      let errorEle = inputEle.parentElement.querySelector(options.errorSelector);
      if (errorMess) {
        errorEle.innerHTML = errorMess;
        inputEle.parentElement.style.color = "red";
      } else {
        errorEle.innerHTML = "";
      }
    }

    let formEle = document.querySelector(options.form)
    if (formEle) {
        options.rules.forEach((rule) => {
            let inputEle = formEle.querySelector(rule.selector);
            if (inputEle) {
                inputEle.onblur = function () {
                   validate(inputEle,rule)
                }
                inputEle.oninput = function () {
            let errorEle = inputEle.parentElement.querySelector(options.errorSelector);
            errorEle.innerHTML = "";
                }
            }
      })
    }
}

Validation.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value){
            return value.trim() ? undefined : 'vui lòng nhập trường này';
        }
        
    }
};

Validation.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
          let regex = /^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/;
            return regex.test(value) ? undefined : 'Trường này không phải email';
      },
    };
};

Validation.isLength = function (selector, min) {
      return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập ít nhát ${min}ký tự`;
        },
      };
}

Validation.isConfirm = function (selector, getConfirmValue) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : 'Không trùng khớp mật khẩu';
    },
  };
};
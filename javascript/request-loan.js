const amount = document.querySelector("#amount");
const loan_type = document.querySelector("#loan_type");
const loan_duration = document.querySelector("#loan_duration");
const loan_description = document.querySelector("#loan_description");

const show_input_error = (input) => {
  input.style.border = "2px solid red";
};

const submit_loan_request = async (data) => {
  document.querySelector("#submit").innerHTML = "Proccessing..";
  try {
    const response = await fetch(
      "https://wealthinvest-backend.glitch.me/api/user/loan_request",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";

      return;
    }

    document.querySelector("#submit").innerHTML = "Success";
    window.location.replace("/action/loading.html")
  } catch (err) {
    document.querySelector("#submit").innerHTML = "Try again";

    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  if (!amount.value) return show_input_error(amount);
  if (!loan_type.value) return show_input_error(loan_type);
  if (!loan_duration.value) return show_input_error(loan_duration);
  if (!loan_description.value) return show_input_error(loan_description);

  let token = getCookie("token");
  let user = getCookie("user");
  submit_loan_request({
    user,
    token,
    loan_amount: amount.value,
    loan_type: loan_type.value,
    loan_duration: loan_duration.value,
    loan_details: loan_description.value,
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #eee";
    input.style.backgroundColor = "#eee";
    document.querySelector("#errMessage").innerHTML = "";
  };
});

document.querySelectorAll("select").forEach((input) => {
  input.onchange = () => {
    input.style.border = "2px solid #eee";
    input.style.backgroundColor = "#eee";
    document.querySelector("#errMessage").innerHTML = "";
  };
});

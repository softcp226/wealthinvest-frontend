amount.onkeyup = () => handle_keychange();
plan.onchange = () => handle_keychange();
// return_time.onchange = () => handle_keychange();

const handle_submit_request = async (form) => {
  const token = getCookie("token");
  const user = getCookie("user");
  document.querySelector("#submit").innerHTML = "proccesing...";
  try {
    const response = await fetch(
      "http://localhost:3000/api/user/create_investment",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token,
          user,
          investment_plan: form.plan,
          investment_amount: form.amount,
          // return_time: return_time.value,
          profit: form.profit,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "try again";
      return;
    }
    document.querySelector("#submit").innerHTML = "success";
    window.location.href = `/action/loading.html`;
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#submit").innerHTML = "try again";
  }
};

const handle_button_request = () => {
  switch (plan.value) {
    case "PLAN A":
      if (!amount.value) return;
      // if (!return_time.value) return;
      if (parseInt(amount.value) < 50) return show_err();
      disable_show_err();

      var percentage = "PERCENTAGE: 8% AFTER 24 HOURS";
      var earning = `My Profit: $${Math.round((amount.value / 100) * 8)}`;
      profit = Math.round((amount.value / 100) * 8);
      write_percentage(percentage, earning);
      handle_submit_request({
        profit,
        plan: plan.value,
        amount: amount.value,
      });
      break;

    case "PLAN B":
      if (!amount.value) return;
      if (parseInt(amount.value) < 1000) return show_err();
      disable_show_err();

      var percentage = "PERCENTAGE: 16% AFTER 48 HOURS";
      var earning = `My Profit: $${Math.round((amount.value / 100) * 16)}`;
      profit = Math.round((amount.value / 100) * 16);
      write_percentage(percentage, earning);

      handle_submit_request({
        profit,
        plan: plan.value,
        amount: amount.value,
      });
      break;
    // }

    case "PLAN C":
      if (!amount.value) return;
      // if (!return_time.value) return;
      if (parseInt(amount.value) < 5000) return show_err();
      disable_show_err();

      var percentage = "PERCENTAGE: 30% AFTER 72 HOURS";
      var earning = `My Profit: $${Math.round((amount.value / 100) * 30)}`;
      profit = Math.round((amount.value / 100) * 30);
      write_percentage(percentage, earning);
      handle_submit_request({
        profit,
        plan: plan.value,
        amount: amount.value,
      });
      break;

    case "PLAN D":
      if (!amount.value) return;
      // if (!return_time.value) return;
      if (parseInt(amount.value) < 10000) return show_err();
      disable_show_err();

      var percentage = "PERCENTAGE: 50% AFTER 120 HOURS";
      var earning = `My Profit: $${Math.round((amount.value / 100) * 50)}`;
      profit = Math.round((amount.value / 100) * 50);
      write_percentage(percentage, earning);
      handle_submit_request({
        profit,
        plan: plan.value,
        amount: amount.value,
      });
      break;
    // case "Enterprise Plan":
    //   if (!amount.value) return;
    //   if (!return_time.value) return;
    //   if (parseInt(amount.value) < 6000) return show_err();

    //   disable_show_err();
    //   if (return_time.value == "daily_return") {
    //     var percentage = "daily Percentage: 35%";
    //     var earning = `My Profit: $${Math.round((amount.value / 100) * 35)}`;
    //     profit = Math.round((amount.value / 100) * 35);
    //     write_percentage(percentage, earning);
    //     handle_submit_request({
    //       profit,
    //       plan: plan.value,
    //       amount: amount.value,
    //     });
    //     break;
    //   } else {
    //     var percentage = "Weekly Percentage: 245%";
    //     var earning = `My Profit: $${Math.round(
    //       (amount.value / 100) * 35 * 7,
    //     )}`;
    //     profit = Math.round((amount.value / 100) * 35 * 7);
    //     write_percentage(percentage, earning);
    //     handle_submit_request({
    //       profit,
    //       plan: plan.value,
    //       amount: amount.value,
    //     });
    //     break;
    //   }

    // case "Ultimate Plan":
    //   if (!amount.value) return;
    //   if (!return_time.value) return;
    //   if (parseInt(amount.value) < 9000) return show_err();

    //   disable_show_err();
    //   if (return_time.value == "daily_return") {
    //     var percentage = "daily Percentage: 40%";
    //     var earning = `My Profit: $${Math.round((amount.value / 100) * 40)}`;
    //     profit = Math.round((amount.value / 100) * 40);
    //     write_percentage(percentage, earning);
    //     handle_submit_request({
    //       profit,
    //       plan: plan.value,
    //       amount: amount.value,
    //     });
    //     break;
    //   } else {
    //     var percentage = "Weekly Percentage: 280%";
    //     var earning = `My Profit: $${Math.round(
    //       (amount.value / 100) * 40 * 7,
    //     )}`;
    //     profit = Math.round((amount.value / 100) * 40 * 7);
    //     write_percentage(percentage, earning);
    //     handle_submit_request({
    //       profit,
    //       plan: plan.value,
    //       amount: amount.value,
    //     });
    //     break;
    //   }

    default:
      handle_keychange();
      break;
  }
};

// const handle_button_request = () => {
//   let plan = document.querySelector("#plan");
//   let investment_amount = document.querySelector("#amount");
//   switch (plan.value) {
//     case "Basic Plan":
//       if (!investment_amount.value) return;
//       if (parseInt(investment_amount.value) < 30) return show_err();
//       var percentage = "Weekly Percentage: 7%";
//       var earning = `My Profit: $${(investment_amount.value / 100) * 7}`;
//       write_percentage(percentage, earning);
//       handle_submit_request({
//         plan: plan.value,
//         amount: investment_amount.value,
//       });
//       break;

//     case "Premium Plan":
//       if (!investment_amount.value) return;
//       if (parseInt(investment_amount.value) < 100) return show_err();
//       var percentage = "Weekly Percentage: 10%";
//       var earning = `My Profit: $${(investment_amount.value / 100) * 10}`;
//       write_percentage(percentage, earning);
//       handle_submit_request({
//         plan: plan.value,
//         amount: investment_amount.value,
//       });
//       break;

//     case "Standard Plan":
//       if (!investment_amount.value) return;
//       if (parseInt(investment_amount.value) < 1500) return show_err();
//       var percentage = "Weekly Percentage: 25%";
//       var earning = `My Profit: $${(investment_amount.value / 100) * 25}`;
//       write_percentage(percentage, earning);
//       handle_submit_request({
//         plan: plan.value,
//         amount: investment_amount.value,
//       });
//       break;

//     case "Enterprise Plan":
//       if (!investment_amount.value) return;
//       if (parseInt(investment_amount.value) < 3200) return show_err();
//       var percentage = "Weekly Percentage: 30.5%";
//       var earning = `My Profit: $${
//         (investment_amount.value / 100) * 30.5
//       }`;
//       write_percentage(percentage, earning);
//       handle_submit_request({
//         plan: plan.value,
//         amount: investment_amount.value,
//       });
//       break;

//     case "Ultimate Plan":
//       if (!investment_amount.value) return;
//       if (parseInt(investment_amount.value) < 10000) return show_err();
//       var percentage = "Weekly Percentage: 40%";
//       var earning = `My Profit: $${
//         (investment_amount.value / 10000) * 40
//       }`;
//       write_percentage(percentage, earning);
//       handle_submit_request({
//         plan: plan.value,
//         amount: investment_amount.value,
//       });
//       break;

//     default:
//       return;
//       break;
//   }
// };

document.querySelector("#submit").onclick = () => {
  let investment_amount = document.querySelector("#amount");
  let plan = document.querySelector("#plan");

  if (!investment_amount.value)
    return (investment_amount.style.border = "2px solid red");
  if (!plan.value) return (plan.style.border = "2px solid red");
  handle_button_request();
};

// document.querySelector("#plan").onchange = document
//   .querySelectorAll("input")
//   .forEach((input) => {
//     input.onkeyup = () => {
//       input.style.border = "2px solid #fff";
//       document.querySelector(".errMessage").innerHTML = "";
//     };
//   });

// document.querySelectorAll("select").forEach((select) => {
//   select.onchange = () => {};


const write_percentage = (percentage, earning) => {
  document.querySelector("#percentage").innerHTML = percentage;
  document.querySelector("#earning").innerHTML = earning;
};
const show_err = () => {
  document.querySelector("#amount").style.border = "2px solid red";
  document.querySelector(".errMessage").innerHTML =
    "Investment amount can not be lesser than minimum investment for the plan selected";
};
const disable_show_err = () => {
  document.querySelector("#amount").style.border = "2px solid #fff";
  document.querySelector(".errMessage").innerHTML = "";
};
let profit;

const handle_request = () => {
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
      // handle_submit_request({
      //   profit,
      //   plan: plan.value,
      //   amount: amount.value,
      // });
      break;

    case "PLAN B":
      if (!amount.value) return;
      if (parseInt(amount.value) < 1000) return show_err();
      disable_show_err();

      var percentage = "PERCENTAGE: 16% AFTER 48 HOURS";
      var earning = `My Profit: $${Math.round((amount.value / 100) * 16)}`;
      profit = Math.round((amount.value / 100) * 16);
      write_percentage(percentage, earning);
      // handle_submit_request({
      //   profit,
      //   plan: plan.value,
      //   amount: amount.value,
      // });
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
      // handle_submit_request({
      //   profit,
      //   plan: plan.value,
      //   amount: amount.value,
      // });
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
      // handle_submit_request({
      //   profit,
      //   plan: plan.value,
      //   amount: amount.value,
      // });
      break;

    default:
      handle_keychange();
      break;
  }
};

const handle_keychange = () => {
  if (!amount.value) return display_error(amount);
  hide_error(amount);
  if (!plan.value) return display_error(plan);
  hide_error(plan);
 
  handle_request();
};

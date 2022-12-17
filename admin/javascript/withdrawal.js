// const setCookie = (token, admin) => {
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = `token=${token} ; ${expires}`;
//   document.cookie = `admin=${admin} ; ${expires}`;
//   window.location.replace("/admin/dashboard.html");
// };

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.replace("/admin");
}

//

const handle_delete_withdrawal = async (btn, withdrawal_request) => {
  btn.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  let user=getCookie("user")
  try {
    const response = await fetch(
      "http://localhost:3000/api/admin/withdrawal/fetch/withdrawal/delete",

      // "https://fintexaurum-backend.glitch.me/api/admin/withdrawal/fetch/withdrawal/delete",
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, withdrawal_request }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      btn.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      btn.innerHTML = "Success";
      window.location.href = "/admin/withdrawal.html";
    }
  } catch (err) {
    btn.innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

const handle_approve_withdrawal = async (btn, withdrawal_request) => {
  // /api/admin/withdrawal_request/approve

  btn.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
    "http://localhost:3000/api/admin/withdrawal_request/approve",
      // "https://fintexaurum-backend.glitch.me/api/admin/withdrawal_request/approve",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, withdrawal_request }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      btn.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      btn.innerHTML = "Success";
      window.location.href = "/admin/withdrawal.html";
    }
  } catch (err) {
    btn.innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

const createAndAppendElement = (element) => {
  const section = document.createElement("section");
  const date = document.createElement("h4");
  const withdrawer = document.createElement("h4");
  const withdrawerNames = document.createElement("h4");
  const amount = document.createElement("h4");
  const method = document.createElement("h4");
  const wallet = document.createElement("h4");
  const delBTn = document.createElement("button");
  const approveBTn = document.createElement("button");

  date.innerHTML = element.transaction_date;
  withdrawer.innerHTML = element.user
    ? `${element.user.email} || ${element.user.phone_number}`
    : "not found";
  withdrawerNames;
  withdrawerNames.innerHTML = element.user
    ? `${element.user.first_name} || ${element.user.last_name}`
    : "not found";

  amount.innerHTML = `$${element.withdrawal_amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  method.innerHTML = element.withdrawal_method;
  wallet.innerHTML = element.wallet;

  delBTn.innerHTML = "DELETE";
  delBTn.className = "btn btn-danger";
  delBTn.onclick = () => handle_delete_withdrawal(delBTn, element._id);

  approveBTn.innerHTML = "Approve Withdrawal";
  approveBTn.className = "btn btn-dark";
  approveBTn.onclick = () => handle_approve_withdrawal(approveBTn, element._id);
  //   const investment_plan = document.createElement("h4");
  //   let amount = document.createElement("h4");
  //   const profit = document.createElement("h4");
  //   const loss = document.createElement("h4");
  //   const update_btn = document.createElement("button");
  //   let cancel_btn = document.createElement("button");
  //
  //   withdrawer.innerHTML = element.user
  //     ? `${element.user.email} || ${element.user.phone_number}`
  //     : "not found";
  //   investment_plan.innerHTML = element.investment_plan;
  // amount.innerHTML = `$${element.amount
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  //   profit.innerHTML = `$${element.profit
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  //   loss.innerHTML = `$${element.loss
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  //   update_btn.innerHTML = "UPDATE INV";

  //   update_btn.className = "btn btn-primary m-2";
  //   update_btn.onclick = () =>
  //     (window.location.href = `/admin/update_investment.html?${element._id}`);
  //   cancel_btn.innerHTML = "CANCEL";
  //   cancel_btn.className = "btn btn-danger m-2";
  //   cancel_btn.onclick = () => handle_cancel_investment(cancel_btn, element._id);
  section.append(
    withdrawer,
    date,
    withdrawerNames,
    amount,
    method,
    wallet,
    approveBTn,
    delBTn,
  );
  document.querySelector(".history-table").append(section);
};
const setText = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
};

(async () => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      // "https://fintexaurum-backend.glitch.me/api/admin/withdrawal/fetch",
      "http://localhost:3000/api/admin/withdrawal/fetch",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);

    setText(result.message);
  } catch (err) {
    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();

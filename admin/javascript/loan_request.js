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

const handle_approve_loan = async (btn, loan_request) => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  btn.innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://wealthinvest-backend.glitch.me/api/admin/loan_request/crud",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, loan_request }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      btn.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      return;
    }
    btn.innerHTML = "Success";
    window.location.replace("/admin/loan_request.html");
  } catch (err) {
    btn.innerHTML = "Try again";

    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

const handle_disaprove_loan = async (btn, loan_request) => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  btn.innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://wealthinvest-backend.glitch.me/api/admin/loan_request/crud/disaprove",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, loan_request }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      btn.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      return;
    }
    btn.innerHTML = "Success";
    window.location.replace("/admin/loan_request.html");
  } catch (err) {
    btn.innerHTML = "Try again";

    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};
//

// const handle_cancel_investment = async (btn, investment) => {
//   btn.innerHTML = "Proccessing...";
//   let token = getCookie("admin_token");
//   let admin = getCookie("admin");
//   try {
//     const response = await fetch("/api/admin/investment/cancel", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ token, admin, investment }),
//     });
//     const result = await response.json();
//     console.log(result);
//     if (result.error) {
//       btn.innerHTML = "Try again";
//       document.querySelector(".errMessage").innerHTML = result.errMessage;
//       alert(result.errMessage);
//     } else {
//       alert(result.message);
//       btn.innerHTML = "Success";
//       window.location.href = "/admin/investment.html";
//     }
//   } catch (err) {
//     btn.innerHTML = "Try again";
//     console.log(err);
//     alert(err.message);
//   }
// };

const createAndAppendElement = (data) => {
  const section = document.createElement("section");
  const userH4 = document.createElement("h4");
  const loanTypeH4 = document.createElement("h4");
  const amountH4 = document.createElement("h4");
  const interestH4 = document.createElement("h4");
  const durationH4 = document.createElement("h4");
  const totalReturnH4 = document.createElement("h4");
  const statusH4 = document.createElement("h4");
  const approveBTN = document.createElement("button");
  const disaproveBTN = document.createElement("button");
  userH4.innerHTML = data.user.email;
  loanTypeH4.innerHTML = data.loan_type;
  amountH4.innerHTML = `$${data.loan_amount} `;
  interestH4.innerHTML = data.interest || "unspecified";
  durationH4.innerHTML = data.loan_duration || "unspecified";
  totalReturnH4.innerHTML = data.total_return || "unspecified";
  statusH4.innerHTML = data.status;
  statusH4.innerHTML = data.status;
  approveBTN.innerHTML = "APPROVE ";
  disaproveBTN.innerHTML = "DISAPROVE";
  approveBTN.className = "btn btn-primary m-2";
  disaproveBTN.className = "btn btn-danger m-2";
  disaproveBTN.onclick = () => handle_disaprove_loan(disaproveBTN, data._id);
  approveBTN.onclick = () => handle_approve_loan(approveBTN, data._id);

  //  data.status == "failed"
  //    ? (statusH4.className = "status-fail")
  //    : data.status == "pending"
  //    ? (statusH4.className = "status-pending")
  //    : (statusH4.className = "status-success");

  section.append(
    userH4,
    loanTypeH4,
    amountH4,
    interestH4,
    durationH4,
    totalReturnH4,
    statusH4,
    approveBTN,
    disaproveBTN,
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
      "https://wealthinvest-backend.glitch.me/api/admin/loan_request",
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

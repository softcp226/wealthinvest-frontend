const createAndAppendElement = (element) => {
  //   console.log(element);
  const section = document.createElement("section");
  section.className = "table-list-credit";
  const refH4 = document.createElement("h4");
  const loanTypeH4 = document.createElement("h4");
  const loanAmountH4 = document.createElement("h4");
  const interestH4 = document.createElement("h4");
  const durationH4 = document.createElement("h4");
  const totalReturnH4 = document.createElement("h4");
  const statusH4 = document.createElement("h4");

  refH4.innerHTML = "#unverified";
  loanTypeH4.innerHTML = element.loan_type;
  loanAmountH4.innerHTML = element.loan_amount;
  interestH4.innerHTML = element.interest;
  durationH4.innerHTML = element.loan_duration;
  totalReturnH4.innerHTML = element.total_return;
  statusH4.innerHTML = element.status;

    element.status == "failed"
      ? (statusH4.className = "status-fail")
      : element.status == "pending"
      ? (statusH4.className = "status-pending")
      : (statusH4.className = "status-success");
  //   //   const tr_dH4 = document.createElement("h4");
  //   // const ltH4 = document.createElement("h4");
  //   //   let refH4 = document.createElement("h4");
  //   //   let srH4 = document.createElement("h4");
  //   //   let dnH4 = document.createElement("h4");
  //   //   let dtH4 = document.createElement("h4");
  //   //   let ctH4 = document.createElement("h4");
  //   //   let SSH4 = document.createElement("h4");
  //   let TDH4 = document.createElement("h4");
  //   let REFH4 = document.createElement("h4");
  //   let DBH4 = document.createElement("h4");
  //   let CDH4 = document.createElement("h4");
  //   let SSH4 = document.createElement("h4");

  //   TDH4.innerHTML = element.transaction_date;
  //   REFH4.innerHTML = element.refrence_number;
  //   DBH4.innerHTML = element.debit || "";
  //   CDH4.innerHTML = element.credit || "";
  //   SSH4.innerHTML = element.status;

  section.append(
    refH4,
    loanTypeH4,
    loanAmountH4,
    interestH4,
    durationH4,
    totalReturnH4,
    statusH4,
  );
  document.querySelector(".history-table").append(section);
};

const shape_result = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
  // const section = createElement("section");
  // section.className = "table-list-credit";
  // let h41 = createElement("h4");
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://fintexaurum-backend.glitch.me/api/user/loan_request/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
    }

     shape_result(result.message);
    
  } catch (err) {
    console.log(err)
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();

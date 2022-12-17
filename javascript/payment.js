// document.querySelector("#copy-to-clipboard").onclick = () => copyToClipboard();

const getDepositID = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

function copyToClipboard() {
  var copyText = document.querySelector("#wallet_address").innerHTML;
  navigator.clipboard.writeText(copyText).then(() => {
    // Alert the user that the action took place.
    // Nobody likes hidden stuff being done under the hood!
    if (copyText.length < 1) return;
    alert("Copied wallet to clipboard");
    copied_to_clipboard = true;
  });
}
// const display_address = (selectedOption, wallet_container, data) => {
//   switch (selectedOption) {
//     case "qr_code":
//       document.querySelector("#qr_code").style.display = "inline-block";
//       document.querySelector("#wallet_address").style.display = "none";
//       document.querySelector(
//         "#wallet_note",
//       ).innerHTML = `Open your Crypto.com App, scan the qr code above and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method} `;
//       //  else {
//       // document.querySelector(
//       //   "#wallet_note",
//       // ).innerHTML = `Open your Crypto.com App, copy and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method} to the wallet address above `;
//       // document.querySelector("#qr_code").style.display = "none";
//       // document.querySelector("#wallet_address").style.display =
//       //   "inline-block";
//       // }
//       break;

//     case "wallet_address":
//       // if (wallet_container != "unavailable"){
//       // if (wallet_container != "unavailable") {
//       document.querySelector("#qr_code").style.display = "none";
//       document.querySelector("#wallet_address").style.display = "inline-block";
//       document.querySelector(
//         "#wallet_note",
//       ).innerHTML = `Open your Crypto.com App,copy and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method}  to the wallet above`;
//       // } else {
//       //   //   document.querySelector("#qr_code").style.display = "none";
//       //   //   document.querySelector("#wallet_address").style.display = "inline-block";
//       //   // }
//       // }else{
//       // document.querySelector("#qr_code").style.display = "none";
//       // document.querySelector("#wallet_address").style.display = "inline-block";
//       // document.querySelector("#wallet_note").innerHTML = `Send ${
//       //   data.currency
//       // }${data.deposit_amount} to the ${data.payment_method} ${
//       //   data.payment_method != "Perfect Money" ? "E-mail" : "ID"
//       // } above `;

//       break;

//     default:
//       document.querySelector("#qr_code").style.display = "none";
//       document.querySelector("#wallet_address").style.display = "inline-block";

//       break;
//   }
// };

const shape_result = (data) => {
  const wallet_address_div = document.createElement("div");
  // const qr_code_img = document.createElement("img");
  wallet_address_div.id = "wallet_address";
  // qr_code_img.id = "qr_code";
  wallet_address_div.className = "wallet_address";
  wallet_address_div.onclick=()=>copyToClipboard()
  wallet_address_div.style.cursor="pointer"
  const text_h3 = document.createElement("h3");
  text_h3.id = "wallet_note";
  const select = document.createElement("select");
  const wallet_address_option = document.createElement("option");
  // const qr_code_option = document.createElement("option");
  wallet_address_option.value = "wallet_address";
  // qr_code_option.value = "Use wallet address";
  wallet_address_option.innerHTML = "Use wallet address";
  // qr_code_option.innerHTML = "Use Qr Code";
  wallet_address_option.selected = true;
  wallet_address_div.innerHTML = data.payment_wallet;
  // qr_code_img.src = data.payment_qr_code;
  const nextbtn = document.createElement("a");
  nextbtn.className = "btn btn-dark";
  nextbtn.innerHTML = "I have made payment";
  nextbtn.href = "/submit-receipt.html";
  // data.payment_qr_code == "unavailable"
  //   ? (text_h3.innerHTML = `Send ${data.currency}${
  //       data.deposit_amount
  //     } to the ${data.payment_method} ${
  //       data.payment_method != "Perfect Money" ? "E-mail" : "ID"
  //     } above `)
  text_h3.innerHTML = `Copy the wallet address above and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method} to the address`;
  // select.onchange = () =>
  //   display_address(select.value, data.payment_qr_code, data);

  select.append(wallet_address_option);
  console.log(select.value);
  // if (data.payment_qr_code != "unavailable") {
  // qr_code_img.style.display = "none";
  // wallet_address_div.style.display = "inline-block";

  //     text_h3.innerHTML = `Send ${data.currency}${
  //         data.deposit_amount
  //       } to the ${data.payment_method} ${
  //         data.payment_method != "Perfect Money" ? "E-mail" : "ID"
  //       } `;
  // } else {
  // qr_code_img.style.display = "none";
  // wallet_address_div.style.display = "inline-block";
  // }

  document
    .querySelector(".wallet-container")
    .append(wallet_address_div, text_h3, select,nextbtn , document.createElement("br"));
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "http://localhost:3000/api/user/create_deposit/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token,
          user,
          deposit_request_id: getDepositID(),
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);
    shape_result(result.message);
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();

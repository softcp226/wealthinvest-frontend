let user_has_made_deposit = false;

const setText = (user) => {
  document.querySelectorAll("#user_passport").forEach((passport) => {
    passport.src = user.passport;
    user_has_made_deposit = user.has_made_deposit;
  });
};

document.addEventListener(
  "DOMContentLoaded",
  () =>
    (document.querySelector("#deposit_fund").onclick = () => {
      event.preventDefault();
      if (user_has_made_deposit != true) {
        document.querySelector("#sidenav-collapse-main").className =
          "navbar-collapse collapse hide";
        document.querySelector("#overlay2").style.display = "block";
        return;
      } else {
        window.location.href = "/deposit.html";
      }
    }),
);

const getCookie = (cname) => {
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
  window.location.href = "/login.html";
};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch("http://localhost:3000/api/user/find", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, user }),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } else {
      setText(result.message);
    }
  } catch (error) {
    alert(error.message);
  }
})();

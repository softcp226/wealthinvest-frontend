
(async () => {
  try {
    const response = await fetch("https://wealthinvest-backend.glitch.me", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "server is awake..." }),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } else {
     console.log(result.message);
    }
  } catch (error) {
    alert(error.message);
  }
})();

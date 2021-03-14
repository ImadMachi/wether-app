const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector("p#forecast");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;

  messageOne.textContent = "Loading..";
  messageTwo.textContent = "";

  fetch(`/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
      }
    });
});

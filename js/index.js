//burger-menu

const headerNavBtn = document.querySelector(".header__nav-btn");
const headerNavigation = document.querySelector(".header__navigation");

headerNavBtn.addEventListener("click", () => {
  headerNavigation.classList.toggle("header__navigation_open");
});

//modal

const heroBtn = document.querySelector(".hero__button");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

heroBtn.addEventListener("click", () => {
  overlay.classList.add("overlay-open");
  modal.classList.add("modal-open");
});

overlay.addEventListener("click", (e) => {
  const target = e.target;

  if (target === overlay || target.closest(".modal__close")) {
    overlay.classList.remove("overlay-open");
    modal.classList.remove("modal-open");
  }
});

//send data

const form = document.querySelector("form");
const modalTitle = document.querySelector(".modal__title");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    surname: form.surname.value,
    tel: form.tel.value,
  };

  fetch("https://api-form-order.herokuapp.com/api/order", {
    method: "post",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((person) => {
      modalTitle.textContent = `${person.name}, ваша заявка успешно отправлена, номер: ${person.id}`;
      form.remove();

      setTimeout(() => {
        overlay.classList.remove("overlay-open");
        modal.classList.remove("modal-open");
      }, 3000);
    });
});

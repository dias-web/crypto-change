//burger-menu

const headerNavBtn = document.querySelector(".header__nav-btn");
const headerNavigation = document.querySelector(".header__navigation");

headerNavBtn.addEventListener("click", () => {
  headerNavigation.classList.toggle("header__navigation_open");
});

headerNavigation.addEventListener("click", ({ target }) => {
  if (target.classList.contains("navigation__link")) {
    headerNavigation.classList.remove("header__navigation_open");
  }
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

//tabs

const advantageButtons = document.querySelectorAll(".advantage__button");
const advantageItemsContent = document.querySelectorAll(
  ".advantage__item-content"
);

advantageButtons.forEach((advantageButton, i) => {
  advantageButton.addEventListener("click", () => {
    advantageItemsContent.forEach((advantageItemContent, j) => {
      if (i === j) {
        advantageButtons[j].classList.add("advantage__button_active");
        advantageItemsContent[j].classList.add(
          "advantage__item-content_active"
        );
      } else {
        advantageButtons[j].classList.remove("advantage__button_active");
        advantageItemsContent[j].classList.remove(
          "advantage__item-content_active"
        );
      }
    });
  });
});

//exchange

const exchangeRatesList = document.querySelector(".exchange-rates__list");

const socket = new WebSocket("wss://web-socket-current.herokuapp.com");

const renderExchange = (wrapper, data) => {
  const { from, to, rate, change } = JSON.parse(data);

  const listItem = document.createElement("li");
  listItem.classList.add(
    "exchange-rates__item",
    change === 1 ? "exchange-rates__item_up" : "exchange-rates__item_down"
  );
  const currency = document.createElement("span");
  currency.classList.add("exchange-rates__currency");
  currency.textContent = `${from}/${to}`;

  const value = document.createElement("span");
  value.classList.add("exchange-rates__value");
  value.textContent = rate;

  listItem.append(currency, value);
  wrapper.prepend(listItem);

  if (wrapper.children.length > 4) {
    wrapper.children[4].remove();
  }
};

socket.addEventListener("message", (event) => {
  renderExchange(exchangeRatesList, event.data);
});

socket.addEventListener("error", (err) => {
  console.log(err);
});

//faq

const hide = (elem, answer) => {
  if (
    !elem.classList.contains("faq__item_show") ||
    elem.classList.contains(".collapsing")
  )
    return;

  answer.style.height = `${answer.offsetHeight}px`;
  answer.offsetHeight;
  answer.style.display = "block";
  answer.style.height = 0;
  answer.style.overflow = "hidden";
  answer.style.transition = "height 0.36s ease-in-out";
  elem.classList.remove("faq__item_show");
  elem.classList.add(".collapsing");

  setTimeout(() => {
    answer.style.display = "";
    answer.style.height = "";
    answer.style.overflow = "";
    answer.style.transition = "";
    elem.classList.remove(".collapsing");
  }, 360);
};

const show = (elem, answer) => {
  if (
    elem.classList.contains("faq__item_show") ||
    elem.classList.contains(".collapsing")
  )
    return;

  answer.style.display = "block";
  const height = answer.offsetHeight;
  answer.style.height = 0;
  answer.style.overflow = "hidden";
  answer.style.transition = "height 0.36s ease-in-out";
  answer.offsetHeight;
  answer.style.height = `${height}px`;
  elem.classList.add(".collapsing");

  setTimeout(() => {
    elem.classList.add("faq__item_show");
    answer.style.display = "";
    answer.style.height = "";
    answer.style.overflow = "";
    answer.style.transition = "";
    elem.classList.remove(".collapsing");
  }, 360);
};

const accordion = () => {
  const list = document.querySelector(".faq__list");

  list.addEventListener("click", (e) => {
    const button = e.target.closest(".faq__question");

    if (button) {
      const item = button.closest(".faq__item");
      const answer = item.querySelector(".faq__answer");
      item.classList.contains("faq__item_show")
        ? hide(item, answer)
        : show(item, answer);
    }
  });
};

accordion();

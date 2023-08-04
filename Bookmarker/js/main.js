let submit = document.querySelector(".sub");
let url = document.querySelector("#url");
let Name = document.querySelector("#name");
let visit = document.querySelector(".vis");
let del = document.querySelector(".del");
let tbody = document.querySelector("tbody");
let modal = document.querySelector(".Modal");
let overlay = document.querySelector(".Overlay");
let closeModel = document.querySelector(".close-modal");
let allSites = [];
if (localStorage.getItem("sites")) {
  allSites = JSON.parse(localStorage.getItem("sites"));
  showData();
}

submit.addEventListener("click", () => {
  if (isValidURL(url.value) && Name.value.length > 3) {
    let site = {
      sname: Name.value,
      surl: url.value,
    };
    allSites.push(site);
    localStorage.setItem("sites", JSON.stringify(allSites));
    showData();
  } else {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
});

function showData() {
  let trs = "";
  for (let i = 0; i < allSites.length; i++) {
    trs += `<tr>
        <td>${i + 1}</td>
        <td>${allSites[i].sname}</td>
        <td>
          <button onclick="visitLink(${i})" class="btn vis btn-visit" data-index="0">
            <i  class="fa-solid fa-eye pe-2 fs-5"></i>Visit
          </button>
        </td>
        <td>
          <button onclick="deleted(${i})" class="btn del btn-delete pe-2" data-index="0">
            <i class="fa-solid fa-trash-can fs-5"></i>
            Delete
          </button>
        </td>
      </tr>`;
  }
  tbody.innerHTML = trs;
}

function visitLink(indx) {
  let link = allSites[indx].surl;
  window.location.href = link;
}
function deleted(indx) {
  allSites.splice(indx, 1);
  localStorage.setItem("sites", JSON.stringify(allSites));
  showData();
}

function isValidURL(url) {
  const urlPattern = new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i);
  return urlPattern.test(url);
}

function closingModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
closeModel.addEventListener("click", () => {
  closingModal();
});

document.addEventListener("click", (e) => {
  if (e.target != submit) closingModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closingModal();
});

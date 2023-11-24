const shortenedLinks = [];

const form = document.getElementById("urlShortenForm");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const urlInput = document.getElementById("urlInput").value;
    const shortenBtn = document.getElementById("shortenBtn");
    const spinner = document.querySelector("#shortenBtn .spinner-border");

    shortenBtn.setAttribute("disabled", "true");
    spinner.classList.remove("d-none");

    fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        shortenedLinks.push(data);
        displayShortenedLinks(shortenedLinks);
        saveToLocalStorage(shortenedLinks);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        shortenBtn.removeAttribute("disabled");
        spinner.classList.add("d-none");
      });
  });
}

function getTemplate() {
  return Handlebars.compile(`<div class="d-flex justify-content-start me-3">
  <img src={{icon}} width="48" height="48" />
</div>
<div class="d-flex justify-content-between w-100">
  <div>
    <div class="mb-1">
      <a
        class="font-weight-bold"
        href={{short_url}}
        target="_blank"
        rel="noopener noreferrer"
      >
      {{display_url}}
      </a>
      <button
        type="button"
        class="btn btn-link text-secondary p-0 mx-2"
        title="Copy"
      >
        <i class="fas fa-copy"></i>
      </button>
    </div>
    <a
      class="text-muted text-decoration-none"
      href={{url}}
      target="_blank"
      rel="noopener noreferrer"
    >
    {{url}}
    </a>
  </div>
  <div class="my-auto">
    <div class="dropdown">
      <button
        class="btn btn-link text-secondary"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-three-dots-vertical"></i>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#" onClick="edit">
            Edit
          </a>
        </li>
        <li>
          <a
            class="dropdown-item text-danger"
            href="#"
            onClick="delete"
          >
            Delete
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>`);
}

function getIcon(url) {
  const host = new URL(url).hostname;
  return `https://logo.clearbit.com/${host}?size=48`;
}

function displayShortenedLinks(links) {
  const shortenedUrlsList = document.getElementById("links");
  const template = getTemplate();

  links.forEach((link) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "list-group-item-action",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    listItem.innerHTML = template({
      ...link,
      icon: getIcon(link.url),
      display_url: link.short_url.replace("https://", ""),
    });
    listItem.setAttribute("data-id", link.key);
    shortenedUrlsList.appendChild(listItem);
  });
}

function saveToLocalStorage(links) {
  localStorage.setItem("links", JSON.stringify(links));
}

function renderShortenedLinks() {
  try {
    const savedLinks = JSON.parse(localStorage.getItem("links"));
    if (savedLinks && savedLinks.length > 0) {
      displayShortenedLinks(savedLinks);
    }
  } catch (e) {
    console.log("localStorage error", e);
  }
}

function copyToClipboard(text) {
  console.log("Copying: To be implemented", text);
}

function editLink(key) {
  console.log("Editing link with key: To be implemented", key);
}

function deleteLink(key) {
  console.log("Deleting link with key: To be implemented", key);
}

document.addEventListener("DOMContentLoaded", renderShortenedLinks);

const nav_items = [
  { icon: "bi bi-file-person-fill", text: "Sobre mí", html: "views/about.html" },
  { icon: "bi bi-server", text: "Proyectos", html: "views/projects.html" },
  { icon: "bi bi-tools", text: "Tecnologías", html: "views/tecnologies.html" },
  { icon: "bi bi-file-earmark-text-fill", text: "Educación", html: "views/education.html" },
]

let cont = 1

function addNavItem(icon, text, html) {
  document.getElementById("nav-item-container").innerHTML += `
    <div class="nav-item${cont == 1 ? " active" : ""}" onclick="loadPage('${html}', ${cont})">
      <i class="${icon}"></i>
      <button name="button">${text}</button>
    </div>
  `
  cont++
}

function changeNavItemSelect(selectNumber) {
  localStorage.setItem("navItem", selectNumber)

  document.querySelectorAll(".nav-item").forEach((item, i) => {
    item.classList.remove("active")
  })

  document.querySelectorAll(".nav-item").forEach((item, i) => {
    if (i + 1 == selectNumber) {
      item.classList.add("active")
    }
  })
}

// Inicializar navegación
function initNavigation() {
  // Cargar el componente de navegación
  fetch("views/navigation.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navigator").innerHTML = html

      // Agregar items de navegación
      nav_items.forEach((item) => {
        addNavItem(item.icon, item.text, item.html)
      })

      // Cargar página guardada o la primera
      const savedPage = localStorage.getItem("navItem") || 1
      window.loadPage(nav_items[savedPage - 1].html, savedPage)
    })
    .catch((error) => console.error("Error loading navigation:", error))
}

// Ejecutar al cargar la página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation)
} else {
  initNavigation()
}

function loadPage(url, index) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html
      changeNavItemSelect(index)
    })
    .catch((error) => console.error("Error loading page:", error))
}

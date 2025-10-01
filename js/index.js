function loadPage(url, pageNumber) {
  const content = document.getElementById("content")

  // Animación de salida
  content.classList.add("slide-out")

  setTimeout(() => {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        content.innerHTML = html
        content.classList.remove("slide-out")
        content.classList.add("slide-in")

        // Cambiar item activo en navegación
        window.changeNavItemSelect(pageNumber) // Assuming changeNavItemSelect is a global function

        // Remover clase de animación después de completar
        setTimeout(() => {
          content.classList.remove("slide-in")
        }, 600)
      })
      .catch((error) => {
        console.error("Error loading page:", error)
        content.innerHTML =
          '<div class="section-content"><h2>Error al cargar la página</h2><p>Por favor, intenta nuevamente.</p></div>'
        content.classList.remove("slide-out")
      })
  }, 400)
}

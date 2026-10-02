/* index.js — Transición de página con animación */
/* La función loadPage real es definida en portfolio-loader.js (parcha navigator.js) */
/* Este archivo se mantiene como referencia de la animación base */

window._baseLoadPage = function(url, pageNumber) {
    const content = document.getElementById("content");
    if (!content) return;

    content.classList.add("slide-out");

    setTimeout(() => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                content.classList.remove("slide-out");
                content.classList.add("slide-in");

                if (typeof window.changeNavItemSelect === 'function') {
                    window.changeNavItemSelect(pageNumber);
                }

                setTimeout(() => content.classList.remove("slide-in"), 600);
            })
            .catch(error => {
                console.error("Error loading page:", error);
                content.innerHTML =
                    '<div class="section-content"><h2>Error al cargar la página</h2><p>Por favor, intenta nuevamente.</p></div>';
                content.classList.remove("slide-out");
            });
    }, 400);
};

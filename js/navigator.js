/* ===================== Navigator — Menú lateral ===================== */

const nav_items = [
    { icon: "bi bi-file-person-fill", text: "Sobre mí",     html: "views/about.html"       },
    { icon: "bi bi-folder2-open",     text: "Proyectos",     html: "views/projects.html"    },
    { icon: "bi bi-tools",            text: "Tecnologías",   html: "views/tecnologies.html" },
    { icon: "bi bi-mortarboard-fill", text: "Educación",     html: "views/education.html"   },
];

let cont = 1;

function addNavItem(icon, text, html) {
    const activeClass = cont === 1 ? " active" : "";
    const itemHTML = `
        <div class="nav-item${activeClass}" onclick="loadPage('${html}', ${cont})">
            <i class="${icon}"></i>
            <button name="button">${text}</button>
        </div>
    `;
    const desktopContainer = document.getElementById("nav-item-container");
    const mobileContainer  = document.getElementById("nav-item-container-mobile");
    if (desktopContainer) desktopContainer.innerHTML += itemHTML;
    if (mobileContainer)  mobileContainer.innerHTML  += itemHTML;
    cont++;
}

window.changeNavItemSelect = function(selectNumber) {
    localStorage.setItem("navItem", selectNumber);
    document.querySelectorAll(".nav-item").forEach((item, i) => {
        // Hay N items en desktop y N items en mobile — i % N da el índice real
        item.classList.toggle("active", (i % nav_items.length) + 1 == selectNumber);
    });
};

/* Construir el navegador lateral */
function buildNavDesktop() {
    const nav = document.getElementById("navigator");
    if (!nav) return;

    // Preservar las cyber-lines que ya existen (del index.html)
    const cyberContent = nav.querySelector('.cyber-content');

    nav.innerHTML = `
        ${cyberContent ? cyberContent.outerHTML : ''}
        <div class="nav-photo">
            <img src="assets/imgs/foto.png" alt="Luis Calle Lazo" id="nav-profile-pic" />
        </div>
        <div class="nav-item-container" id="nav-item-container"></div>
        <div class="links-container">
            <div class="link-item">
                <i class="bi bi-github"></i>
                <a href="https://github.com/LuisCalleLazo" target="_blank" id="link-github">Github</a>
            </div>
            <div class="link-item">
                <i class="bi bi-linkedin"></i>
                <a href="https://www.linkedin.com/in/deynar-luis-calle-lazo-bb946025b/" target="_blank" id="link-linkedin">Linkedin</a>
            </div>
            <div class="link-item">
                <i class="bi bi-whatsapp"></i>
                <a href="https://wa.me/59178824516" target="_blank" id="link-whatsapp">Whatsapp</a>
            </div>
        </div>
    `;

    nav_items.forEach(item => addNavItem(item.icon, item.text, item.html));

    // Cargar la sección guardada DESPUÉS de un tick para que portfolio-loader.js
    // haya tenido oportunidad de instalar su override de loadPage
    const savedPage = parseInt(localStorage.getItem("navItem")) || 1;
    const pageIndex = Math.min(Math.max(savedPage, 1), nav_items.length);

    requestAnimationFrame(() => {
        window.loadPage(nav_items[pageIndex - 1].html, pageIndex);
    });
}

/* Definición base de loadPage — solo como fallback si portfolio-loader.js no está presente */
if (typeof window.loadPage !== 'function') {
    window.loadPage = function(url, index) {
        const content = document.getElementById("content");
        if (!content) return;
        fetch(url)
            .then(r => r.text())
            .then(html => {
                content.innerHTML = html;
                if (typeof window.changeNavItemSelect === 'function') {
                    window.changeNavItemSelect(index);
                }
            })
            .catch(err => console.error("Error loading page:", err));
    };
}

/* Iniciar */
document.addEventListener("DOMContentLoaded", buildNavDesktop);

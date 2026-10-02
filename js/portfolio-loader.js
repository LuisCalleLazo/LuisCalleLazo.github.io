/* ===================== PORTFOLIO LOADER — Dynamic JSON Renderer =====================
 *
 *  Carga el JSON editable (data/portafolio.json o data/portfolio.json)
 *  y renderiza dinámicamente las vistas del sitio.
 * =======================================================================================*/

const PORTFOLIO_JSON = 'data/portfolio.json';
const MIN_LOADER_TIME = 1500; // ms

let portfolioData   = null;
let loaderStartTime = Date.now();

// Estado de la sección activa
window.activeSectionUrl   = null;
window.activeSectionIndex = null;

/* ===== Fallback integrado por si se abre mediante file:// (CORS restrictivo) ===== */
const FALLBACK_PORTFOLIO = {
  "profile": {
    "name": "Luis Calle Lazo",
    "title": "Desarrollador Backend",
    "photo": "assets/imgs/foto.png",
    "social": {
      "github": "https://github.com/LuisCalleLazo",
      "linkedin": "https://www.linkedin.com/in/deynar-luis-calle-lazo-bb946025b/",
      "whatsapp": "https://wa.me/59178824516"
    }
  },
  "about": {
    "description": "Desarrollador Backend apasionado por crear soluciones eficientes y escalables. Con experiencia en múltiples tecnologías y frameworks, me especializo en el desarrollo de sistemas robustos y APIs REST. Siempre en búsqueda de nuevos desafíos y oportunidades para aprender y crecer profesionalmente.",
    "interests": {
      "games": [
        { "name": "Left 4 Dead",  "image": "assets/imgs/left4dead.png" },
        { "name": "Warcraft III", "image": "assets/imgs/warcraftIII.png" }
      ],
      "sports": ["Fútbol", "Natación"]
    }
  },
  "projects": [
    {
      "title": "Sistema Contable Empresarial",
      "status": "En Desarrollo",
      "statusColor": "#f59e0b",
      "visibility": "Privado",
      "visibilityColor": "#cc0000",
      "description": "Sistema completo de contabilidad empresarial con generación de estados financieros, integración con el Banco Central de Bolivia para obtención de UFVs y reportes avanzados.",
      "images": [
        { "src": "assets/imgs/warcraftIII.png", "description": "Dashboard principal con resumen financiero del periodo" },
        { "src": "assets/imgs/warcraftIII.png", "description": "Módulo de estados financieros — balance general" }
      ],
      "link": "",
      "languages": ["C#", "ASP.NET Core", "SQL Server", "Entity Framework"],
      "features": [
        "Desarrollo de estados financieros completos (balance general, estado de resultados, flujo de efectivo)",
        "Integración con BCB para obtención automática de Unidades de Fomento de Vivienda (UFVs)"
      ]
    },
    {
      "title": "Sistema de Campus Virtual",
      "status": "Finalizado",
      "statusColor": "#10b981",
      "visibility": "Público",
      "visibilityColor": "#f59e0b",
      "description": "Plataforma educativa completa con reportes gráficos del progreso estudiantil, arquitectura MVC y APIs REST para integración con sistemas externos.",
      "images": [
        { "src": "assets/imgs/warcraftIII.png", "description": "Vista del panel estudiantil con progreso académico" },
        { "src": "assets/imgs/warcraftIII.png", "description": "Reportes gráficos de rendimiento por materia" }
      ],
      "link": "",
      "languages": ["C#", "ASP.NET MVC", "SQL Server", "JavaScript"],
      "features": [
        "Reportes con gráficas del progreso estudiantil",
        "Arquitectura MVC",
        "APIs REST para integraciones"
      ]
    },
    {
      "title": "Learning Management System (LMS)",
      "status": "",
      "statusColor": "",
      "visibility": "Privado",
      "visibilityColor": "#cc0000",
      "description": "Sistema de gestión de aprendizaje con arquitectura de microservicios, reportes avanzados con gráficas y comunicación cliente-servidor de alta disponibilidad.",
      "images": [
        { "src": "assets/imgs/lms_1.png", "description": "Panel de administración de cursos y módulos" }
      ],
      "link": "",
      "languages": ["C#", ".NET", "Docker", "RabbitMQ", "SQL Server"],
      "features": [
        "Reportes con gráficas avanzadas",
        "Arquitectura de Microservicios",
        "Arquitectura Cliente-Servidor"
      ]
    },
    {
      "title": "Videojuego de Carreras",
      "status": "En Progreso",
      "statusColor": "#f59e0b",
      "visibility": "Público",
      "visibilityColor": "#f59e0b",
      "description": "Videojuego de carreras multijugador con mapa infinito generado proceduralmente y obstáculos dinámicos, desarrollado en Unity Engine.",
      "images": [
        { "src": "assets/imgs/racing_1.png", "description": "Gameplay — pista infinita con obstáculos dinámicos" },
        { "src": "assets/imgs/racing_2.png", "description": "Lobby multijugador para partidas con amigos" }
      ],
      "link": "",
      "languages": ["C#", "Unity Engine"],
      "features": [
        "Modo multijugador con amigos",
        "Mapa infinito con obstáculos dinámicos"
      ]
    },
    {
      "title": "Traductor de Lenguaje de Señas",
      "status": "",
      "statusColor": "",
      "visibility": "Privado",
      "visibilityColor": "#cc0000",
      "description": "Sistema de inteligencia artificial para interpretar lenguaje de señas en tiempo real mediante reconocimiento de movimientos de manos usando visión por computadora.",
      "images": [
        { "src": "assets/imgs/lsm_1.png", "description": "Interfaz de traducción en tiempo real con detección de manos" }
      ],
      "link": "",
      "languages": ["Python", "OpenCV", "TensorFlow", "MediaPipe"],
      "features": [
        "Algoritmos de IA para interpretación de movimientos",
        "Reconocimiento en tiempo real"
      ]
    }
  ],
  "technologies": [
    {
      "category": "Desarrollo Backend",
      "icon": "bi bi-server",
      "items": [
        { "name": "ASP.NET Core", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/512px-.NET_Core_Logo.svg.png", "gallery": [{ "src": "assets/imgs/dotnet_work_1.png", "description": "API REST con ASP.NET Core — Sistema Contable" }] },
        { "name": ".NET Framework", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/512px-.NET_Core_Logo.svg.png", "gallery": [] },
        { "name": "Django (Python)", "logo": "https://static.djangoproject.com/img/logos/django-logo-negative.svg", "gallery": [] },
        { "name": "Laravel (PHP)", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/512px-Laravel.svg.png", "gallery": [] },
        { "name": "Jasper Reports", "logo": "https://community.jaspersoft.com/files/jrs_logo_jaspersoft_rgb_hq.png", "gallery": [] }
      ]
    },
    {
      "category": "Desarrollo Mobile",
      "icon": "bi bi-phone",
      "items": [
        { "name": "Flutter", "logo": "https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16171.png", "gallery": [{ "src": "assets/imgs/flutter_work_1.png", "description": "App móvil con Flutter — módulo de autenticación" }] },
        { "name": "Kotlin", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin_Icon.png/512px-Kotlin_Icon.png", "gallery": [] }
      ]
    },
    {
      "category": "Gestión de Proyectos",
      "icon": "bi bi-kanban",
      "items": [
        { "name": "Jira", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Jira_Logo.svg/512px-Jira_Logo.svg.png", "gallery": [] },
        { "name": "Trello", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Antu_trello.svg/512px-Antu_trello.svg.png", "gallery": [] },
        { "name": "Notion", "logo": "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", "gallery": [] }
      ]
    },
    {
      "category": "Infraestructura en la Nube",
      "icon": "bi bi-cloud",
      "items": [
        { "name": "Digital Ocean", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/DigitalOcean_logo.svg/512px-DigitalOcean_logo.svg.png", "gallery": [] },
        { "name": "Microsoft Azure", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/512px-Microsoft_Azure.svg.png", "gallery": [] },
        { "name": "Atlantic.Net", "logo": "", "gallery": [] },
        { "name": "Namecheap", "logo": "https://www.namecheap.com/assets/img/nc-icon/namecheap-icon-400x400.jpg", "gallery": [] },
        { "name": "Avancehost", "logo": "", "gallery": [] },
        { "name": "NIC Bolivia", "logo": "", "gallery": [] }
      ]
    },
    {
      "category": "Diagramas de Software",
      "icon": "bi bi-diagram-3",
      "items": [
        { "name": "draw.io", "logo": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Diagrams.net_Logo.svg", "gallery": [{ "src": "assets/imgs/drawio_1.png", "description": "Diagrama de arquitectura de microservicios — LMS" }] },
        { "name": "Lucidchart", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Lucidchart_Logo.png/512px-Lucidchart_Logo.png", "gallery": [] }
      ]
    },
    {
      "category": "Desarrollo de Videojuegos",
      "icon": "bi bi-controller",
      "items": [
        { "name": "Unity Engine", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Unity_Technologies_logo.svg/512px-Unity_Technologies_logo.svg.png", "gallery": [{ "src": "assets/imgs/unity_1.png", "description": "Escena del videojuego de carreras — mapa infinito" }] },
        { "name": "Blender (Modelado 3D)", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/512px-Blender_logo_no_text.svg.png", "gallery": [] },
        { "name": "C# para Unity", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/512px-C_Sharp_wordmark.svg.png", "gallery": [] }
      ]
    }
  ],
  "education": {
    "universities": [
      {
        "name": "Universidad Franz Tamayo (UNIFRANZ)",
        "icon": "bi bi-building",
        "degree": "Ingeniería de Sistemas",
        "semester": "8vo",
        "achievements": [
          "Líder de Comunidad de Videojuegos (2023/II)",
          "Ayudante de Programación I"
        ],
        "gallery": [
          { "src": "assets/imgs/unifranz_1.png", "description": "Reconocimiento como Líder de Comunidad de Videojuegos — 2023/II" },
          { "src": "assets/imgs/unifranz_2.png", "description": "Certificado de Ayudante de Programación I" }
        ]
      }
    ],
    "courses": [
      {
        "platform": "Udemy",
        "description": "Cursos especializados en desarrollo web, backend y arquitectura de software",
        "gallery": [
          { "src": "assets/imgs/udemy_cert.png", "description": "Certificado de finalización — Curso de ASP.NET Core" }
        ]
      },
      { "platform": "Platzi", "description": "Rutas de aprendizaje en desarrollo profesional y tecnologías modernas", "gallery": [] },
      { "platform": "EDteam", "description": "Cursos de programación y desarrollo de software en español", "gallery": [] },
      { "platform": "Píldoras Informáticas", "description": "Tutoriales y formación en múltiples lenguajes de programación", "gallery": [] }
    ]
  }
};

/* ===== 0. Instalar override de loadPage SINCRÓNICAMENTE ===== */
installLoadPageOverride();

/* ===== 1. Cargar el JSON (data/portfolio.json) ===== */
function initPortfolioData() {
    fetch(PORTFOLIO_JSON)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            portfolioData = data;
            onPortfolioDataReady();
        })
        .catch(err => {
            console.warn('[portfolio-loader] Error cargando JSON vía fetch. Usando data de respaldo local:', err);
            portfolioData = FALLBACK_PORTFOLIO;
            onPortfolioDataReady();
        });
}

// Iniciar carga inmediatamente
initPortfolioData();

function onPortfolioDataReady() {
    tryHideLoader();
    updateMobileHeader();
    updateNavLinks();

    // Si había una vista esperando a cargarse, la renderizamos de inmediato con la nueva data
    const content = document.getElementById('content');
    if (content && window.activeSectionUrl) {
        renderSection(window.activeSectionUrl, content);
    }
}

/* ===== 2. Ocultar loader respetando tiempo mínimo ===== */
function tryHideLoader() {
    const elapsed   = Date.now() - loaderStartTime;
    const remaining = Math.max(0, MIN_LOADER_TIME - elapsed);
    setTimeout(hideLoader, remaining);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('fade-out');
    setTimeout(() => loader.classList.add('hidden'), 650);
}

/* ===== 3. Listener DOMContentLoaded / load ===== */
document.addEventListener('DOMContentLoaded', () => {
    updateMobileHeader();
});
window.addEventListener('load', () => {
    updateNavLinks();
});

/* ===== Override de loadPage ===== */
function installLoadPageOverride() {
    window.loadPage = function(url, index) {
        window.activeSectionUrl   = url;
        window.activeSectionIndex = index;

        const content = document.getElementById('content');
        if (!content) return;

        content.classList.add('slide-out');

        setTimeout(() => {
            content.innerHTML = '';
            content.classList.remove('slide-out');
            content.classList.add('slide-in');

            if (portfolioData) {
                renderSection(url, content);
            } else {
                loading(content);
            }

            if (typeof window.changeNavItemSelect === 'function') {
                window.changeNavItemSelect(index);
            }
            setTimeout(() => content.classList.remove('slide-in'), 600);
        }, 380);
    };
}

/* ===== Renderizador de sección por URL ===== */
function renderSection(url, container) {
    if (!url) return;
    if      (url.includes('about'))     renderAbout(container);
    else if (url.includes('project'))   renderProjects(container);
    else if (url.includes('tecnolog'))  renderTechnologies(container);
    else if (url.includes('education')) renderEducation(container);
    else {
        fetch(url).then(r => r.text()).then(html => { container.innerHTML = html; })
            .catch(() => { container.innerHTML = '<div class="section-content"><h2>Error al cargar vista</h2></div>'; });
    }
}

/* ===== Helpers de perfil ===== */
function updateMobileHeader() {
    if (!portfolioData) return;
    const p = portfolioData.profile;
    const el = (id) => document.getElementById(id);
    if (el('mobile-name'))        el('mobile-name').textContent  = p.name;
    if (el('mobile-title'))       el('mobile-title').textContent = p.title;
    if (el('mobile-profile-pic')) el('mobile-profile-pic').src   = p.photo;
}

function updateNavLinks() {
    if (!portfolioData) return;
    const s = portfolioData.profile.social;
    const el = (id) => document.getElementById(id);
    if (el('link-github'))   el('link-github').href   = s.github;
    if (el('link-linkedin')) el('link-linkedin').href = s.linkedin;
    if (el('link-whatsapp')) el('link-whatsapp').href = s.whatsapp;
    if (el('nav-profile-pic')) el('nav-profile-pic').src = portfolioData.profile.photo;
}

/* ===== Normalizar imagen (string | {src, description}) ===== */
function normalizeImg(img) {
    if (!img) return null;
    if (typeof img === 'string') return { src: img, description: '' };
    return { src: img.src || '', description: img.description || img.desc || '' };
}

/* ===== HTML de galería de thumbnails ===== */
function galleryThumbsHTML(gallery, dialogTitle) {
    const imgs = (gallery || []).map(normalizeImg).filter(i => i && i.src);
    if (imgs.length === 0) return '';

    const galleryJSON = JSON.stringify(imgs).replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const titleEsc    = dialogTitle.replace(/'/g, "\\'");

    return `
        <div class="gallery-grid">
            ${imgs.map((img, idx) => `
                <div class="gallery-thumb"
                     role="button"
                     tabindex="0"
                     title="${img.description || img.src}"
                     onclick="PortfolioDialog.open(JSON.parse(this.dataset.gallery), '${titleEsc}', ${idx})"
                     onkeydown="if(event.key==='Enter'||event.key===' ')this.click()"
                     data-gallery="${galleryJSON}">
                    <img src="${img.src}" alt="${img.description || ''}" loading="lazy"
                         onerror="this.closest('.gallery-thumb').style.display='none'" />
                    <div class="gallery-thumb-overlay">
                        <i class="bi bi-zoom-in"></i>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ===== HTML de botón "Ver galería" ===== */
function galleryBtnHTML(gallery, dialogTitle) {
    const imgs = (gallery || []).map(normalizeImg).filter(i => i && i.src);
    if (imgs.length === 0) return '';
    const galleryJSON = JSON.stringify(imgs).replace(/"/g, '&quot;');
    const titleEsc    = dialogTitle.replace(/'/g, "\\'");
    const label       = imgs.length === 1 ? '1 imagen' : `${imgs.length} imágenes`;
    return `
        <button class="gallery-btn"
                onclick="PortfolioDialog.open(JSON.parse(this.dataset.gallery), '${titleEsc}', 0)"
                data-gallery="${galleryJSON}">
            <i class="bi bi-images"></i> Ver galería (${label})
        </button>
    `;
}

/* ============================================================
   RENDERIZADORES
   ============================================================ */

/* ---------- ABOUT ---------- */
function renderAbout(container) {
    if (!portfolioData) return loading(container);
    const { about, profile } = portfolioData;

    const gamesHTML = (about.interests.games || []).map(g => `
        <div class="interest-card">
            <img src="${g.image}" alt="${g.name}" onerror="this.style.display='none'" />
            <h3 style="text-align:center;margin-top:0.5rem">${g.name}</h3>
        </div>
    `).join('');

    const sportsHTML = (about.interests.sports || []).map(s => `
        <h3>
            <i class="bi bi-circle-fill" style="font-size:0.45rem;color:var(--color-primary);margin-right:0.5rem;vertical-align:middle"></i>
            ${s}
        </h3>
    `).join('');

    container.innerHTML = `
        <div class="about-container">
            <div class="typewriter">
                <h1>${profile.name}</h1>
                <h2>${profile.title}</h2>
            </div>

            <div class="section-content stagger-item">
                <div class="section-title">
                    <h2><i class="bi bi-person-badge"></i> Sobre Mí</h2>
                </div>
                <p style="color:var(--text-secondary);line-height:1.8">${about.description}</p>
            </div>

            <div class="section-content stagger-item">
                <div class="section-title">
                    <h2><i class="bi bi-controller"></i> Videojuegos Favoritos</h2>
                </div>
                <div class="section-items">${gamesHTML}</div>
            </div>

            <div class="section-content stagger-item">
                <div class="section-title">
                    <h2><i class="bi bi-trophy"></i> Deportes</h2>
                </div>
                <div>${sportsHTML}</div>
            </div>
        </div>
    `;
}

/* ---------- PROJECTS ---------- */
function renderProjects(container) {
    if (!portfolioData) return loading(container);

    const projectsHTML = portfolioData.projects.map(p => {
        const visiBadge   = p.visibility ? `<span class="tag" style="background:${p.visibilityColor || 'var(--color-primary)'}">${p.visibility}</span>` : '';
        const statusBadge = p.status     ? `<span class="tag" style="background:${p.statusColor    || 'var(--color-accent)'}">${p.status}</span>`     : '';

        const imgs = (p.images || []).map(normalizeImg).filter(i => i && i.src);
        const imagesHTML = imgs.length > 0
            ? galleryThumbsHTML(imgs, p.title)
            : '';

        const linkHTML = p.link
            ? `<a class="project-link-btn" href="${p.link}" target="_blank" rel="noopener noreferrer">
                   <i class="bi bi-box-arrow-up-right"></i> Ver Proyecto
               </a>`
            : '';

        const langsHTML  = (p.languages || []).map(l => `<span class="lang-badge">${l}</span>`).join('');
        const featsHTML  = (p.features  || []).map(f =>
            `<h3><i class="bi bi-check-circle-fill" style="color:var(--color-primary);margin-right:0.5rem"></i>${f}</h3>
             <div class="feature-spacer"></div>`
        ).join('');

        return `
            <div class="section-content stagger-item">
                <div class="section-title">
                    <h2>${p.title}</h2>
                    ${visiBadge}${statusBadge}
                </div>
                ${p.description ? `<p class="project-description">${p.description}</p>` : ''}
                ${imagesHTML}
                ${langsHTML ? `<div class="lang-badges" style="margin-top:${imagesHTML ? '0.8rem':'0'}">${langsHTML}</div>` : ''}
                <div style="margin-top:1.2rem">${featsHTML}</div>
                ${linkHTML}
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="projects-container">
            <h1 style="margin-bottom:2rem"><i class="bi bi-folder2-open"></i> Mis Proyectos</h1>
            ${projectsHTML}
        </div>
    `;
}

/* ---------- TECHNOLOGIES ---------- */
function renderTechnologies(container) {
    if (!portfolioData) return loading(container);

    const sectionsHTML = portfolioData.technologies.map(cat => {
        const itemsHTML = (cat.items || []).map(item => {
            const it = typeof item === 'string'
                ? { name: item, logo: '', gallery: [] }
                : item;

            const hasGallery = (it.gallery || []).length > 0;
            const galleryJSON = JSON.stringify((it.gallery || []).map(normalizeImg)).replace(/"/g, '&quot;');
            const titleEsc    = it.name.replace(/'/g, "\\'");

            const logoHTML = it.logo
                ? `<img class="tech-logo" src="${it.logo}" alt="${it.name}" loading="lazy" onerror="this.style.display='none'" />`
                : `<i class="bi bi-box-seam" style="font-size:1.1rem;color:var(--color-primary);flex-shrink:0"></i>`;

            const galleryIcon = hasGallery
                ? `<i class="bi bi-images tech-gallery-icon" title="Ver galería de trabajo"></i>`
                : '';

            const clickAttr = hasGallery
                ? `onclick="PortfolioDialog.open(JSON.parse(this.dataset.gallery), '${titleEsc}', 0)"
                   onkeydown="if(event.key==='Enter'||event.key===' ')this.click()"
                   role="button" tabindex="0"
                   data-gallery="${galleryJSON}"`
                : '';

            return `
                <div class="tech-item ${hasGallery ? 'has-gallery' : ''}" ${clickAttr} title="${hasGallery ? 'Click para ver galería de trabajo' : it.name}">
                    ${logoHTML}
                    <span class="tech-name">${it.name}</span>
                    ${galleryIcon}
                </div>
            `;
        }).join('');

        return `
            <div class="section-content stagger-item">
                <div class="section-title">
                    <h2><i class="${cat.icon}"></i> ${cat.category}</h2>
                </div>
                <div>${itemsHTML}</div>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="tecnologies-container">
            <h1 style="margin-bottom:2rem"><i class="bi bi-tools"></i> Tecnologías y Herramientas</h1>
            ${sectionsHTML}
        </div>
    `;
}

/* ---------- EDUCATION ---------- */
function renderEducation(container) {
    if (!portfolioData) return loading(container);
    const { education } = portfolioData;

    const universitiesHTML = (education.universities || []).map(u => {
        const achievementsHTML = (u.achievements || []).map(a =>
            `<h3><i class="bi bi-star-fill" style="color:var(--color-accent);font-size:0.9rem;margin-right:0.5rem"></i>${a}</h3>`
        ).join('');

        const galHTML = galleryThumbsHTML(u.gallery || [], u.name);

        return `
            <div class="section-content stagger-item">
                <div class="section-title">
                    <h2><i class="${u.icon || 'bi bi-building'}"></i> ${u.name}</h2>
                </div>
                <div>
                    <h3 style="color:var(--color-primary-light)">
                        <i class="bi bi-award" style="margin-right:0.4rem"></i>${u.degree}
                    </h3>
                    <p style="color:var(--text-muted);margin-left:2rem;margin-top:0.5rem">Semestre: ${u.semester}</p>
                    <div style="margin-top:1.4rem;margin-left:1rem">${achievementsHTML}</div>
                    ${galHTML ? `
                        <div style="margin-top:1.2rem">
                            <p style="color:var(--text-muted);font-size:0.82rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.08em">
                                <i class="bi bi-images" style="color:var(--color-primary);margin-right:0.3rem"></i>Reconocimientos
                            </p>
                            ${galHTML}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    const coursesItemsHTML = (education.courses || []).map(c => {
        const galBtn = galleryBtnHTML(c.gallery || [], c.platform);
        return `
            <div style="margin-bottom:1.2rem">
                <h3><i class="bi bi-check-circle" style="color:var(--color-primary);margin-right:0.5rem"></i>${c.platform}</h3>
                <p style="color:var(--text-muted);margin-left:2rem;margin-top:0.3rem;margin-bottom:${galBtn ? '0.5rem' : '0'}">${c.description}</p>
                ${galBtn ? `<div style="margin-left:2rem">${galBtn}</div>` : ''}
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="main">
            <h1 style="margin-bottom:2rem"><i class="bi bi-mortarboard-fill"></i> Educación y Formación</h1>
            ${universitiesHTML}
            <div class="section-content stagger-item">
                <div class="section-title">
                    <h2><i class="bi bi-laptop"></i> Formación Complementaria</h2>
                </div>
                <div>${coursesItemsHTML}</div>
            </div>
        </div>
    `;
}

/* ===== Loading placeholder ===== */
function loading(container) {
    container.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:40vh">
            <div class="loading"></div>
        </div>
    `;
}


let nav_items = [
    {icon: 'bi bi-house-door-fill', text: 'Home', html: 'views/home.html'},
    {icon: 'bi bi-file-person-fill', text: 'Sobre mi', html: 'views/about.html'},

    {icon: 'bi bi-server', text: 'Proyectos', html: 'views/projects.html'},
    {icon: 'bi bi-tools', text: 'Tecnologias', html: 'views/tecnologies.html'},
    {icon: 'bi bi-file-earmark-text-fill', text: 'Educacion', html: 'views/education.html'},
]

function addNavItem(icon, text, html)
{
  document.getElementById("nav-item-container").innerHTML +=
  `
    <div class="nav-item" onclick="loadPage('${html}')">
      <i class="${icon}"></i>
      <button name="button">
        ${text}
      </button>
    </div>
  `;
}

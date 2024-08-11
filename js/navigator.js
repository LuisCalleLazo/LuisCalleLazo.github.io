
let nav_items = [
    {icon: 'bi bi-house-door-fill', text: 'Home', html: 'views/home.html'},
    {icon: 'bi bi-file-person-fill', text: 'Sobre mi', html: 'views/about.html'},

    {icon: 'bi bi-server', text: 'Proyectos', html: 'views/projects.html'},
    {icon: 'bi bi-tools', text: 'Tecnologias', html: 'views/tecnologies.html'},
    {icon: 'bi bi-file-earmark-text-fill', text: 'Educacion', html: 'views/education.html'},
]

let cont = 1;

function addNavItem(icon, text, html)
{
  document.getElementById("nav-item-container").innerHTML +=
  `
    <div class="nav-item${cont == 1 ? ' active' : ''}" onclick="loadPage('${html}', ${cont})">
      <i class="${icon}"></i>
      <button name="button">
        ${text}
      </button>
    </div>
  `;
  cont++;
}

function changeNavItemSelect(selectNumber)
{
  document.querySelectorAll(".nav-item").forEach((item, i) => {
    item.classList.remove('active');
  });


  document.querySelectorAll(".nav-item").forEach((item, i) => {
    if ((i + 1) == selectNumber) item.classList.add('active');
  });

}

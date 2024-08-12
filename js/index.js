
function loadComponent(componentPath, elementId) {
  fetch(componentPath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      nav_items.map((item) => { addNavItem(item.icon, item.text, item.html); });
    });
}

// Cargar componentes
loadComponent('components/navigator.html', 'navigator');

function loadPage(page, selectNumber) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
      changeNavItemSelect(selectNumber)
    });
}

// Cargar página inicial
let selectInit = localStorage.getItem("navItem");
let selectNavItem = (selectInit == undefined || selectInit == null) ? 1 : selectInit;

switch (selectNavItem) {
  case "1":
    loadPage('views/home.html', selectNavItem);
    break;
  case "2":
    loadPage('views/about.html', selectNavItem);
    break;
  case "3":
    loadPage('views/projects.html', selectNavItem);
    break;
  case "4":
    loadPage('views/tecnologies.html', selectNavItem);
    break;
  case "5":
    loadPage('views/education.html', selectNavItem);
    break;
  default:
    loadPage('views/home.html', selectNavItem);
}

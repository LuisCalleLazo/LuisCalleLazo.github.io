
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
loadPage('views/home.html', 1);

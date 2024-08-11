
function loadComponent(componentPath, elementId) {
  fetch(componentPath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    });
}

// Cargar componentes
loadComponent('components/navigator.html', 'navigator');

function loadPage(page) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
    });
}

// Cargar página inicial
loadPage('views/home.html');

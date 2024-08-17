
function loadComponent(componentPath, elementId) {
  fetch(componentPath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML += data;
      nav_items.map((item) => { addNavItem(item.icon, item.text, item.html); });
    });
}

// Cargar componentes
loadComponent('components/navigator.html', 'navigator');

function loadPage(page, selectNumber) {

  const contentElement = document.getElementById('content');
  contentElement.classList.add('slide-out');

  setTimeout(() => {
    fetch(page)
      .then(response => response.text())
      .then(data => {
        contentElement.innerHTML = data;
        contentElement.classList.remove('slide-out');
        contentElement.classList.add('slide-in');

        // Espera a que la animación de entrada termine
        setTimeout(() => {
          contentElement.classList.remove('slide-in');
        }, 500);
      });
    changeNavItemSelect(selectNumber);
  }, 500);
}

// Cargar página inicial
let selectInit = localStorage.getItem("navItem");
let selectNavItem = (selectInit == undefined || selectInit == null) ? 1 : selectInit;

switch (selectNavItem) {
  case "1":
    loadPage('views/about.html', selectNavItem);
    break;
  case "2":
    loadPage('views/projects.html', selectNavItem);
    break;
  case "3":
    loadPage('views/tecnologies.html', selectNavItem);
    break;
  case "4":
    loadPage('views/education.html', selectNavItem);
    break;
  default:
    loadPage('views/home.html', selectNavItem);
}


let socket = new WebSocket("ws://localhost:5132/socket/notification/status-user");

socket.onopen = function(e) {
  console.log("[open] Connection established");
};

socket.onmessage = function(event) {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};

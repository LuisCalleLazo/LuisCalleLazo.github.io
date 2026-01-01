// Control del menú hamburguesa y navegación mobile
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const menuOverlay = document.getElementById("menu-overlay");
    const navigatorMobile = document.getElementById("navigator-mobile");
    const body = document.body;

    // Función para abrir el menú
    function openMenu() {
        hamburgerBtn.classList.add("active");
        navigatorMobile.classList.add("active");
        menuOverlay.classList.add("active");
        body.style.overflow = "hidden";
    }

    // Función para cerrar el menú
    function closeMenu() {
        hamburgerBtn.classList.remove("active");
        navigatorMobile.classList.remove("active");
        menuOverlay.classList.remove("active");
        body.style.overflow = "";
    }

    // Toggle del menú al hacer clic en el botón hamburguesa
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (navigatorMobile.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Cerrar menú al hacer clic en el overlay
    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    // Cerrar menú al hacer clic en un item de navegación (solo en mobile)
    function addCloseListeners() {
        const navItemsMobile = document.querySelectorAll(
            "#navigator-mobile .nav-item",
        );
        navItemsMobile.forEach((item) => {
            item.addEventListener("click", function () {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });
    }

    // Llamar inicialmente
    addCloseListeners();

    // Re-agregar listeners cuando se actualice el contenido
    const observer = new MutationObserver(addCloseListeners);
    const navContainerMobile = document.getElementById(
        "nav-item-container-mobile",
    );
    if (navContainerMobile) {
        observer.observe(navContainerMobile, {
            childList: true,
            subtree: true,
        });
    }

    // Cerrar menú al cambiar a desktop
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Prevenir scroll del body cuando el menú está abierto
    if (navigatorMobile) {
        navigatorMobile.addEventListener("touchmove", function (e) {
            e.stopPropagation();
        });
    }

    // Copiar items de navegación al menú mobile
    function syncNavigationItems() {
        const navItemsDesktop = document.querySelectorAll(
            "#nav-item-container .nav-item",
        );
        const navContainerMobile = document.getElementById(
            "nav-item-container-mobile",
        );

        if (navContainerMobile && navItemsDesktop.length > 0) {
            navContainerMobile.innerHTML = "";
            navItemsDesktop.forEach((item) => {
                const clone = item.cloneNode(true);
                navContainerMobile.appendChild(clone);
            });
            addCloseListeners();
        }
    }

    // Observar cambios en el navigator desktop para sincronizar con mobile
    const navContainerDesktop = document.getElementById("nav-item-container");
    if (navContainerDesktop) {
        const desktopObserver = new MutationObserver(syncNavigationItems);
        desktopObserver.observe(navContainerDesktop, {
            childList: true,
            subtree: true,
        });

        // Sincronizar inicialmente
        setTimeout(syncNavigationItems, 100);
    }
});

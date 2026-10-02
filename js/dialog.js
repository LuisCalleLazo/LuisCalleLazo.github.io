/* ===================== DIALOG CONTROLLER =====================
 *  Sistema de lightbox/dialog con galería navegable.
 *  Usa el elemento nativo <dialog> con fallback para compatibilidad.
 * ============================================================*/

(function() {
    'use strict';

    /* ---- Estado del dialog ---- */
    let _images  = [];   // Array de { src, description }
    let _current = 0;
    let _title   = '';

    /* ---- Elementos del DOM (se obtienen una vez que el DOM esté listo) ---- */
    let $dialog, $box, $img, $desc, $dots, $prev, $next, $titleEl, $counter, $backdrop;

    /* ---- Inicializar elementos ---- */
    function initElements() {
        $dialog  = document.getElementById('portfolio-dialog');
        $box     = $dialog ? $dialog.querySelector('.dialog-box')   : null;
        $img     = document.getElementById('dialog-img');
        $desc    = document.getElementById('dialog-desc');
        $dots    = document.getElementById('dialog-dots');
        $prev    = document.getElementById('dialog-prev');
        $next    = document.getElementById('dialog-next');
        $titleEl = document.getElementById('dialog-title-text');
        $counter = document.getElementById('dialog-counter');
        $backdrop = document.getElementById('dialog-backdrop');
    }

    /* ---- Exponer API global ---- */
    window.PortfolioDialog = {

        /* Abrir el dialog con un array de imágenes */
        open: function(images, title, startIndex) {
            if (!$dialog) initElements();
            if (!$dialog) return;

            _images  = (images || []).map(normalizeImage);
            _title   = title || '';
            _current = startIndex || 0;

            if (_images.length === 0) return;

            // Título
            if ($titleEl) $titleEl.textContent = _title;

            // Renderizar dots
            renderDots();
            // Mostrar imagen inicial
            showImage(_current, false);

            // Abrir
            if ($backdrop) $backdrop.classList.add('active');
            if (typeof $dialog.showModal === 'function') {
                $dialog.showModal();
            } else {
                $dialog.setAttribute('open', '');
                $dialog.style.display = 'flex';
            }

            // Bloquear scroll
            document.body.style.overflow = 'hidden';

            // Foco en el botón cerrar
            const closeBtn = document.getElementById('dialog-close-btn');
            if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
        },

        close: function() {
            if (!$dialog) return;
            if ($backdrop) $backdrop.classList.remove('active');
            if (typeof $dialog.close === 'function') {
                $dialog.close();
            } else {
                $dialog.removeAttribute('open');
                $dialog.style.display = 'none';
            }
            document.body.style.overflow = '';
        },

        prev: function() { navigate(-1); },
        next: function() { navigate(+1); },
        goTo: function(i) { showImage(i); }
    };

    /* ---- Normalizar imagen (string o {src, description}) ---- */
    function normalizeImage(img) {
        if (typeof img === 'string') return { src: img, description: '' };
        return { src: img.src || img.url || '', description: img.description || img.desc || '' };
    }

    /* ---- Mostrar imagen en el índice dado ---- */
    function showImage(index, animate) {
        if (index < 0 || index >= _images.length) return;
        _current = index;

        const doAnim = animate !== false && _images.length > 1;

        if (doAnim) {
            $img.classList.add('transitioning');
            $desc.classList.add('transitioning');
        }

        const applyChange = () => {
            const item = _images[_current];
            $img.src = item.src;
            $img.alt = item.description || _title;
            $desc.textContent = item.description || '';
            if (doAnim) {
                $img.classList.remove('transitioning');
                $desc.classList.remove('transitioning');
            }
            updateControls();
        };

        if (doAnim) {
            setTimeout(applyChange, 200);
        } else {
            applyChange();
        }
    }

    /* ---- Navegar entre imágenes ---- */
    function navigate(dir) {
        const next = _current + dir;
        if (next < 0 || next >= _images.length) return;
        showImage(next);
        updateDots();
    }

    /* ---- Actualizar estado de botones y dots ---- */
    function updateControls() {
        if ($prev) $prev.disabled = (_current === 0);
        if ($next) $next.disabled = (_current === _images.length - 1);
        if ($counter) $counter.textContent = _images.length > 1 ? `${_current + 1} / ${_images.length}` : '';
        updateDots();
    }

    /* ---- Renderizar dots ---- */
    function renderDots() {
        if (!$dots) return;
        if (_images.length <= 1) {
            $dots.innerHTML = '';
            return;
        }
        $dots.innerHTML = _images.map((_, i) =>
            `<button class="dialog-dot${i === _current ? ' active' : ''}" aria-label="Imagen ${i+1}" onclick="PortfolioDialog.goTo(${i}); updateDialogDots()"></button>`
        ).join('');
    }

    function updateDots() {
        if (!$dots) return;
        $dots.querySelectorAll('.dialog-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === _current);
        });
    }

    /* Exponer helper para onclick inline */
    window.updateDialogDots = updateDots;

    /* ---- Keyboard navigation ---- */
    document.addEventListener('keydown', function(e) {
        if (!$dialog || !($dialog.open || $dialog.getAttribute('open') !== null)) return;
        if (e.key === 'ArrowLeft')  navigate(-1);
        if (e.key === 'ArrowRight') navigate(+1);
        if (e.key === 'Escape')     PortfolioDialog.close();
    });

    /* ---- Clic en backdrop para cerrar ---- */
    document.addEventListener('DOMContentLoaded', function() {
        initElements();

        if ($dialog) {
            $dialog.addEventListener('click', function(e) {
                // Cerrar si clic fuera del .dialog-box
                if (e.target === $dialog) PortfolioDialog.close();
            });
        }

        if ($backdrop) {
            $backdrop.addEventListener('click', PortfolioDialog.close);
        }
    });

})();

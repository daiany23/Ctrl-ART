// Funció per validar el format de l'email
// Ha de tenir: nom @ domini . extensió
function emailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ---- VALIDACIÓ REGISTRE ----
const btnRegistre = document.getElementById('btn-registre');

if (btnRegistre) {
    btnRegistre.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm').value;
        const error = document.getElementById('error-registre');

        // Comprovem email
        if (!emailValid(email)) {
            error.textContent = 'El correu electrònic no és vàlid. Ha de tenir el format nom@domini.ext';
            error.style.display = 'block';
            return;
        }

        // Comprovem que les contrasenyes coincideixen
        if (password !== confirm) {
            error.textContent = 'Les contrasenyes no coincideixen.';
            error.style.display = 'block';
            return;
        }

        // Tot correcte
        error.style.display = 'none';
        alert('Registre completat correctament!');
    });
}

// ---- VALIDACIÓ CONTACTE ----
const btnContacte = document.getElementById('btn-contacte');

if (btnContacte) {
    btnContacte.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const error = document.getElementById('error-contacte');

        // Comprovem email
        if (!emailValid(email)) {
            error.textContent = 'El correu electrònic no és vàlid. Ha de tenir el format nom@domini.ext';
            error.style.display = 'block';
            return;
        }

        // Tot correcte
        error.style.display = 'none';
        alert('Missatge enviat correctament!');
    });
}

// ---- MENÚ HAMBURGUESA ----
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ---- LIGHTBOX GALERIA ----
const galleryImages = document.querySelectorAll('.galeria-slider img, .galeria-grid img'); // Selecciona totes les imatges de la galeria
const galleryModal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close-modal');

if (galleryImages.length > 0 && galleryModal && modalImg) {
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer'; // Fem que surti la mà en passar el ratolí
        img.addEventListener('click', () => {
            galleryModal.style.display = 'flex';
            setTimeout(() => galleryModal.classList.add('show'), 10);
            modalImg.src = img.src; // Copiem la ruta de la imatge clicada
            modalImg.alt = img.alt;
        });
    });

    // Tancar la modal quan es fa clic a la X
    closeModal.addEventListener('click', () => {
        galleryModal.classList.remove('show');
        setTimeout(() => galleryModal.style.display = 'none', 300);
    });

    // Tancar fent clic fora de la imatge
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('show');
            setTimeout(() => galleryModal.style.display = 'none', 300);
        }
    });
}

// ---- CARTELL DE BENVINGUDA ----
const welcomeModal = document.getElementById('welcome-modal');
const closeWelcomeBtn = document.getElementById('close-welcome');

if (welcomeModal && closeWelcomeBtn) {
    // Comprovem si ja ha entrat abans
    const hasVisited = localStorage.getItem('visitedCtrlArt');

    if (!hasVisited) {
        // Si no ha entrat mai, la mostrem
        welcomeModal.style.display = 'flex';
    }

    // Quan es clica el botó d'entrar
    closeWelcomeBtn.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        // Guardem a la memòria del navegador que ja ha visitat la web
        localStorage.setItem('visitedCtrlArt', 'true');
    });
}

// ---- JOC DEL BOTÓ DE BENVINGUDA ----
window.addEventListener('DOMContentLoaded', () => {
    const welcomeModal = document.getElementById('welcome-modal');
    const botoTroll = document.getElementById('close-welcome');

    if (welcomeModal && botoTroll) {
        
        // Si en aquesta pestanya ja s'ha guardat que l'usuari ha entrat a la web
        const jaHaEntratASeqüència = sessionStorage.getItem('ctrlArtSessioIniciada');

        if (jaHaEntratASeqüència === 'true') {
            // Si ja està dins de la sessió de navegació, la modal NO s'obre de cap manera
            welcomeModal.style.display = 'none';
            return; // Aturem la resta del codi per a la modal
        } else {
            // Si és la primera vegada absoluta que obre la web a la pestanya, es mostra el joc!
            welcomeModal.style.display = 'flex';
        }

        // --- ELEMENTS DE L'ANIMACIÓ ---
        let iniciJoc = false;
        let jocAcabat = false;
        let animacioId;

        let x, y;
        let vx = 5; 
        let vy = -5; 
        let posicioOriginal;

        function iniciarFuga() {
            iniciJoc = true;

            // Guardem la posició fixa del disseny original on ha de tornar
            const rect = botoTroll.getBoundingClientRect();
            posicioOriginal = { left: rect.left, top: rect.top };

            x = rect.left;
            y = rect.top;
            botoTroll.style.left = x + 'px';
            botoTroll.style.top = y + 'px';

            botoTroll.classList.add('escapant');
            botoTroll.textContent = 'Tortuga :)';

            animacioId = requestAnimationFrame(animarBotoPantalla);

            // El temps que triga a fer tota la ruta de rebot abans de tornar (3.5 segons)
            setTimeout(() => {
                aturarIPrepararEntrada();
            }, 3500);
        }

        function animarBotoPantalla() {
            x += vx;
            y += vy;

            const amplePantalla = window.innerWidth;
            const altPantalla = window.innerHeight;
            const ampleBoto = botoTroll.offsetWidth;
            const altBoto = botoTroll.offsetHeight;

            // Lògica de col·lisió
            if (x <= 0) { x = 0; vx = -vx; }
            else if (x >= amplePantalla - ampleBoto) { x = amplePantalla - ampleBoto; vx = -vx; }

            if (y <= 0) { y = 0; vy = -vy; }
            else if (y >= altPantalla - altBoto) { y = altPantalla - altBoto; vy = -vy; }

            botoTroll.style.left = x + 'px';
            botoTroll.style.top = y + 'px';

            animacioId = requestAnimationFrame(animarBotoPantalla);
        }

        function aturarIPrepararEntrada() {
            cancelAnimationFrame(animacioId);
            jocAcabat = true;

            // El botó aterra automàticament al lloc exacte on estava centrat amb la teva tipografia
            botoTroll.classList.remove('escapant');
            botoTroll.style.left = '';
            botoTroll.style.top = '';
            
            botoTroll.textContent = 'Entrar al Festival';
            botoTroll.style.backgroundColor = '#95FFA5';
        }

        // --- INTERACCIONS ---
        const activarTrampa = (e) => {
            if (!iniciJoc && !jocAcabat) {
                e.preventDefault();
                iniciarFuga();
            }
        };

        botoTroll.addEventListener('mouseover', activarTrampa);
        
        botoTroll.addEventListener('click', (e) => {
            if (!iniciJoc && !jocAcabat) {
                e.preventDefault();
                iniciarFuga();
            } else if (jocAcabat) {
                
                // Registrem que ja hem passat la benvinguda en aquesta pestanya
                sessionStorage.setItem('ctrlArtSessioIniciada', 'true');

                // Tancament fluid
                welcomeModal.style.transform = 'scale(0.9)';
                welcomeModal.style.opacity = '0';
                welcomeModal.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    welcomeModal.style.display = 'none';
                }, 400);
            }
        });
    }
});
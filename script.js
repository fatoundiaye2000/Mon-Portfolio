// ─── LOADER ───
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; }, 500);
});

// ─── MODE SOMBRE ───
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.querySelector('i').classList.toggle('fa-moon');
    darkModeToggle.querySelector('i').classList.toggle('fa-sun');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.remove('fa-moon');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
}

// ─── NAVIGATION SCROLL ───
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const burger = document.querySelector('.burger');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Navbar fond
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Lien actif
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ─── BURGER MENU ───
burger.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// ─── SMOOTH SCROLLING ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── MODALS PARCOURS ───
document.querySelectorAll('.parcours-img-box').forEach(box => {
    box.addEventListener('click', function() {
        const descId = this.getAttribute('data-desc');
        document.getElementById(descId).classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.parcours-modal').classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', function(event) {
    document.querySelectorAll('.parcours-modal').forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ─── ANIMATION CARDS (Intersection Observer) ───
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(
                '.parcours-card, .competence-card, .contact-card, .cv-card, .bts-card'
            );
            cards.forEach((card, i) => {
                setTimeout(() => card.classList.add('animate'), i * 100);
            });
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => cardObserver.observe(section));

// ─── ANIMATION VEILLE ───
const veilleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.veille-section').forEach((s, i) => {
                setTimeout(() => {
                    s.style.opacity = '1';
                    s.style.transform = 'translateY(0)';
                }, i * 150);
            });
            veilleObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const veilleSection = document.getElementById('veille-technologique');
if (veilleSection) {
    veilleSection.querySelectorAll('.veille-section').forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    veilleObserver.observe(veilleSection);
}

// ─── ANIMATION STATS (compteur) ───
function animateValue(element, start, end, duration) {
    const text = element.textContent;
    const numMatch = text.match(/[\d,\.]+/);
    if (!numMatch) return;

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = text.replace(numMatch[0], value.toLocaleString('fr-FR'));
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numText = entry.target.textContent.replace(/\s/g, '').replace(',', '.');
            const num = parseFloat(numText);
            if (!isNaN(num) && num > 0 && num < 100000) {
                animateValue(entry.target, 0, Math.floor(num), 1200);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .result-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ─── ANIMATION SKILL METERS ───
function animateSkills(container) {
    container.querySelectorAll('.skill-meter').forEach(meter => {
        const level = meter.getAttribute('data-level');
        setTimeout(() => {
            meter.style.width = level + '%';
        }, 300);
    });
}

// ─── BOUTONS PROJETS & BTS — GESTION UNIFIÉE ───
// C'est ici que le bug du bouton mobile était : double DOMContentLoaded
// et mauvaise sélection du contenu. Désormais un seul gestionnaire.
document.addEventListener('DOMContentLoaded', function() {

    // ── Projets et BTS : ouvrir/fermer les contenus ──
    document.querySelectorAll('.projet-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const projetId = this.getAttribute('data-projet');
            const targetContent = document.getElementById(projetId + '-content');

            if (!targetContent) return; // sécurité

            const isAlreadyOpen = targetContent.classList.contains('active');

            // Fermer TOUS les contenus
            document.querySelectorAll('.projet-content').forEach(c => {
                c.classList.remove('active');
            });
            // Désactiver TOUS les boutons
            document.querySelectorAll('.projet-btn').forEach(b => {
                b.classList.remove('active');
            });

            // Si ce n'était pas déjà ouvert → ouvrir
            if (!isAlreadyOpen) {
                targetContent.classList.add('active');
                this.classList.add('active');

                // Animer les skill meters à l'intérieur
                setTimeout(() => animateSkills(targetContent), 400);

                // Highlight.js si disponible
                if (typeof hljs !== 'undefined') {
                    setTimeout(() => hljs.highlightAll(), 300);
                }
            }
        });
    });

    // ── Onglets de code ──
    document.querySelectorAll('.code-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parent = this.closest('.code-examples') || this.closest('.code-example');
            if (!parent) return;

            parent.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const target = parent.querySelector('#' + tabId);
            if (target) {
                target.classList.add('active');
                if (typeof hljs !== 'undefined') {
                    setTimeout(() => hljs.highlightAll(), 100);
                }
            }
        });
    });

    // ── Initialiser Highlight.js ──
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // ── Ouvrir le premier projet de chaque grille par défaut ──
    // (Stage 1 et SLAM sont déjà marqués active dans le HTML,
    //  on lance juste les skill meters pour eux)
    document.querySelectorAll('.projet-content.active').forEach(content => {
        setTimeout(() => animateSkills(content), 800);
    });

});

// ─── RESIZE ───
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-links').classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});
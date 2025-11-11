// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Mode Sombre
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.querySelector('i').classList.toggle('fa-sun');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
}

// Navigation
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const burger = document.querySelector('.burger');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(30, 30, 44, 0.9)';
    } else {
        navbar.style.background = 'transparent';
    }

    // Active link
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

// Burger Menu
burger.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Animation Sections
function animateOnScroll() {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (scrollPosition > sectionTop + sectionHeight / 2) {
            const cards = section.querySelectorAll('.parcours-card');
            cards.forEach(card => {
                card.classList.add('animate');
            });
        }
    });
}

// Gestion des Modals Parcours
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

// Animation des cartes de compétences
function animateCompetences() {
    const competencesSection = document.getElementById('competences');
    const competencesCards = document.querySelectorAll('.competence-card');
    const screenPosition = window.innerHeight / 1.2;
    
    if (competencesSection.getBoundingClientRect().top < screenPosition) {
        competencesCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        });
    }
}




// Animation Projet Stage
// Gestion des projets côte à côte
document.addEventListener('DOMContentLoaded', function() {
    // Boutons des projets
    const projetBtns = document.querySelectorAll('.projet-btn');
    
    projetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projetId = this.getAttribute('data-projet');
            const content = document.getElementById(projetId + '-content');
            
            // Fermer tous les contenus
            document.querySelectorAll('.projet-content').forEach(c => {
                c.classList.remove('active');
            });
            
            // Désactiver tous les boutons
            document.querySelectorAll('.projet-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Ouvrir le contenu sélectionné
            if (content) {
                content.classList.add('active');
                this.classList.add('active');
                
                // Animation des compétences si c'est le projet académique
                if (projetId === 'academique') {
                    setTimeout(() => {
                        animateSkills();
                    }, 500);
                }
                
                // Highlight.js pour la coloration syntaxique
                if (typeof hljs !== 'undefined') {
                    setTimeout(() => {
                        hljs.highlightAll();
                    }, 300);
                }
            }
        });
    });
    
    // Onglets de code dans les deux projets
    const codeTabs = document.querySelectorAll('.code-tab');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parent = this.closest('.code-examples') || this.closest('.code-example');
            
            if (parent) {
                // Désactiver tous les onglets et contenus dans cette section
                parent.querySelectorAll('.code-tab').forEach(t => {
                    t.classList.remove('active');
                });
                parent.querySelectorAll('.code-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Activer l'onglet sélectionné
                this.classList.add('active');
                const targetContent = parent.querySelector('#' + tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Re-highlight le code
                    if (typeof hljs !== 'undefined') {
                        setTimeout(() => {
                            hljs.highlightAll();
                        }, 100);
                    }
                }
            }
        });
    });
    
    // Animation des compétences
    function animateSkills() {
        const skillMeters = document.querySelectorAll('.skill-meter');
        
        skillMeters.forEach(meter => {
            const level = meter.getAttribute('data-level');
            setTimeout(() => {
                meter.style.width = level + '%';
                meter.style.opacity = '1';
            }, 300);
        });
    }
    
    // Initialisation Highlight.js
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
    
    // Animation initiale des compétences si le projet académique est actif
    const academiqueContent = document.getElementById('academique-content');
    if (academiqueContent && academiqueContent.classList.contains('active')) {
        setTimeout(() => {
            animateSkills();
        }, 1000);
    }
});






// Animation BTS SIO
// Le MÊME code JavaScript que pour la section projets fonctionne parfaitement
// Pas besoin de modification

document.addEventListener('DOMContentLoaded', function() {
    // Boutons des options BTS
    const projetBtns = document.querySelectorAll('.projet-btn');
    
    projetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projetId = this.getAttribute('data-projet');
            const content = document.getElementById(projetId + '-content');
            
            // Fermer tous les contenus
            document.querySelectorAll('.projet-content').forEach(c => {
                c.classList.remove('active');
            });
            
            // Désactiver tous les boutons
            document.querySelectorAll('.projet-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Ouvrir le contenu sélectionné
            if (content) {
                content.classList.add('active');
                this.classList.add('active');
                
                // Highlight.js pour la coloration syntaxique
                if (typeof hljs !== 'undefined') {
                    setTimeout(() => {
                        hljs.highlightAll();
                    }, 300);
                }
            }
        });
    });
    
    // Gestion des onglets de code (si vous en ajoutez)
    const codeTabs = document.querySelectorAll('.code-tab');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parent = this.closest('.code-examples') || this.closest('.code-example');
            
            if (parent) {
                // Désactiver tous les onglets et contenus dans cette section
                parent.querySelectorAll('.code-tab').forEach(t => {
                    t.classList.remove('active');
                });
                parent.querySelectorAll('.code-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Activer l'onglet sélectionné
                this.classList.add('active');
                const targetContent = parent.querySelector('#' + tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    });
});




// Animation Veille Technologique
// Animation pour la section veille technologique
function animateVeilleSection() {
    const veilleSection = document.getElementById('veille-technologique');
    const sections = document.querySelectorAll('.veille-section');
    const screenPosition = window.innerHeight / 1.3;
    
    if (veilleSection.getBoundingClientRect().top < screenPosition) {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Initialiser les animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.veille-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateVeilleSection);
});





// Animation Contact
function animateContact() {
    const contactSection = document.getElementById('contact');
    const contactCards = document.querySelectorAll('.contact-card, .cv-card');
    const screenPosition = window.innerHeight / 1.3;
    
    if (contactSection && contactSection.getBoundingClientRect().top < screenPosition) {
        contactCards.forEach(card => {
            card.classList.add('animate');
        });
    }
}



// Initialiser toutes les animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le style pour l'animation
    const contactCards = document.querySelectorAll('.contact-card, .cv-card');
    contactCards.forEach(card => {
        card.style.transition = 'all 0.6s ease';
    });
    
    // Observer pour l'animation au scroll
    window.addEventListener('scroll', animateContact);
    
    // Déclencher une première vérification
    animateContact();
});

// Alternative avec Intersection Observer (plus moderne)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.contact-card, .cv-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        observer.observe(contactSection);
    }
}

// Appeler cette fonction aussi
document.addEventListener('DOMContentLoaded', initScrollAnimations);







// Animation des projets
function animateProjets() {
    const projetsSection = document.getElementById('projets');
    const projetCards = document.querySelectorAll('.projet-card');
    const screenPosition = window.innerHeight / 1.3;
    
    if (projetsSection.getBoundingClientRect().top < screenPosition) {
        projetCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 150);
        });
    }
}

// Initialisation générale
window.addEventListener('load', () => {
    // Initial styles for animations
    const parts = document.querySelectorAll('.dissertation-part, .references-section');
    parts.forEach(part => {
        part.style.opacity = '0';
        part.style.transform = 'translateY(30px)';
        part.style.transition = 'all 0.5s ease';
    });

    // Lancer toutes les animations
    animateOnScroll();
    animateCompetences();
    animateBts();
    animateDissertation();
    animateContact();
    animateProjets();
});

// Écouteurs de défilement
window.addEventListener('scroll', () => {
    animateOnScroll();
    animateCompetences();
    animateBts();
    animateDissertation();
    animateContact();
    animateProjets();
});

// Fermeture des modals en cliquant à l'extérieur
document.addEventListener('click', function(event) {
    // Fermer les modals de parcours
    document.querySelectorAll('.parcours-modal').forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fermer les modals BTS
    document.querySelectorAll('.bts-modal').forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation des valeurs numériques (pour les statistiques)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer pour les animations des statistiques
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const finalValue = parseInt(element.textContent);
            animateValue(element, 0, finalValue, 1000);
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

// Observer pour les éléments avec des données numériques
document.querySelectorAll('.stat-number, .result-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Gestion responsive du menu
function handleResize() {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-links').classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

window.addEventListener('resize', handleResize);

// Tooltip pour les sources
document.querySelectorAll('.source-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
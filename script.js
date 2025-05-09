// Smooth scrolling for navigation
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Add fade-in-up animation to elements when they become visible
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Inicialización de GSAP
gsap.registerPlugin(ScrollTrigger);

// Animaciones al cargar la página
gsap.from('.hero-content', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

// Animaciones al hacer scroll
gsap.utils.toArray('.glass-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
});

// Efecto parallax en las formas decorativas
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach(shape => {
        const speed = shape.classList.contains('shape-1') ? 20 : 40;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

// Efecto de scroll en navbar
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determina la dirección del scroll
    if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
        // Scroll hacia abajo - ocultar navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba - mostrar navbar
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Animación de los iconos de habilidades
const skillIcons = document.querySelectorAll('.skill-card i');
skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            rotate: 360,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
});

// Función para copiar el email
function copyEmail() {
    const emailText = document.getElementById('emailText').textContent;
    navigator.clipboard.writeText(emailText)
        .then(() => {
            const alert = document.getElementById('copyAlert');
            alert.classList.add('show');
            setTimeout(() => {
                alert.classList.remove('show');
            }, 2000);
        })
        .catch(err => {
            console.error('Error al copiar el email:', err);
        });
}

// Función para copiar el teléfono
function copyPhone() {
    const phoneText = document.getElementById('phoneText').textContent;
    navigator.clipboard.writeText(phoneText)
        .then(() => {
            const alert = document.getElementById('copyAlert');
            alert.classList.add('show');
            setTimeout(() => {
                alert.classList.remove('show');
            }, 2000);
        })
        .catch(err => {
            console.error('Error al copiar el teléfono:', err);
        });
}

// Animación de los elementos de la timeline al hacer scroll
const observerTimeline = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    observerTimeline.observe(item);
});

// Animaciones al hacer scroll (unificadas)
const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, { threshold: 0.1 });

// Observar elementos con animación
document.querySelectorAll('[data-aos], .animate-on-scroll, .timeline-item').forEach(element => {
    observerScroll.observe(element);
});
// Navegación suave unificada
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        const navHeight = navbar.offsetHeight;
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.pageYOffset - navHeight,
            behavior: 'smooth'
        });
    });
});

// Inicialización de partículas en el fondo
document.addEventListener("DOMContentLoaded", function() {
    particlesJS("backgroundCanvas", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out"
            }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        }
    });

    gsap.from(".hero-section h1", { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
    gsap.from(".hero-section p", { opacity: 0, y: 50, duration: 1, ease: "power3.out", delay: 0.5 });
    gsap.from(".btn-glow", { opacity: 0, scale: 0.8, duration: 0.8, ease: "back.out(1.7)", stagger: 0.2 });
});
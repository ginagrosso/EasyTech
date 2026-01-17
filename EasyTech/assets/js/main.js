// ============================================
// EasyTech - JavaScript Principal
// ============================================

// ========================================
// Smooth Cursor Trail con Gradient Particles (Equilibrado)
// ========================================
(function() {
    // Solo en escritorio
    if (window.innerWidth <= 968) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 5; // Punto medio
    
    let mouse = {
        x: 0,
        y: 0
    };
    
    // Partícula con gradiente equilibrado
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.targetX = x;
            this.targetY = y;
            this.size = Math.random() * 5 + 5; // Círculos: 5-10px
            this.opacity = 0.7; // Opacidad media
            this.ease = 0.18;
        }
        
        update() {
            // Suavizado de movimiento (easing)
            this.x += (this.targetX - this.x) * this.ease;
            this.y += (this.targetY - this.y) * this.ease;
            
            // Reducir opacidad gradualmente
            this.opacity *= 0.94;
            this.size *= 0.97;
        }
        
        draw() {
            // Crear gradiente radial violeta-cian equilibrado
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size
            );
            
            gradient.addColorStop(0, `rgba(176, 38, 255, ${this.opacity * 0.5})`); // Violeta
            gradient.addColorStop(0.5, `rgba(108, 132, 255, ${this.opacity * 0.4})`); // Mezcla
            gradient.addColorStop(1, `rgba(0, 217, 255, ${this.opacity * 0.3})`); // Cian
            
            ctx.save();
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(176, 38, 255, ${this.opacity * 0.3})`;
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Seguir movimiento del mouse
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Agregar partículas
    function addParticle() {
        if (particles.length < particleCount) {
            particles.push(new Particle(mouse.x, mouse.y));
        } else {
            particles.shift();
            particles.push(new Particle(mouse.x, mouse.y));
        }
        
        // Actualizar target de partículas existentes
        particles.forEach((particle, index) => {
            if (index < particles.length - 1) {
                particle.targetX = particles[index + 1].x;
                particle.targetY = particles[index + 1].y;
            } else {
                particle.targetX = mouse.x;
                particle.targetY = mouse.y;
            }
        });
    }
    
    // Animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar y dibujar partículas
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            // Remover partículas muy pequeñas o transparentes
            if (particles[i].opacity < 0.01 || particles[i].size < 0.8) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Agregar partículas con frecuencia equilibrada
    setInterval(addParticle, 65);
    
    // Ajustar canvas al redimensionar ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    animate();
})();

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Navegación
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Efecto de scroll en el navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Alternar menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animar menú hamburguesa
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translateY(8px)' 
                : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translateY(-8px)' 
                : 'none';
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ========================================
    // Animaciones de Scroll
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Agregar efecto escalonado para elementos de la cuadrícula
                if (entry.target.classList.contains('service-card') ||
                    entry.target.classList.contains('process-step') ||
                    entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentElement.children)
                        .indexOf(entry.target) * 0.1;
                    entry.target.style.transitionDelay = `${delay}s`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos animados
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-in, .service-card, .process-step, .feature-card, ' +
        '.about-card, .team-member, .benefit-item, .tech-item, .faq-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // ========================================
    // Animación de Contador de Estadísticas
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000; // 2 segundos
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        entry.target.textContent = Math.floor(current);
                    }, duration / steps);
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    // ========================================
    // Desplazamiento Suave
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Validación y Mejora de Formulario
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Agregar efectos de enfoque
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateX(5px)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateX(0)';
            });
        });
        
        // Envío del formulario
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Re-habilitar después de que el formulario se procese (manejado por Django)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // ========================================
    // Efecto Parallax para Hero
    // ========================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-background');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // ========================================
    // Fondo con Gradiente Dinámico
    // ========================================
    const createGradientAnimation = () => {
        const sections = document.querySelectorAll('.section-dark, .cta-section');
        
        sections.forEach(section => {
            section.addEventListener('mousemove', function(e) {
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const percentX = (x - centerX) / centerX;
                const percentY = (y - centerY) / centerY;
                
                section.style.background = `
                    radial-gradient(
                        circle at ${50 + percentX * 20}% ${50 + percentY * 20}%,
                        rgba(176, 38, 255, 0.15),
                        rgba(0, 217, 255, 0.15),
                        transparent
                    ),
                    var(--darker-bg)
                `;
            });
            
            section.addEventListener('mouseleave', function() {
                section.style.background = '';
            });
        });
    };
    
    // Solo en escritorio
    if (window.innerWidth > 968) {
        createGradientAnimation();
    }
    
    // ========================================
    // Efecto de Inclinación de Tarjetas (3D)
    // ========================================
    const cards = document.querySelectorAll('.service-card, .feature-card, .about-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 968) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-10px)
                `;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
    
    // ========================================
    // Indicador de Progreso de Scroll
    // ========================================
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #b026ff, #00d9ff);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    createScrollProgress();
    
    // ========================================
    // Efecto de Escritura para Hero (si es necesario)
    // ========================================
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    }
    
    // ========================================
    // Pantalla de Carga (Opcional)
    // ========================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ========================================
    // Mensaje de Bienvenida en Consola
    // ========================================
    console.log(
        '%cEasyTech - Desarrollo de Software',
        'color: #b026ff; font-size: 20px; font-weight: bold;'
    );
    console.log(
        '%c¿Buscas desarrolladores? ¡Contáctanos!',
        'color: #00d9ff; font-size: 14px;'
    );
    console.log('%cinfo@easytech.com', 'color: #a8b2d1; font-size: 12px;');
});

// ========================================
// Funciones de Utilidad
// ========================================

// Función debounce para rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Verificar si el elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

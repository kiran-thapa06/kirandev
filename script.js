// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initLoader();
    initNavbar();
    initScrollAnimations();
    initSmoothScroll();
    initParallaxEffects();
    initTypingEffect();
    initCodingAnimation();
});

// Loading Screen
function initLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// Navbar Functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
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
}

// Smooth Scrolling
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-item');
    const buttons = document.querySelectorAll('a[href^="#"]');
    
    [...navLinks, ...buttons].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Staggered animations for different sections
                if (entry.target.classList.contains('timeline-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
                
                if (entry.target.classList.contains('experience-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.experience-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }

                if (entry.target.classList.contains('language-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.language-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }

                if (entry.target.classList.contains('skill-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.skill-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 80);
                    });
                }

                if (entry.target.classList.contains('service-item')) {
                    const items = entry.target.parentElement.querySelectorAll('.service-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animateElements = document.querySelectorAll(
        '.timeline-item, .experience-card, .language-item, .skill-item, .service-item, .video-card'
    );
    animateElements.forEach(el => observer.observe(el));
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for floating elements
        const floatingElements = document.querySelectorAll('.hero::after');
        floatingElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });

        // Parallax for coding illustration
        const codingIllustration = document.querySelector('.coding-illustration');
        if (codingIllustration) {
            const rect = codingIllustration.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const translateY = (window.innerHeight - rect.top) * 0.1;
                codingIllustration.style.transform = `translateY(${translateY}px)`;
            }
        }
    }, 10));
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;

    const originalText = heroName.textContent;
    heroName.textContent = '';
    heroName.style.opacity = '1';
    
    let i = 0;
    const typeSpeed = 120;
    
    setTimeout(() => {
        function typeWriter() {
            if (i < originalText.length) {
                heroName.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Add cursor blink effect
                heroName.style.borderRight = '2px solid #64ffda';
                heroName.style.animation = 'blink 1s infinite';
                setTimeout(() => {
                    heroName.style.borderRight = 'none';
                    heroName.style.animation = 'none';
                }, 3000);
            }
        }
        typeWriter();
    }, 2000);
}

// Coding Animation
function initCodingAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    if (codeLines.length > 0) {
        setInterval(() => {
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.animationDelay = `${index * 0.2}s`;
                }, index * 100);
            });
        }, 3000);
    }

    // Animate the person coding
    const person = document.querySelector('.person');
    if (person) {
        setInterval(() => {
            person.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                person.style.transform = 'translateY(0)';
            }, 200);
        }, 2000);
    }
}

// Enhanced Intersection Observer
const createAdvancedObserver = (selector, callback, options = {}) => {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target, entry);
                if (options.once !== false) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
    });

    elements.forEach(el => observer.observe(el));
    return observer;
};

// Skill icons hover effect
document.addEventListener('DOMContentLoaded', function() {
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Performance optimization - Debounce function
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

// Custom cursor trail effect
function initCursorTrail() {
    let trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Clean up existing trail dots
        document.querySelectorAll('.cursor-trail').forEach(dot => dot.remove());
        
        // Create new trail dots
        trail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: ${(index + 1) * 2}px;
                height: ${(index + 1) * 2}px;
                background: rgba(100, 255, 218, ${0.8 - (index * 0.08)});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            `;
            document.body.appendChild(dot);
            
            // Remove dot after animation
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.parentNode.removeChild(dot);
                }
            }, 300);
        });
    });
}

// Initialize cursor trail on larger screens
if (window.innerWidth > 768) {
    initCursorTrail();
}

// Smooth reveal animations for text elements
function initTextAnimations() {
    const textElements = document.querySelectorAll('.hero-greeting, .hero-role, .about-text, .portfolio-subtitle');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease';
        textObserver.observe(el);
    });
}

// Initialize text animations
document.addEventListener('DOMContentLoaded', initTextAnimations);

// Add blink animation for typing cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #64ffda; }
        51%, 100% { border-color: transparent; }
    }
`;
document.head.appendChild(style);

// Navbar Functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
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
}

// Smooth Scrolling
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const buttons = document.querySelectorAll('a[href^="#"]');
    
    [...navLinks, ...buttons].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for experience cards
                if (entry.target.classList.contains('experience-card')) {
                    const cards = document.querySelectorAll('.experience-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
                
                // Add staggered animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const items = document.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 300);
                    });
                }

                // Add staggered animation for video cards
                if (entry.target.classList.contains('video-card')) {
                    const cards = document.querySelectorAll('.video-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .experience-card, .video-card');
    animateElements.forEach(el => observer.observe(el));

    // Simple AOS-like functionality
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => observer.observe(el));
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const titleMain = document.querySelector('.title-main');
    if (!titleMain) return;

    const originalText = titleMain.textContent;
    titleMain.textContent = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    setTimeout(() => {
        function typeWriter() {
            if (i < originalText.length) {
                titleMain.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        typeWriter();
    }, 1500); // Start after other animations
}

// Intersection Observer for Advanced Animations
const createObserver = (selector, animationClass, options = {}) => {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                if (options.once !== false) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
    });

    elements.forEach(el => observer.observe(el));
};

// Initialize advanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create observers for different elements
    createObserver('[data-aos="fade-up"]', 'aos-animate');
    createObserver('[data-aos="zoom-in"]', 'aos-animate');
    createObserver('[data-aos="fade-left"]', 'aos-animate');
    createObserver('[data-aos="fade-right"]', 'aos-animate');
});

// Skill bars animation (if you want to add skill percentage bars later)
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 500);
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 200;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 1);
    });
}

// Mouse cursor effect (optional enhancement)
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    const hoverElements = document.querySelectorAll('a, button, .card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Particles effect for hero section (optional)
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const hero = document.querySelector('.hero');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    hero.appendChild(canvas);
    
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    });
}

// Form validation (if you add a contact form later)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Submit form or show success message
                showNotification('Message sent successfully!', 'success');
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme toggle (if you want to add dark mode)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Performance optimization - Debounce scroll events
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

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(function() {
    // Scroll-dependent functions here
}, 10));

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/your-image.jpg'
        // Add other critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element with selector "${selector}" not found`);
    }
    return element;
}


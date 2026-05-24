/* ========== MOBILE MENU FUNCTIONALITY ========== */
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

/* ========== SMOOTH SCROLL WITH NAVBAR OFFSET ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========== BUTTON EVENT LISTENERS ========== */

// "Voir les produits" button - scroll to products section
const btnProduits = document.getElementById('btnProduits');
if (btnProduits) {
    btnProduits.addEventListener('click', function() {
        const produitSection = document.getElementById('produits');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = produitSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}

// "Rejoindre le Live" button - open Facebook group in new tab
const btnLive = document.getElementById('btnLive');
if (btnLive) {
    btnLive.addEventListener('click', function() {
        window.open('https://www.facebook.com/share/g/18YTkXrkvB/', '_blank');
    });
}

/* ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ========== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation to save performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in-section class
document.querySelectorAll('.fade-in-section').forEach(element => {
    observer.observe(element);
});

/* ========== NAVBAR SCROLL EFFECT (Optional Enhancement) ========== */
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add subtle shadow on scroll
    if (scrollTop > 0) {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* ========== RESPONSIVE IMAGE OPTIMIZATION ========== */
// Load images lazily if supported
if ('IntersectionObserver' in window) {
    const imageElements = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    imageElements.forEach(img => imageObserver.observe(img));
}

/* ========== ACCESSIBILITY ENHANCEMENTS ========== */
// Add keyboard navigation support for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.click();
        }
    });
});

/* ========== PERFORMANCE: Debounce resize events ========== */
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

// Handle resize events efficiently
window.addEventListener('resize', debounce(function() {
    // Recalculate navbar offset for smooth scroll if needed
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
}, 250));

console.log('Le bazar de Nobsy - Site chargé avec succès! 🎉');

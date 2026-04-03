// Main JavaScript for NPL Express

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Form validation enhancement
const form = document.getElementById('devis-form');
if (form) {
    form.addEventListener('submit', function(e) {
        // Basic validation
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                field.style.borderColor = 'rgba(148,163,184,.25)';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
const burger = document.getElementById('burger');
const nav = document.querySelector('nav ul');

if (burger && nav) {
    burger.addEventListener('click', () => {
        const isVisible = nav.style.display === 'flex';
        nav.style.display = isVisible ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '14px';
        nav.style.position = 'absolute';
        nav.style.top = '64px';
        nav.style.right = '20px';
        nav.style.background = 'rgba(10,15,26,.97)';
        nav.style.border = '1px solid rgba(148,163,184,.25)';
        nav.style.borderRadius = '12px';
        nav.style.padding = '14px';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !nav.contains(e.target) && window.innerWidth < 860) {
            nav.style.display = 'none';
        }
    });
}
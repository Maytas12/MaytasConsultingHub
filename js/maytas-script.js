// MaytasConsultingHub JavaScript

// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 0,
    delay: 0,
    easing: 'ease-in-out',
});

// Refresh AOS on window load to ensure animations trigger
window.addEventListener('load', function() {
    AOS.refresh();
});

// Refresh AOS on scroll to ensure animations trigger
window.addEventListener('scroll', function() {
    AOS.refresh();
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.maytas-navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animated counters
function maytasAnimateCounters() {
    const counters = document.querySelectorAll('.maytas-counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', ''); // Remove any existing + for calculation
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + (counter.hasAttribute('data-plus') ? '+' : '');
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (counter.hasAttribute('data-plus') ? '+' : '');
            }
        };
        updateCount();
    });
}

// Trigger counter animation when hero section is in view
const heroSection = document.querySelector('.maytas-hero-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            maytasAnimateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (heroSection) {
    observer.observe(heroSection);
}

// Testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.maytas-testimonial-item');

function maytasShowTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

function maytasNextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    maytasShowTestimonial(currentTestimonial);
}

// Auto-rotate testimonials every 5 seconds
setInterval(maytasNextTestimonial, 5000);

// Contact form validation and submission
const contactForm = document.getElementById('maytas-contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !mobile || !message) {
            alert('Please fill in all fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!/^\d{10}$/.test(mobile.replace(/\s+/g, ''))) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        // Simulate form submission (replace with actual submission logic)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll to top button
const scrollToTopBtn = document.getElementById('maytas-scroll-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Gallery filter functionality
const maytasFilterButtons = document.querySelectorAll('.maytas-filter-btn');
const maytasGalleryItems = document.querySelectorAll('.maytas-gallery-item');

maytasFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        maytasFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        maytasGalleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Gallery modal functionality (enhanced)
document.querySelectorAll('.maytas-gallery-card img').forEach(img => {
    img.addEventListener('click', function() {
        // Create an enhanced modal
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '2000';
        modal.style.cursor = 'pointer';
        modal.style.animation = 'fadeIn 0.3s ease-out';

        const modalContent = document.createElement('div');
        modalContent.style.position = 'relative';
        modalContent.style.maxWidth = '90%';
        modalContent.style.maxHeight = '90%';

        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.style.maxWidth = '100%';
        modalImg.style.maxHeight = '100%';
        modalImg.style.borderRadius = '10px';
        modalImg.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '-15px';
        closeBtn.style.right = '-15px';
        closeBtn.style.backgroundColor = 'var(--maytas-primary)';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.width = '30px';
        closeBtn.style.height = '30px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.display = 'flex';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.justifyContent = 'center';

        modalContent.appendChild(modalImg);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        };

        modal.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    });
});

// Cartoon Animation Triggers
function maytasTriggerCartoonAnimations() {
    // Add floating animation to service icons
    const serviceIcons = document.querySelectorAll('.maytas-service-card i');
    serviceIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('maytas-float');
        }, index * 200);
    });

    // Add bounce animation to buttons on hover
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('maytas-hover-bounce');
    });

    // Add wiggle animation to gallery overlays on hover
    const galleryOverlays = document.querySelectorAll('.maytas-overlay');
    galleryOverlays.forEach(overlay => {
        overlay.addEventListener('mouseenter', () => {
            overlay.classList.add('maytas-wiggle');
        });
        overlay.addEventListener('mouseleave', () => {
            overlay.classList.remove('maytas-wiggle');
        });
    });

    // Add pulse animation to counters when they finish counting
    const counters = document.querySelectorAll('.maytas-counter');
    counters.forEach(counter => {
        const observer = new MutationObserver(() => {
            if (counter.textContent !== '0') {
                counter.classList.add('maytas-pulse');
                setTimeout(() => {
                    counter.classList.remove('maytas-pulse');
                }, 2000);
            }
        });
        observer.observe(counter, { childList: true });
    });

    // Add heartbeat animation to testimonial stars
    const testimonialStars = document.querySelectorAll('.stars');
    testimonialStars.forEach(stars => {
        stars.classList.add('maytas-heartbeat');
    });

    // Add swing animation to navbar brand on hover
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.classList.add('maytas-hover-swing');
    }

    // Add tada animation to filter buttons when clicked
    const filterButtons = document.querySelectorAll('.maytas-filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('maytas-tada');
            setTimeout(() => {
                button.classList.remove('maytas-tada');
            }, 1500);
        });
    });

    // Add rubber band animation to form submit button on hover
    const submitButton = document.querySelector('#maytas-contact-form .btn');
    if (submitButton) {
        submitButton.classList.add('maytas-hover-rubber-band');
    }

    // Add jello animation to scroll to top button on hover
    const scrollToTopBtn = document.getElementById('maytas-scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.classList.add('maytas-hover-jello');
    }
}

// Trigger cartoon animations on page load
window.addEventListener('load', function() {
    setTimeout(maytasTriggerCartoonAnimations, 1000); // Delay to ensure elements are loaded
});

// Trigger animations when elements come into view
function maytasTriggerOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Add random cartoon animation to service cards
                if (element.classList.contains('maytas-service-card')) {
                    const animations = ['maytas-bounce', 'maytas-wiggle', 'maytas-pulse'];
                    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                    element.classList.add(randomAnimation);
                    setTimeout(() => {
                        element.classList.remove(randomAnimation);
                    }, 2000);
                }

                // Add shake animation to testimonial items when they become active
                if (element.classList.contains('maytas-testimonial-item') && element.classList.contains('active')) {
                    element.classList.add('maytas-shake');
                    setTimeout(() => {
                        element.classList.remove('maytas-shake');
                    }, 500);
                }

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.maytas-service-card').forEach(card => {
        observer.observe(card);
    });

    // Observe testimonial items
    document.querySelectorAll('.maytas-testimonial-item').forEach(item => {
        observer.observe(item);
    });
}

// Trigger scroll-based animations
window.addEventListener('scroll', maytasTriggerOnScroll);
window.addEventListener('load', maytasTriggerOnScroll);

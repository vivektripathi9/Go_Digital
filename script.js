// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbarMenu && navbarToggle && 
        !navbarMenu.contains(e.target) && 
        !navbarToggle.contains(e.target) &&
        navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
    }
});

// Premium scroll animations with subtle timing
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -150px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, 100);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// About Section - Rail Layout Scroll Detection
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    const serviceModules = document.querySelectorAll('.service-module');
    const railItems = document.querySelectorAll('.rail-item');
    let currentService = null;
    
    // Function to activate a service
    function activateService(serviceName) {
        if (currentService === serviceName) return;
        
        // Update rail items
        railItems.forEach(item => {
            if (item.dataset.service === serviceName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update service modules
        serviceModules.forEach(module => {
            if (module.dataset.service === serviceName) {
                module.classList.add('active');
            } else {
                module.classList.remove('active');
            }
        });
        
        currentService = serviceName;
    }
    
    // Intersection Observer for scroll detection
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
    };
    
    const moduleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const serviceName = entry.target.dataset.service;
                if (serviceName) {
                    activateService(serviceName);
                }
            }
        });
    }, observerOptions);
    
    // Observe all service modules
    serviceModules.forEach(module => {
        moduleObserver.observe(module);
    });
    
    // Click handlers for rail items
    railItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = item.dataset.service;
            const targetModule = document.querySelector(`#about-${serviceName}`);
            
            if (targetModule) {
                const offsetTop = targetModule.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                activateService(serviceName);
            }
        });
    });
    
    // Initialize first service
    if (serviceModules.length > 0) {
        activateService(serviceModules[0].dataset.service);
    }
}

// Founder Section - Scroll-Driven Name Architecture
const founderSection = document.querySelector('.founder-section');
if (founderSection) {
    const founderSlides = document.querySelectorAll('.founder-slide');
    const impactNumber = document.querySelector('.impact-number');
    let currentSlide = 0;
    let hasCounted = false;
    
    // Function to activate a slide
    function activateSlide(index) {
        if (index < 0 || index >= founderSlides.length) return;
        
        founderSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Handle background color changes
        const slide = founderSlides[index];
        if (slide.classList.contains('founder-impact')) {
            founderSection.classList.add('black-bg');
        } else {
            founderSection.classList.remove('black-bg');
        }
        
        // Trigger count-up animation for impact slide
        if (slide.classList.contains('founder-impact') && !hasCounted && impactNumber) {
            hasCounted = true;
            animateCountUp(impactNumber, 0, 700, 2000);
        }
        
        currentSlide = index;
    }
    
    // Count-up animation
    function animateCountUp(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    // Intersection Observer for scroll detection
    const founderObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
    };
    
    const founderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideIndex = Array.from(founderSlides).indexOf(entry.target);
                if (slideIndex !== -1) {
                    activateSlide(slideIndex);
                }
            }
        });
    }, founderObserverOptions);
    
    // Observe all slides
    founderSlides.forEach(slide => {
        founderObserver.observe(slide);
    });
    
    // Initialize first slide
    if (founderSlides.length > 0) {
        activateSlide(0);
    }
}

// Navbar - always pure black
const navbar = document.querySelector('.navbar');
if (navbar) {
    navbar.style.backgroundColor = '#000000';
}

// Subtle parallax for hero (very minimal)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Projects Section - Masonry Grid Animations
const projectsHeader = document.querySelector('.projects-header');
if (projectsHeader) {
    const headerTitle = projectsHeader.querySelector('.projects-main-title');
    const headerSubline = projectsHeader.querySelector('.projects-subline');
    const headerDescription = projectsHeader.querySelector('.projects-description');
    
    const headerObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (headerTitle) headerTitle.classList.add('animated');
                setTimeout(() => {
                    if (headerSubline) headerSubline.classList.add('animated');
                }, 200);
                setTimeout(() => {
                    if (headerDescription) headerDescription.classList.add('animated');
                }, 400);
            }
        });
    }, headerObserverOptions);
    
    headerObserver.observe(projectsHeader);
}

const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    const projectObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, projectObserverOptions);
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
}

// Strategy Section - Grid Layout Animations
const strategyGridItems = document.querySelectorAll('.strategy-grid-item');
if (strategyGridItems.length > 0) {
    const strategyObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const strategyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, strategyObserverOptions);
    
    strategyGridItems.forEach(item => {
        strategyObserver.observe(item);
    });
}

// Scope Of Work Section - Container Layout Animations
const scopeGridWrapper = document.querySelector('.scope-grid-wrapper');
if (scopeGridWrapper) {
    const scopeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scopeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, scopeObserverOptions);
    
    scopeObserver.observe(scopeGridWrapper);
}

// Contact Section - Anchor + Action Layout Animations
const contactEntry = document.querySelector('.contact-entry');
const contactIdentityContent = document.querySelector('.contact-identity-content');
const contactActionContent = document.querySelector('.contact-action-content');

if (contactEntry) {
    const contactObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === contactEntry) {
                    entry.target.classList.add('animated');
                }
                if (entry.target === contactIdentityContent) {
                    entry.target.classList.add('animated');
                }
                if (entry.target === contactActionContent) {
                    entry.target.classList.add('animated');
                }
            }
        });
    }, contactObserverOptions);
    
    if (contactEntry) contactObserver.observe(contactEntry);
    if (contactIdentityContent) contactObserver.observe(contactIdentityContent);
    if (contactActionContent) contactObserver.observe(contactActionContent);
}

// Sign Up Button Handler - Open Modal
const signUpBtn = document.getElementById('signUpBtn');
const consultationModal = document.getElementById('consultationModal');
const closeModal = document.getElementById('closeModal');
const consultationForm = document.getElementById('consultationForm');

if (signUpBtn && consultationModal) {
    // Open modal
    signUpBtn.addEventListener('click', function(e) {
        e.preventDefault();
        consultationModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            consultationModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking overlay
    const modalOverlay = consultationModal.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            consultationModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && consultationModal.classList.contains('active')) {
            consultationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle form submission
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('client-name').value,
                email: document.getElementById('client-email').value,
                phone: document.getElementById('client-phone').value,
                company: document.getElementById('client-company').value,
                project: document.getElementById('client-project').value,
                message: document.getElementById('client-message').value
            };
            
            // Here you would typically send the data to a server
            console.log('Consultation form submitted:', formData);
            
            // Show success message
            alert('Thank you for your interest. We have received your consultation request and will contact you shortly.');
            
            // Reset form and close modal
            consultationForm.reset();
            consultationModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formData);
        
        // You can add your form submission logic here
        // Example: Send to email service, save to database, etc.
        
        // Show success message (you can customize this)
        alert('Thank you for your message. We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

const expertiseItems = document.querySelectorAll('.expertise-list li');
expertiseItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.03}s`;
});

// Initialize page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Subtle scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 1px;
        background: #FFFFFF;
        z-index: 10000;
        transition: width 0.15s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

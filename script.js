// Hero Video Loading Optimization
const heroVideo = document.getElementById('heroVideo');
const heroLoading = document.querySelector('.hero-loading');

if (heroVideo) {
    // Show video when it can play
    heroVideo.addEventListener('canplaythrough', () => {
        heroVideo.classList.add('loaded');
        if (heroLoading) {
            heroLoading.classList.add('hidden');
        }
    }, { once: true });
    
    // Fallback: Show video after metadata loads
    heroVideo.addEventListener('loadedmetadata', () => {
        setTimeout(() => {
            heroVideo.classList.add('loaded');
            if (heroLoading) {
                heroLoading.classList.add('hidden');
            }
        }, 300);
    }, { once: true });
    
    // Ensure video plays
    heroVideo.addEventListener('loadstart', () => {
        heroVideo.play().catch(() => {
            // Auto-play was prevented, but video will show when loaded
        });
    });
    
    // Force play on user interaction (fallback)
    document.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play().catch(() => {});
        }
    }, { once: true });
}

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
    let isManualScroll = false; // Flag to prevent intersection observer from overriding manual clicks
    
    // Function to activate a service
    function activateService(serviceName, isManual = false) {
        if (currentService === serviceName) return;
        
        if (isManual) {
            isManualScroll = true;
            // Reset flag after scroll completes
            setTimeout(() => {
                isManualScroll = false;
            }, 1000);
        }
        
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
        // Don't update if user manually clicked
        if (isManualScroll) return;
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const serviceName = entry.target.dataset.service;
                if (serviceName && serviceName !== currentService) {
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
                // Calculate scroll position using getBoundingClientRect for accuracy
                const targetRect = targetModule.getBoundingClientRect();
                const navbarHeight = 80; // Adjust based on your navbar height
                const scrollPosition = window.pageYOffset + targetRect.top - navbarHeight;
                
                // Activate immediately before scrolling
                activateService(serviceName, true);
                
                // Scroll to target
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, `#about-${serviceName}`);
            }
        });
    });
    
    // Handle browser back/forward buttons and initial hash
    function handleHashNavigation() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#about-')) {
            const serviceName = hash.replace('#about-', '');
            const targetModule = document.querySelector(`#about-${serviceName}`);
            if (targetModule) {
                const targetRect = targetModule.getBoundingClientRect();
                const navbarHeight = 80;
                const scrollPosition = window.pageYOffset + targetRect.top - navbarHeight;
                
                activateService(serviceName, true);
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    window.addEventListener('popstate', handleHashNavigation);
    
    // Check for hash on page load
    if (window.location.hash && window.location.hash.startsWith('#about-')) {
        handleHashNavigation();
    } else {
        // Initialize first service if no hash
        if (serviceModules.length > 0) {
            activateService(serviceModules[0].dataset.service);
        }
    }
}

// Founder Section - Split Layout Animations
const founderImageWrapper = document.querySelector('.founder-image-wrapper');
const founderTextContent = document.querySelector('.founder-text-content');

if (founderImageWrapper || founderTextContent) {
    const founderObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const founderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, founderObserverOptions);
    
    if (founderImageWrapper) founderObserver.observe(founderImageWrapper);
    if (founderTextContent) founderObserver.observe(founderTextContent);
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

// Strategy Section - Circular Containers Animations
const strategyCircleItems = document.querySelectorAll('.strategy-circle-item');
if (strategyCircleItems.length > 0) {
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
    
    strategyCircleItems.forEach(item => {
        strategyObserver.observe(item);
    });
}

// Scope Of Work Section - Carousel Functionality
const scopeCarouselInner = document.querySelector('.scope-carousel-inner');
const scopeCards = document.querySelectorAll('.scope-card');
const scopePrevBtn = document.querySelector('.scope-carousel-btn-prev');
const scopeNextBtn = document.querySelector('.scope-carousel-btn-next');
const scopeHeader = document.querySelector('.scope-header');

let currentScopeIndex = 0;
const totalCards = scopeCards.length;

// Get card width and gap based on viewport
function getCardDimensions() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 480) {
        return { width: 280, gap: 16 }; // Small mobile
    } else if (viewportWidth <= 768) {
        return { width: 320, gap: 24 }; // Mobile
    } else if (viewportWidth <= 1024) {
        return { width: 350, gap: 28 }; // Tablet
    } else {
        return { width: 380, gap: 32 }; // Desktop
    }
}

// Calculate how many cards can fit in viewport
function getCardsPerView() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) return 1;
    if (viewportWidth <= 1024) return 2;
    return 3;
}

// Update carousel position
function updateScopeCarousel() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    currentScopeIndex = Math.min(currentScopeIndex, maxIndex);
    
    const { width: cardWidth, gap: cardGap } = getCardDimensions();
    const translateX = -(currentScopeIndex * (cardWidth + cardGap));
    if (scopeCarouselInner) {
        scopeCarouselInner.style.transform = `translateX(${translateX}px)`;
    }
    
    // Update button states
    if (scopePrevBtn) {
        scopePrevBtn.disabled = currentScopeIndex === 0;
    }
    if (scopeNextBtn) {
        scopeNextBtn.disabled = currentScopeIndex >= maxIndex;
    }
}

// Navigation handlers
if (scopePrevBtn) {
    scopePrevBtn.addEventListener('click', () => {
        if (currentScopeIndex > 0) {
            currentScopeIndex--;
            updateScopeCarousel();
        }
    });
}

if (scopeNextBtn) {
    scopeNextBtn.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        if (currentScopeIndex < maxIndex) {
            currentScopeIndex++;
            updateScopeCarousel();
        }
    });
}

// Initialize carousel
if (scopeCarouselInner && scopeCards.length > 0) {
    updateScopeCarousel();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateScopeCarousel();
        }, 250);
    });
}

// Scope Section - Scroll Animations
if (scopeHeader) {
    const scopeHeaderObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scopeHeaderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, scopeHeaderObserverOptions);
    
    scopeHeaderObserver.observe(scopeHeader);
}

// Animate scope cards on scroll
if (scopeCards.length > 0) {
    const scopeCardObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scopeCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, scopeCardObserverOptions);
    
    scopeCards.forEach(card => {
        scopeCardObserver.observe(card);
    });
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
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            countryCode: document.getElementById('countryCode').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Contact form submitted:', formData);
        
        // You can add your form submission logic here
        // Example: Send to email service, save to database, etc.
        
        // Show success message (you can customize this)
        alert('Thank you for contacting us. We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Delivered Section - Scroll Animations with Number Count-Up
const deliveredImpactBox = document.querySelector('.delivered-impact-box');
const deliveredValues = document.querySelector('.delivered-values');
const deliveredNumber = document.querySelector('.delivered-number');

if (deliveredImpactBox || deliveredValues) {
    const deliveredObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const deliveredObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger count-up animation for number
                if (entry.target === deliveredImpactBox && deliveredNumber && !deliveredNumber.classList.contains('counted')) {
                    deliveredNumber.classList.add('counted');
                    animateDeliveredCountUp(deliveredNumber, 0, 700, 2000);
                }
            }
        });
    }, deliveredObserverOptions);
    
    if (deliveredImpactBox) deliveredObserver.observe(deliveredImpactBox);
    if (deliveredValues) deliveredObserver.observe(deliveredValues);
}

// Count-up animation for delivered number
function animateDeliveredCountUp(element, start, end, duration) {
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

// Contact Section - Scroll Animations
const contactColumns = document.querySelectorAll('.contact-column');

if (contactColumns.length > 0) {
    const contactObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, contactObserverOptions);
    
    contactColumns.forEach(column => {
        contactObserver.observe(column);
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

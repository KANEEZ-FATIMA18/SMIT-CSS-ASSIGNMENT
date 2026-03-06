// ==================== GSAP REGISTRATION & SAFETY CHECK ====================
const hasGSAP = typeof gsap !== 'undefined';
if (hasGSAP) {
    try {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    } catch (e) {
        console.error("GSAP Plugin registration failed:", e);
    }
}

// ==================== PRELOADER HIDE LOGIC ====================
const hidePreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    if (hasGSAP) {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto'; // Ensure scroll is enabled
            }
        });
    } else {
        preloader.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Faster loading: Hide when window loads OR 3 seconds pass (fallback)
window.addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 3000); // Fail-safe: hide after 3s even if resources are slow

// ==================== CUSTOM CURSOR (Desktop Only) ====================
if (window.innerWidth >= 1024) {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }
}

// ==================== SCROLL PROGRESS BAR ====================
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================== BACK TO TOP BUTTON ====================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        if (hasGSAP) {
            gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power3.inOut" });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ==================== GSAP ANIMATIONS (Only if GSAP Loaded) ====================
if (hasGSAP) {
    try {
        // Hero Section
        gsap.from('.hero-child h2', { y: 50, opacity: 0, duration: 1, delay: 0.5 });
        gsap.from('.hero-child p', { y: 30, opacity: 0, duration: 1, delay: 0.8 });
        gsap.from('.hero-buttons', { y: 30, opacity: 0, duration: 1, delay: 1 });

        // ScrollTrigger Animations
        document.querySelectorAll('section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    } catch (e) {
        console.warn("GSAP Animations failed to initialize:", e);
    }
}

// ==================== TESTIMONIAL SLIDER ====================
const testiSlides = document.querySelectorAll('.testi-slide');
const testiDots = document.querySelectorAll('.pag-dot');

if (testiSlides.length > 0 && testiDots.length > 0) {
    testiDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all slides and dots
            testiSlides.forEach(slide => slide.classList.remove('active'));
            testiDots.forEach(d => d.classList.remove('active'));

            // Add active class to clicked slide and dot
            testiSlides[index].classList.add('active');
            testiDots[index].classList.add('active');
        });
    });
}

console.log('🚀 Echofy Website Script Ready');

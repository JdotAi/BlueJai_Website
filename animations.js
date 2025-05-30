// Function to handle element visibility and animations on scroll
function handleScrollAnimations() {
    // Get all elements that should be animated on scroll
    const animatedElements = document.querySelectorAll('.section-title, .about-grid, .app-intro, .app-showcase, .leaderboard-intro, .leaderboard-tables, .blog-intro');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is visible in viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after adding the class
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Use viewport as root
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '-50px 0px' // Offset from viewport
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Handle navbar styling on scroll
function handleNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    handleNavbarOnScroll();
    
    // Add navbar if it doesn't exist (for compatibility with the original design)
    if (!document.querySelector('.navbar')) {
        // Create a simple navigation bar
        const navbar = document.createElement('nav');
        navbar.className = 'navbar';
        navbar.innerHTML = `
            <a href="#landing" class="logo">BlueJai</a>
            <div class="nav-links">
                <a href="#about">About</a>
                <a href="#app">App</a>
                <a href="#blog">Blog</a>
            </div>
        `;
        
        // Insert at the beginning of body
        document.body.insertBefore(navbar, document.body.firstChild);
        
        // Add navbar styles if not already present
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                padding: 1.5rem 10%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 1000;
                transition: all 0.3s ease;
            }
            
            .navbar.scrolled {
                background-color: rgba(10, 10, 10, 0.95);
                padding: 1rem 10%;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            }
            
            .navbar .logo {
                font-size: 1.8rem;
                font-weight: 700;
                letter-spacing: 1px;
                color: white;
                text-decoration: none;
            }
            
            .navbar .nav-links {
                display: flex;
                gap: 2rem;
            }
            
            .navbar .nav-links a {
                color: white;
                text-decoration: none;
                font-weight: 400;
                position: relative;
                padding: 0.5rem 0;
            }
            
            .navbar .nav-links a::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background-color: #4D6CFA;
                transition: width 0.3s ease;
            }
            
            .navbar .nav-links a:hover::after {
                width: 100%;
            }
            
            @media (max-width: 768px) {
                .navbar {
                    padding: 1.5rem 5%;
                }
                
                .navbar.scrolled {
                    padding: 1rem 5%;
                }
                
                .navbar .nav-links {
                    gap: 1rem;
                }
            }
        `;
        document.head.appendChild(styleElement);
        
        // Initialize navbar scroll effect
        handleNavbarOnScroll();
    }
}); 
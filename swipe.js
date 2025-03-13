// Variables to track touch events
let touchStartY = 0;
let touchEndY = 0;
let minSwipeDistance = 100; // Minimum swipe distance in pixels to trigger refresh
let isRefreshing = false;
let refreshIndicator = null;

// Create and append refresh indicator to the DOM
function createRefreshIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'refresh-indicator';
    indicator.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="white"/>
        </svg>
        <span>Pull to refresh</span>
    `;
    
    // Style the refresh indicator
    Object.assign(indicator.style, {
        position: 'fixed',
        top: '-60px', // Initially hidden above the viewport
        left: '0',
        width: '100%',
        height: '60px',
        backgroundColor: 'rgba(77, 108, 250, 0.9)', // Using the blue color from your design
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'top 0.3s ease',
        zIndex: '9999',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    });
    
    // Style the text span
    const span = indicator.querySelector('span');
    Object.assign(span.style, {
        marginLeft: '10px',
        fontWeight: '500'
    });
    
    document.body.appendChild(indicator);
    return indicator;
}

// Initialize touch events
function initSwipeToRefresh() {
    // Create refresh indicator
    refreshIndicator = createRefreshIndicator();
    
    // Add styles for body to handle overflow
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        body.refreshing {
            overflow: hidden;
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .refresh-indicator.refreshing svg {
            animation: rotate 1.5s linear infinite;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Touch start event
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        
        // Only allow pull to refresh when at the top of the page
        if (window.scrollY <= 0 && !isRefreshing) {
            document.body.style.overflowY = 'hidden'; // Prevent scrolling while pulling
        }
    }, false);
    
    // Touch move event
    document.addEventListener('touchmove', function(e) {
        if (isRefreshing) return;
        
        // Only process if we're at the top of the page
        if (window.scrollY <= 0) {
            touchEndY = e.touches[0].clientY;
            const distance = touchEndY - touchStartY;
            
            // If pulling down
            if (distance > 0) {
                // Calculate how far to show the indicator (with resistance)
                const pullDistance = Math.min(distance / 2.5, 60);
                refreshIndicator.style.top = `${pullDistance - 60}px`;
                
                // Update text based on distance
                const span = refreshIndicator.querySelector('span');
                if (distance > minSwipeDistance) {
                    span.textContent = 'Release to refresh';
                } else {
                    span.textContent = 'Pull to refresh';
                }
                
                e.preventDefault(); // Prevent default scrolling
            }
        }
    }, { passive: false });
    
    // Touch end event
    document.addEventListener('touchend', function(e) {
        if (isRefreshing) return;
        
        document.body.style.overflowY = ''; // Restore scrolling
        
        // Only process if we're at the top of the page
        if (window.scrollY <= 0) {
            const distance = touchEndY - touchStartY;
            
            // If pulled down enough
            if (distance > minSwipeDistance) {
                performRefresh();
            } else {
                // Not enough distance, hide the indicator
                refreshIndicator.style.top = '-60px';
            }
        }
    }, false);
}

// Function to perform the refresh
function performRefresh() {
    isRefreshing = true;
    
    // Show the refresh indicator fully
    refreshIndicator.style.top = '0';
    refreshIndicator.classList.add('refreshing');
    
    // Update text
    const span = refreshIndicator.querySelector('span');
    span.textContent = 'Refreshing...';
    
    // Add the refreshing class to body
    document.body.classList.add('refreshing');
    
    // Simulate refresh delay (you can replace this with actual data loading)
    setTimeout(() => {
        // Refresh the page
        window.location.reload();
        
        // Note: The following code won't execute because of the reload,
        // but it's here for reference in case you want to do a partial refresh instead
        /*
        isRefreshing = false;
        refreshIndicator.style.top = '-60px';
        refreshIndicator.classList.remove('refreshing');
        document.body.classList.remove('refreshing');
        */
    }, 1500);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSwipeToRefresh);

// Add scroll event to hide indicator if user scrolls down without refreshing
window.addEventListener('scroll', function() {
    if (!isRefreshing && refreshIndicator) {
        refreshIndicator.style.top = '-60px';
    }
}); 
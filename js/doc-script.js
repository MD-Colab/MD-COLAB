// documentation/js/doc-script.js
/**
 * doc-script.js - Documentation Page Script
 */
document.addEventListener('DOMContentLoaded', () => {
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const searchInput = document.getElementById('nav-search');
    const contentCanvas = document.querySelector('.content-canvas');

    // ADD THIS SNIPPET FOR MOBILE SIDEBAR
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
        });
        
        // Also, close sidebar when a nav link is clicked on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('is-open');
            });
        });
    }
    // ROUTING LOGIC
    function router() {
        let hash = window.location.hash;
        
        // Default to the first nav link if hash is empty or invalid
        if (!hash || !document.querySelector(hash)) {
            hash = navLinks[0] ? navLinks[0].getAttribute('href') : '#';
        }

        // 1. Hide all sections
        sections.forEach(section => section.classList.remove('active'));

        // 2. Show target section
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.classList.add('active');
            // Scroll content area to top, not the whole window
            if (contentCanvas) contentCanvas.scrollTop = 0;
        }

        // 3. Update Sidebar Active State
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }
    
    // Add click listener to nav links to handle hash change
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // No need for preventDefault, let the hash change naturally
            // The hashchange event will trigger the router
        });
    });

    // Initialize & Listen for hash changes
    window.addEventListener('hashchange', router);
    router(); // Run on initial load

    // SEARCH FILTER
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.nav-group').forEach(group => {
            let hasVisibleLink = false;
            group.querySelectorAll('.nav-link').forEach(link => {
                const text = link.textContent.toLowerCase();
                const isMatch = text.includes(term);
                link.style.display = isMatch ? 'block' : 'none';
                if (isMatch) {
                    hasVisibleLink = true;
                }
            });
            // Hide the group title if no links inside it match
            group.querySelector('h4').style.display = hasVisibleLink ? 'block' : 'none';
        });
    });
});
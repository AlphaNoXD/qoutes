document.addEventListener('DOMContentLoaded', function() {
    const socialTrigger = document.getElementById('social-trigger');
    const socialLinks = document.getElementById('social-links');
    const socialIcons = document.querySelectorAll('.social-icon');
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.drawer');
    const socialsDropdownBtn = document.querySelector('.socials-dropdown-btn');
    const socialDropdown = document.querySelector('.social-dropdown');
    const caretIcon = document.querySelector('.fa-caret-down');

    // Initially hide the drawer
    drawer.style.display = 'none';

    // Initially hide the social links
    socialLinks.style.display = 'none';

    // Variable to track if social links are currently visible
    let socialLinksVisible = false;

    socialTrigger.addEventListener('click', function() {
        if (!socialLinksVisible) {
            socialLinks.style.display = 'flex';
            gsap.fromTo(socialIcons, {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power1.out"});
            socialLinksVisible = true; // Update the visibility flag
        } else {
            gsap.to(socialIcons, {opacity: 0, y: 50, duration: 0.3, stagger: 0.1, ease: "power1.out", onComplete: () => {
                socialLinks.style.display = 'none';
            }});
            socialLinksVisible = false; // Update the visibility flag
        }
    });

    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        if (drawer.style.display === 'none') {
            drawer.style.display = 'block'; // Show the drawer
            setTimeout(() => { // Delay to allow transition
                drawer.classList.add('open');
            }, 50);
        } else {
            drawer.classList.remove('open');
            setTimeout(() => {
                drawer.style.display = 'none'; // Hide the drawer after transition
            }, 400); // Match transition duration
        }

        // Toggle the rotation animation using JavaScript
        hamburger.classList.toggle('open');
    });

    // Socials Dropdown functionality
    socialsDropdownBtn.addEventListener('click', () => {
        socialDropdown.classList.toggle('show');
        caretIcon.classList.toggle('rotate'); // Rotate the caret icon
    });
		// Fetch quotes from JSON file
    fetch('quotes.json')
        .then(response => response.json()) // Parse the JSON response
        .then(quotes => { // 'quotes' is now the array of quotes
            const quotesContainer = document.getElementById('quotes-container');

            quotes.forEach(quote => {
                const p = document.createElement('p');
                p.textContent = quote;
                quotesContainer.appendChild(p);
            });

						 // GSAP ScrollReveal - animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            }
        });
    });
        })
        .catch(error => {
            console.error('Error fetching quotes:', error); // Always handle errors
          const quotesContainer = document.getElementById('quotes-container');
            quotesContainer.textContent = "Failed to load quotes."; // Display error message

        });




});
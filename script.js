//script File
//Home Section Starts
var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.nav-links');
var menuLinks = document.querySelectorAll('.nav-links li a');

menuBtn.addEventListener('click', activeClass);
function activeClass(){
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
}

menuLinks.forEach(function(link) {
    link.addEventListener('click', menuItemClicked);
});

function menuItemClicked(){
    menuBtn.classList.remove('active');
    menu.classList.remove('active');
}
 
var homeSection = document.querySelector('.home');
window.addEventListener('scroll', scrollFunction);
window.addEventListener('load', scrollFunction);

function scrollFunction(){
    if(window.scrollY > 60){
        homeSection.classList.add('active');
    }
    else{
        homeSection.classList.remove('active');
    }
}
//Home Section ends

//Portfolio start
var $galleryContainer = $('.gallery').isotope({
    itemSelector: '.item',
    layoutMode: 'fitRows'
})

$('.button-group .button').on('click', function(){
    $('.button-group .button').removeClass('active');
    $(this).addClass('active');

    var value = $(this).attr('data-filter');
    $galleryContainer.isotope({
        filter: value
    })
})

// magnific popup
$('.gallery').magnificPopup({
    delegate: '.overlay a.view-link',
    type: 'image',
    gallery:{
        enabled: true
    }
})

$('.project-link').on('click', function(e) {
    e.stopPropagation();
    const url = $(this).attr('href');
    window.open(url, '_blank');
});
// Portfolio Section Ends

//Testimonials Section Starts
$('.testimonials-container').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1,
            nav:false
        },
        600:{
            items:1,
            nav:true
        },
        768:{
            items:2
        }
    }
})

// Add this function at the top of your script file
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set icon based on type
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    const iconColor = type === 'success' ? 'var(--links-clr)' : '#ff4444';
    
    toast.innerHTML = `
        <i class="fas ${icon} icon" style="color: ${iconColor}"></i>
        <div class="message">${message}</div>
        <i class="fas fa-times close-btn"></i>
    `;

    // Add toast to container
    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Add click handler for close button
    toast.querySelector('.close-btn').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// Update your form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('span');
    const buttonIcon = submitButton.querySelector('.button-icon');
    
    // Store original button content
    const originalText = buttonText.textContent;
    const originalIcon = buttonIcon.innerHTML;
    
    // Update button to loading state
    submitButton.classList.add('loading');
    buttonText.textContent = 'Sending...';
    buttonIcon.innerHTML = '<i class="fas fa-spinner"></i>';
    
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch(form.action, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showToast('Message sent successfully! I will get back to you soon.', 'success');
            form.reset();
        } else {
            showToast('Oops! Something went wrong. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error sending message. Please try again.', 'error');
    })
    .finally(() => {
        // Restore button to original state
        submitButton.classList.remove('loading');
        buttonText.textContent = originalText;
        buttonIcon.innerHTML = originalIcon;
    });
});

// Add this function after your existing code
function animateAboutSection() {
    const aboutImage = document.querySelector('.about .about-image');
    const aboutDesc = document.querySelector('.about .about-desc');
    
    // Remove animation classes first (to allow re-animation)
    aboutImage.classList.remove('animate');
    aboutDesc.classList.remove('animate');
    
    // Force reflow
    void aboutImage.offsetWidth;
    void aboutDesc.offsetWidth;
    
    // Add animation classes
    aboutImage.classList.add('animate');
    aboutDesc.classList.add('animate');
}

// Add this function after your existing code
function animateHeroSection() {
    const heroText = document.querySelector('.hero .hero-text');
    
    // Remove animation class first (to allow re-animation)
    heroText.classList.remove('animate');
    
    // Force reflow
    void heroText.offsetWidth;
    
    // Add animation class
    heroText.classList.add('animate');
}

// Add this to your existing window load event
window.addEventListener('load', function() {
    animateHeroSection();
});

// Update your existing click handler for navigation links
menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        menuItemClicked(); // Close mobile menu
        
        // If clicking the home link, trigger animation
        if(this.getAttribute('href') === '#home') {
            setTimeout(animateHeroSection, 100); // Small delay to ensure scroll completes
        }
        // Keep your existing about section animation if present
        if(this.getAttribute('href') === '#about') {
            setTimeout(animateAboutSection, 100);
        }
        // If clicking the resume/education link, trigger animation
        if(this.getAttribute('href') === '#resume') {
            setTimeout(animateResumeSection, 200); // Increased delay before animation starts
        }
        // Add services section animation
        if(this.getAttribute('href') === '#services') {
            setTimeout(animateServicesSection, 200);
        }
    });
});

// Add this function to handle resume section animations
function animateResumeSection() {
    const boxes = document.querySelectorAll('.resume-contents .box');
    
    // Reset animations first
    boxes.forEach(box => {
        box.classList.remove('animate');
        // Force reflow
        void box.offsetWidth;
    });
    
    // Add animations with longer staggered delay
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('animate');
        }, 300 + (index * 300)); // 300ms initial delay, then 300ms between each box
    });
}

// Add this to your existing window load event
window.addEventListener('load', function() {
    animateResumeSection();
});

// Also trigger animation when clicking resume nav link
document.querySelector('a[href="#resume"]').addEventListener('click', function() {
    // Small delay to ensure scroll completes
    setTimeout(() => {
        const boxes = document.querySelectorAll('.resume-contents .box');
        boxes.forEach(box => {
            box.classList.remove('animate');
            // Force reflow
            void box.offsetWidth;
            box.classList.add('animate');
        });
    }, 100);
});

// Keep only the click-based animation
menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        menuItemClicked(); // Close mobile menu
        
        // If clicking the resume/education link, trigger animation
        if(this.getAttribute('href') === '#resume') {
            setTimeout(animateResumeSection, 200); // Increased delay before animation starts
        }
    });
});

// Add this new function for services animation
function animateServicesSection() {
    const serviceBoxes = document.querySelectorAll('.services-container .service-box');
    
    // Reset animations first
    serviceBoxes.forEach(box => {
        box.classList.remove('animate');
        // Force reflow
        void box.offsetWidth;
    });
    
    // Add animations
    serviceBoxes.forEach(box => {
        box.classList.add('animate');
    });
}

// Add an Intersection Observer to trigger animation when scrolling
const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the section is visible
};

const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateServicesSection();
            servicesObserver.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Start observing the services section
const servicesSection = document.querySelector('.services');
if (servicesSection) {
    servicesObserver.observe(servicesSection);
}

// Add this function to animate skills
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-per');
    const percentages = document.querySelectorAll('.percentage');
    
    // Reset animations first
    skillBars.forEach(bar => {
        bar.style.width = '0';
        bar.classList.remove('animate');
    });
    
    percentages.forEach(percentage => {
        percentage.classList.remove('show');
    });

    // Trigger animations with a slight delay
    setTimeout(() => {
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('per');
            
            // Animate the skill bar
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.classList.add('animate');
                
                // Show the percentage
                percentages[index].classList.add('show');
                
                // Remove shimmer effect after animation
                setTimeout(() => {
                    bar.classList.remove('animate');
                }, 2000);
            }, index * 200); // Stagger each bar's animation
        });
    }, 200);
}

// Create an Intersection Observer for the skills section
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target); // Only animate once when scrolling into view
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of the section is visible
});

// Start observing the skills section
const skillsSection = document.querySelector('.skills-container');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add skills animation to navigation click handler
menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        menuItemClicked();
        
        // If clicking the portfolio link (where skills are located), trigger animation
        if(this.getAttribute('href') === '#portfolio') {
            setTimeout(animateSkills, 500); // Delay to allow for scrolling
        }
    });
});

// Update the click handler for the contact button and nav link
document.querySelector('.contact-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(animateContactSection, 500); // Delay animation until scroll completes
});

// Also handle contact link in nav menu
document.querySelectorAll('.nav-links a[href="#contact"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        setTimeout(animateContactSection, 500); // Delay animation until scroll completes
    });
});

function animateContactSection() {
    const contactLeft = document.querySelector('.contact-left');
    const contactRight = document.querySelector('.contact-right');
    const formElements = document.querySelectorAll('.input-group, .submit-button');
    const socialIcons = document.querySelectorAll('.social-icon');
    
    // Reset animations first
    contactLeft.style.opacity = '0';
    contactLeft.style.transform = 'translateX(-50px)';
    contactRight.style.opacity = '0';
    contactRight.style.transform = 'translateX(50px)';
    
    formElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });
    
    socialIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
    });

    // Animate contact sections
    setTimeout(() => {
        contactLeft.style.transition = 'all 0.8s ease';
        contactLeft.style.opacity = '1';
        contactLeft.style.transform = 'translateX(0)';
    }, 200);

    setTimeout(() => {
        contactRight.style.transition = 'all 0.8s ease';
        contactRight.style.opacity = '1';
        contactRight.style.transform = 'translateX(0)';
    }, 400);

    // Animate form elements with stagger
    formElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });

    // Animate social icons with stagger
    socialIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.transition = 'all 0.6s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, 1000 + (index * 100));
    });
}

// Add after your existing testimonials carousel initialization

// Function to animate testimonials
function animateTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonials-card');
    
    // Reset animations first
    testimonialCards.forEach(card => {
        card.classList.remove('animate');
        // Force reflow
        void card.offsetWidth;
    });
    
    // Add animations with stagger
    testimonialCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, 200 * index); // Stagger each card's animation
    });
}

// Create an Intersection Observer for the testimonials section
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTestimonials();
            // Don't unobserve here since we want animations to trigger each time
            // the carousel slides to new testimonials
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of the section is visible
});

// Start observing the testimonials section
const testimonialSection = document.querySelector('.testimonials');
if (testimonialSection) {
    testimonialObserver.observe(testimonialSection);
}

// Add animation trigger to owl carousel events
$('.testimonials-container').on('changed.owl.carousel', function(event) {
    animateTestimonials();
});

// Add testimonials animation to navigation click handler
menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        if(this.getAttribute('href') === '#testimonials') {
            setTimeout(animateTestimonials, 500); // Delay to allow for scrolling
        }
    });
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update button icons based on current theme
    updateThemeToggleIcon(currentTheme);
    
    // Add click event listener
    themeToggleBtn.addEventListener('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button icons
        updateThemeToggleIcon(newTheme);
        
        // Add animation class
        themeToggleBtn.classList.add('theme-transition');
        setTimeout(() => {
            themeToggleBtn.classList.remove('theme-transition');
        }, 500);
    });
}

function updateThemeToggleIcon(theme) {
    const sunIcon = document.querySelector('.theme-toggle-btn .fa-sun');
    const moonIcon = document.querySelector('.theme-toggle-btn .fa-moon');
    
    if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', initThemeToggle);


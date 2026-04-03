// 1. Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // 2. Smooth Scrolling for Navigation
    const links = document.querySelectorAll('nav a, .hero-btns a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only scroll if it's an internal anchor link
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Offset for fixed nav
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Reveal Animation on Scroll
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply the observer to cards and sections
    const elementsToAnimate = document.querySelectorAll('.card, .about-section, .tool');
    elementsToAnimate.forEach(el => revealOnScroll.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    const openChat = document.getElementById('openChat');
    const closeChat = document.getElementById('closeChat');
    const chatModal = document.getElementById('chatModal');
    const chatForm = document.getElementById('chatForm');
    const messageBoard = document.getElementById('messageBoard');
    const userInput = document.getElementById('userInput');

    // 1. Open the chat when "LET'S TALK" is clicked
    openChat.addEventListener('click', () => {
        chatModal.classList.add('active');
        userInput.focus(); // Automatically put the cursor in the box
    });

    // 2. Close the chat when "X" is clicked
    closeChat.addEventListener('click', () => {
        chatModal.classList.remove('active');
    });

    // 3. Handle sending messages
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        
        if (text !== "") {
            // Create the bubble
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('msg', 'outgoing');
            msgDiv.innerHTML = `<p>${text}</p>`;
            
            // Add to board and scroll down
            messageBoard.appendChild(msgDiv);
            userInput.value = "";
            messageBoard.scrollTop = messageBoard.scrollHeight;
        }
    });
});

const emailPill = document.querySelector('.social-pill.email');

emailPill.addEventListener('click', (e) => {
    // This prevents the mail app from opening if you just want to copy
    // e.preventDefault(); 
    
    const email = "naddylinaung555@gmail.com"
    navigator.clipboard.writeText(email);
    
    // Quick "Joyful" alert
    const originalText = emailPill.innerText;
    emailPill.innerText = "Copied to Clipboard! ✨";
    setTimeout(() => {
        emailPill.innerText = originalText;
    }, 2000);
});

// Function to show notification
function showNotification() {
    const badge = document.querySelector('.notification-badge');
    badge.classList.add('active');
    
    // Play a soft "pop" sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3');
    audio.play();
}


// 1. Initialize EmailJS Immediately
(function() {
    // Replace with your real Public Key
    emailjs.init("vWxGmjNhUUkbebzTM"); 
})();

// 2. Function to show the modal
function openContactModal() {
    const overlay = document.getElementById('contact-overlay');
    if (overlay) {
        overlay.classList.add('active');
    } else {
        alert("Error: Modal not found in HTML!");
    }
}

// 3. Function to close the modal
function closeContactModal() {
    document.getElementById('contact-overlay').classList.remove('active');
}

// 4. Handle the Email Submission
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('direct-email-form');
    
    if (emailForm) {
        emailForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop page refresh
            
            const btn = event.target.querySelector('button');
            btn.innerText = 'SENDING...';

            // Use your real Service and Template IDs
            emailjs.sendForm('service_f7ggojj', 'template_z11edlb', this)
                .then(() => {
                    btn.innerText = 'SENT! ✨';
                    setTimeout(() => {
                        closeContactModal();
                        emailForm.reset();
                        btn.innerText = 'SEND EMAIL';
                    }, 2000);
                }, (error) => {
                    alert("Failed to send. Error: " + JSON.stringify(error));
                    btn.innerText = 'SEND EMAIL';
                });
        });
    }

    // Link the close button
    const closeBtn = document.getElementById('close-contact');
    if (closeBtn) closeBtn.onclick = closeContactModal;
});

//dark mode
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    // Check current theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Switch theme
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    console.log("Theme switched to:", newTheme); // Check your console for this!
});
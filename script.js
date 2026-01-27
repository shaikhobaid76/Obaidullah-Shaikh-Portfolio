// ===================== FAVICON DEBUGGING =====================
console.log("=== FAVICON DEBUG START ===");

// Check current favicon
const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
console.log("Found favicon links:", faviconLinks.length);
faviconLinks.forEach(link => {
    console.log("Favicon href:", link.href);
    console.log("Favicon rel:", link.rel);
    console.log("Favicon type:", link.type);
});

// Try to load favicon programmatically
const testFavicon = new Image();
testFavicon.onload = function() {
    console.log("✅ Favicon image loaded successfully from: images/favicon.png");
    console.log("Image dimensions:", this.width + "x" + this.height);
};
testFavicon.onerror = function() {
    console.error("❌ Favicon image failed to load: assets/images/favicon.png");
    console.log("Trying alternative paths...");
    
    // Try different paths
    const paths = [
        'images/favicon.png',
        './images/favicon.png',
        '/images/favicon.png',
        'images/favicon.png',
        './images/favicon.png',
        '/images/favicon.png'
    ];
    
    paths.forEach(path => {
        const img = new Image();
        img.onload = function() {
            console.log("✅ Image found at:", path);
            // Update favicon link
            faviconLinks.forEach(link => {
                link.href = path;
            });
        };
        img.onerror = function() {
            console.log("❌ Not found:", path);
        };
        img.src = path;
    });
};
testFavicon.src = 'assets/images/favicon.png';

console.log("=== FAVICON DEBUG END ===");

// ===================== INITIALIZATION =====================
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.tool-card, .cert-card, .project-card, .tool-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
    
    // Initialize all functions
    initHeader();
    initMenu();
    initTerminal();
    initTyping();
    initTimeline();
    initParticles();
    initModal();
    initSmoothScroll();
    initProjectsSlider();
    initMobileFixes();
    initMobileCentered();
    initTechnicalTools();
});

// ===================== HEADER SCROLL EFFECT =====================
function initHeader() {
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===================== MOBILE MENU =====================
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
    
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
}

// ===================== TERMINAL ANIMATION =====================
function initTerminal() {
    const terminalContent = document.querySelector(".terminal-content");
    if (!terminalContent) return;
    
    const terminalLines = [
        { text: "obaidullah@cybersecurity:~$ whoami", delay: 500 },
        { text: ">> Cybersecurity Professional", delay: 1000 },
        { text: "obaidullah@cybersecurity:~$ skills --list", delay: 1500 },
        { text: ">> Ethical Hacking, Penetration Testing, Network Security", delay: 2000 },
        { text: "obaidullah@cybersecurity:~$ cat experience.txt", delay: 2500 },
        { text: ">> Nexcore Alliance, Shadowfox, Institute of Information Security", delay: 3000 },
        { text: "obaidullah@cybersecurity:~$ tools --used", delay: 3500 },
        { text: ">> Kali Linux, Metasploit, Wireshark, Nmap, Burp Suite", delay: 4000 },
    ];

    function typeTerminal() {
        let currentLine = 0;
        function typeLine() {
            if (currentLine < terminalLines.length) {
                const line = document.createElement('div');
                line.className = 'terminal-line';

                if (terminalLines[currentLine].text.includes('$')) {
                    const prompt = document.createElement('span');
                    prompt.className = 'terminal-prompt';
                    prompt.textContent = terminalLines[currentLine].text.split('$')[0] + '$';
                    const command = document.createTextNode(terminalLines[currentLine].text.replace(terminalLines[currentLine].text.split('$')[0] + '$', ''));
                    line.appendChild(prompt);
                    line.appendChild(command);
                } else {
                    line.textContent = terminalLines[currentLine].text;
                }

                terminalContent.appendChild(line);
                terminalContent.scrollTop = terminalContent.scrollHeight;
                currentLine++;
                setTimeout(typeLine, terminalLines[currentLine - 1].delay);
            } else {
                const cursorLine = document.createElement('div');
                cursorLine.className = 'terminal-line';
                const prompt = document.createElement('span');
                prompt.className = 'terminal-prompt';
                prompt.textContent = 'obaidullah@cybersecurity:~$ ';
                const cursor = document.createElement('span');
                cursor.className = 'terminal-cursor';
                cursorLine.appendChild(prompt);
                cursorLine.appendChild(cursor);
                terminalContent.appendChild(cursorLine);
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }
        }
        setTimeout(typeLine, 1000);
    }
    
    typeTerminal();
}

// ===================== TYPING ANIMATION =====================
function initTyping() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const texts = ['Certified Information Security Consultant', 'Ethical Hacker', 'Vulnerability Assessment', 'Penetration Tester', 'Security Researcher'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 100 : 150);
        }
    }
    
    setTimeout(type, 1000);
}

// ===================== TIMELINE ANIMATION =====================
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    function checkTimelineVisibility() {
        timelineItems.forEach(item => {
            const position = item.getBoundingClientRect();
            if (position.top < window.innerHeight * 0.8 && position.bottom >= 0) {
                item.classList.add('visible');
            }
        });
    }
    window.addEventListener('load', checkTimelineVisibility);
    window.addEventListener('scroll', checkTimelineVisibility);
    // Initial check
    setTimeout(checkTimelineVisibility, 500);
}

// ===================== PARTICLES =====================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 15;
        const animationDuration = Math.random() * 10 + 15;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}vw`;
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.animationDuration = `${animationDuration}s`;

        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;

        particlesContainer.appendChild(particle);
    }
}

// ===================== MODAL =====================
function initModal() {
    window.openModal = function(card) {
        const modal = document.getElementById("certModal");
        if (!modal) return;
        
        modal.style.display = "block";
        document.getElementById("modalTitle").innerText = card.querySelector("h3").innerText;
        document.getElementById("modalProvider").innerHTML = card.querySelector(".provider").innerHTML;
        document.getElementById("modalDescription").innerText = card.querySelector(".short-text").innerText + "\n" + card.querySelector(".full-text").innerText;
        document.getElementById("modalImage").src = card.querySelector(".cert-img").src;
    };

    window.closeModal = function() {
        const modal = document.getElementById("certModal");
        if (modal) {
            modal.style.display = "none";
        }
    };

    window.onclick = function(event) {
        const modal = document.getElementById("certModal");
        if (event.target == modal) {
            closeModal();
        }
    };
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// ===================== SMOOTH SCROLL =====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================== PROJECTS SLIDER =====================
function initProjectsSlider() {
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentProject = document.getElementById('current-project');
    const totalProjects = document.getElementById('total-projects');
    const slidesContainer = document.querySelector('.slides-container');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;

    // Set total projects count
    if (totalProjects) {
        totalProjects.textContent = slides.length;
    }

    function showSlide(n) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (n >= slides.length) currentSlide = 0;
        else if (n < 0) currentSlide = slides.length - 1;
        else currentSlide = n;
        
        // Add classes for animation
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) prevIndex = slides.length - 1;
        slides[prevIndex].classList.add('prev');
        
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        slides[nextIndex].classList.add('next');
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        if (currentProject) {
            currentProject.textContent = currentSlide + 1;
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    function nextSlide() {
        if (isTransitioning) return;
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        if (isTransitioning) return;
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Dot click navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause auto-slide on hover
    const slider = document.querySelector('.projects-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch/swipe support for mobile
    if (slidesContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });
        
        slidesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                nextSlide();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    // Initialize
    showSlide(0);
    startAutoSlide();
}

// ===================== TECHNICAL TOOLS INITIALIZATION =====================
function initTechnicalTools() {
    const toolsData = [
        { name: "Kali Linux", image: "images/kali-linux.png" },
        { name: "Metasploit", image: "images/metasploit.png" },
        { name: "Wireshark", image: "images/wireshark.png" },
        { name: "Nmap", image: "images/nmap.png" },
        { name: "Nessus", image: "images/nessus.png" },
        { name: "Burp Suite", image: "images/burpsuite.png" },
        { name: "Nikto", image: "images/nikto-logo.png" },
        { name: "Sqlmap", image: "images/Sqlmap.png" }
    ];

    // Create horizontal tools for desktop
    const toolsGrid = document.querySelector('.tools-grid');
    const horizontalScrollContent = document.querySelector('.horizontal-scroll-content');
    
    if (toolsGrid && horizontalScrollContent) {
        // Clear existing content
        toolsGrid.innerHTML = '';
        
        // Add tools twice for infinite scroll
        toolsData.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}" onerror="this.src='https://via.placeholder.com/60x65?text=${tool.name}'">
                <h3>${tool.name}</h3>
            `;
            toolsGrid.appendChild(toolCard.cloneNode(true));
        });
        
        // Duplicate for infinite scroll effect
        toolsData.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}" onerror="this.src='https://via.placeholder.com/60x65?text=${tool.name}'">
                <h3>${tool.name}</h3>
            `;
            toolsGrid.appendChild(toolCard);
        });
        
        // Observe for animation
        const toolCards = document.querySelectorAll('.tool-card');
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 100);
                }
            });
        }, { threshold: 0.1 });
        
        toolCards.forEach(card => observer.observe(card));
    }

    // Create vertical tools for mobile (VERTICAL SCROLLING)
    const toolsVertical = document.querySelector('.tools-vertical');
    const verticalScrollContent = document.querySelector('.vertical-scroll-content');
    
    if (toolsVertical && verticalScrollContent) {
        toolsVertical.innerHTML = '';
        
        // Add tools twice for infinite vertical scroll
        toolsData.forEach(tool => {
            const toolItem = document.createElement('div');
            toolItem.className = 'tool-item';
            toolItem.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}" onerror="this.src='https://via.placeholder.com/50x50?text=${tool.name}'">
                <h3>${tool.name}</h3>
            `;
            toolsVertical.appendChild(toolItem);
        });
        
        // Duplicate for infinite vertical scroll
        toolsData.forEach(tool => {
            const toolItem = document.createElement('div');
            toolItem.className = 'tool-item';
            toolItem.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}" onerror="this.src='https://via.placeholder.com/50x50?text=${tool.name}'">
                <h3>${tool.name}</h3>
            `;
            toolsVertical.appendChild(toolItem);
        });
        
        // Observe for animation
        const toolItems = document.querySelectorAll('.tool-item');
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 100);
                }
            });
        }, { threshold: 0.1 });
        
        toolItems.forEach(item => observer.observe(item));
        
        // Calculate total height for smooth vertical scrolling
        const itemHeight = 100; // Approximate height of each item with gap
        const totalItems = toolsData.length * 2;
        const totalHeight = totalItems * itemHeight;
        verticalScrollContent.style.height = `${totalHeight}px`;
    }
}

// ===================== MOBILE FIXES =====================
function initMobileFixes() {
    // Prevent horizontal scroll
    function preventHorizontalScroll() {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
    }
    
    // Fix mobile viewport
    function fixMobileViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
    
    // Fix section widths on mobile
    function fixSectionWidths() {
        const sections = document.querySelectorAll('section, .container, .hero, .about-content, .projects-slider');
        sections.forEach(section => {
            section.style.width = '100%';
            section.style.maxWidth = '100%';
        });
    }
    
    // Adjust about section text for mobile
    function adjustAboutText() {
        const aboutText = document.querySelector('.about-text');
        if (!aboutText) return;
        
        if (window.innerWidth <= 768) {
            aboutText.style.fontSize = '1rem';
            aboutText.style.lineHeight = '1.6';
            aboutText.style.textAlign = 'center';
            aboutText.style.padding = '0 10px';
            
            // Adjust skill tags
            const skillTags = document.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.fontSize = '0.85rem';
                tag.style.padding = '8px 16px';
            });
        } else {
            aboutText.style.fontSize = '';
            aboutText.style.lineHeight = '';
            aboutText.style.textAlign = '';
            aboutText.style.padding = '';
            
            const skillTags = document.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.fontSize = '';
                tag.style.padding = '';
            });
        }
    }
    
    // Adjust terminal for mobile
    function adjustTerminal() {
        const terminal = document.querySelector('.code-terminal');
        if (!terminal) return;
        
        if (window.innerWidth <= 768) {
            terminal.style.height = '350px';
            terminal.style.fontSize = '0.9rem';
        } else if (window.innerWidth <= 576) {
            terminal.style.height = '300px';
            terminal.style.fontSize = '0.85rem';
        } else {
            terminal.style.height = '430px';
            terminal.style.fontSize = '';
        }
    }
    
    // Adjust projects slider for mobile
    function adjustProjectsSlider() {
        const slidesContainer = document.querySelector('.slides-container');
        const projectCard = document.querySelector('.project-card');
        
        if (window.innerWidth <= 768) {
            if (slidesContainer) {
                slidesContainer.style.height = '600px';
            }
            if (projectCard) {
                projectCard.style.flexDirection = 'column';
            }
        } else if (window.innerWidth <= 576) {
            if (slidesContainer) {
                slidesContainer.style.height = '550px';
            }
        } else {
            if (slidesContainer) {
                slidesContainer.style.height = '550px';
            }
            if (projectCard) {
                projectCard.style.flexDirection = 'row';
            }
        }
    }
    
    // Fix project buttons for mobile
    function fixProjectButtons() {
        const projectLinks = document.querySelectorAll('.project-link');
        if (window.innerWidth <= 768) {
            projectLinks.forEach(link => {
                link.style.padding = '14px 20px';
                link.style.fontSize = '1rem';
                link.style.minHeight = '48px';
                link.style.width = '100%';
                link.style.maxWidth = '250px';
                link.style.margin = '5px auto';
            });
        } else {
            projectLinks.forEach(link => {
                link.style.padding = '';
                link.style.fontSize = '';
                link.style.minHeight = '';
                link.style.width = '';
                link.style.maxWidth = '';
                link.style.margin = '';
            });
        }
    }
    
    // Toggle tools display based on screen size
    function toggleToolsDisplay() {
        const horizontalContainer = document.querySelector('.horizontal-scroll-container');
        const verticalContainer = document.querySelector('.vertical-scroll-container');
        
        if (window.innerWidth <= 768) {
            // Mobile: show vertical scrolling, hide horizontal
            if (horizontalContainer) horizontalContainer.style.display = 'none';
            if (verticalContainer) verticalContainer.style.display = 'block';
            
            // Reset vertical animation position on mobile
            if (verticalContainer) {
                const verticalContent = document.querySelector('.vertical-scroll-content');
                if (verticalContent) {
                    verticalContent.style.animation = 'scroll-vertical 40s linear infinite';
                }
            }
        } else {
            // Desktop: show horizontal scrolling, hide vertical
            if (horizontalContainer) horizontalContainer.style.display = 'block';
            if (verticalContainer) verticalContainer.style.display = 'none';
            
            // Reset horizontal animation position on desktop
            if (horizontalContainer) {
                const horizontalContent = document.querySelector('.horizontal-scroll-content');
                if (horizontalContent) {
                    horizontalContent.style.animation = 'scroll-horizontal 40s linear infinite';
                }
            }
        }
    }
    
    // Initial fixes
    preventHorizontalScroll();
    fixMobileViewport();
    fixSectionWidths();
    adjustAboutText();
    adjustTerminal();
    adjustProjectsSlider();
    fixProjectButtons();
    toggleToolsDisplay();
    
    // Re-run on resize
    window.addEventListener('resize', function() {
        preventHorizontalScroll();
        fixSectionWidths();
        adjustAboutText();
        adjustTerminal();
        adjustProjectsSlider();
        fixProjectButtons();
        toggleToolsDisplay();
    });
    
    // Re-run on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            preventHorizontalScroll();
            fixMobileViewport();
            fixSectionWidths();
            adjustAboutText();
            adjustTerminal();
            adjustProjectsSlider();
            fixProjectButtons();
            toggleToolsDisplay();
        }, 100);
    });
}

// ===================== MOBILE CENTERED LAYOUT =====================
function initMobileCentered() {
    // Function to center elements on mobile
    function centerMobileElements() {
        if (window.innerWidth <= 768) {
            // Center hero section
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.display = 'flex';
                heroContent.style.flexDirection = 'column';
                heroContent.style.alignItems = 'center';
                heroContent.style.textAlign = 'center';
                heroContent.style.justifyContent = 'center';
            }
            
            // Center about text
            const aboutText = document.querySelector('.about-text');
            if (aboutText) {
                aboutText.style.textAlign = 'center';
                aboutText.style.display = 'flex';
                aboutText.style.flexDirection = 'column';
                aboutText.style.alignItems = 'center';
            }
            
            // Center skills
            const skills = document.querySelector('.skills');
            if (skills) {
                skills.style.justifyContent = 'center';
                skills.style.display = 'flex';
                skills.style.flexWrap = 'wrap';
            }
            
            // Center project content
            const projectContents = document.querySelectorAll('.project-content');
            projectContents.forEach(content => {
                content.style.textAlign = 'center';
                content.style.display = 'flex';
                content.style.flexDirection = 'column';
                content.style.alignItems = 'center';
            });
            
            // Center project tech tags
            const projectTechs = document.querySelectorAll('.project-tech');
            projectTechs.forEach(tech => {
                tech.style.justifyContent = 'center';
                tech.style.display = 'flex';
                tech.style.flexWrap = 'wrap';
            });
            
            // Center contact icons
            const socialIcons = document.querySelector('.social-icons');
            if (socialIcons) {
                socialIcons.style.justifyContent = 'center';
                socialIcons.style.display = 'flex';
                socialIcons.style.flexWrap = 'wrap';
            }
            
            // Center certification cards
            const certCards = document.querySelectorAll('.cert-card');
            certCards.forEach(card => {
                card.style.textAlign = 'center';
                card.style.display = 'flex';
                card.style.flexDirection = 'column';
                card.style.alignItems = 'center';
            });
        } else {
            // Reset to original desktop layout
            const elementsToReset = [
                '.hero-content',
                '.about-text',
                '.skills',
                '.project-content',
                '.project-tech',
                '.social-icons',
                '.cert-card'
            ];
            
            elementsToReset.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.textAlign = '';
                    el.style.display = '';
                    el.style.flexDirection = '';
                    el.style.alignItems = '';
                    el.style.justifyContent = '';
                    el.style.flexWrap = '';
                });
            });
        }
    }
    
    // Remove scroll icon/arrow animations
    function removeScrollIcons() {
        // Hide any scroll indicator elements
        const scrollIcons = document.querySelectorAll('.scroll-indicator, .scroll-down, .mouse, .scroll-icon, .scroll-arrow');
        scrollIcons.forEach(icon => {
            icon.style.display = 'none';
            icon.style.visibility = 'hidden';
            icon.style.opacity = '0';
        });
    }
    
    // Initialize
    centerMobileElements();
    removeScrollIcons();
    
    // Re-center on resize
    window.addEventListener('resize', centerMobileElements);
    
    // Re-center on orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(centerMobileElements, 100);
    });
}

// ===================== COPY CODE FUNCTION =====================
function copyCode(button) {
    const codeElement = button.parentElement.nextElementSibling.querySelector('code');
    if (!codeElement) return;
    
    const code = codeElement.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = "Copied!";
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
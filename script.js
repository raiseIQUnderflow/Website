// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const typewriter = document.getElementById('typewriter');
const contactForm = document.getElementById('contact-form');

// ===================================
// Typewriter Effect
// ===================================
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = wait;
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typewriter
const words = [
    'Software Engineer',
    'Competitive Programmer'
    
];

if (typewriter) {
    new TypeWriter(typewriter, words, 2000);
}

// ===================================
// Navigation
// ===================================

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ===================================
// Back to Top Button
// ===================================
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .about-text, .about-image, ' +
        '.skill-category, .project-card, .contact-item, .contact-form'
    );

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// Counter Animation
// ===================================
function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===================================
// Contact Form
// ===================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));

    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
function initParallax() {
    const heroShape = document.querySelector('.hero-shape');
    const heroAvatar = document.querySelector('.hero-avatar');

    if (heroShape && heroAvatar) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;

            heroShape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            heroAvatar.style.transform = `translate(${-moveX * 0.5}px, ${-moveY * 0.5}px)`;
        });
    }
}

// ===================================
// Skill Items Hover Effect
// ===================================
function initSkillHover() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// ===================================
// Project Cards Tilt Effect
// ===================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===================================
// Competitive Programming Ratings (via CLIST)
// ===================================
const CLIST_USERNAME = 'raiseIQUnderflow';

// Platform resource IDs on CLIST
const PLATFORM_RESOURCES = {
    codeforces: 1,
    leetcode: 102,
    codechef: 2,
    atcoder: 93
};

// Rank color mappings
const CODEFORCES_COLORS = {
    'newbie': '#808080',
    'pupil': '#008000',
    'specialist': '#03a89e',
    'expert': '#0000ff',
    'candidate master': '#aa00aa',
    'master': '#ff8c00',
    'international master': '#ff8c00',
    'grandmaster': '#ff0000',
    'international grandmaster': '#ff0000',
    'legendary grandmaster': '#ff0000'
};

function getCodeforcesColor(rating) {
    if (rating < 1200) return '#808080';  // newbie
    if (rating < 1400) return '#008000';  // pupil
    if (rating < 1600) return '#03a89e';  // specialist
    if (rating < 1900) return '#0000ff';  // expert
    if (rating < 2100) return '#aa00aa';  // candidate master
    if (rating < 2300) return '#ff8c00';  // master
    if (rating < 2400) return '#ff8c00';  // international master
    if (rating < 2600) return '#ff0000';  // grandmaster
    if (rating < 3000) return '#ff0000';  // international grandmaster
    return '#ff0000';  // legendary grandmaster
}

function getCodeChefColor(rating) {
    if (rating < 1400) return '#666666';  // 1 star
    if (rating < 1600) return '#1E7D22';  // 2 star
    if (rating < 1800) return '#3366CC';  // 3 star
    if (rating < 2000) return '#684273';  // 4 star
    if (rating < 2200) return '#FFBF00';  // 5 star
    if (rating < 2500) return '#FF7F00';  // 6 star
    return '#FF0000';  // 7 star
}

function getAtCoderColor(rating) {
    if (rating < 400) return '#808080';   // gray
    if (rating < 800) return '#804000';   // brown
    if (rating < 1200) return '#008000';  // green
    if (rating < 1600) return '#00C0C0';  // cyan
    if (rating < 2000) return '#0000FF';  // blue
    if (rating < 2400) return '#C0C000';  // yellow
    if (rating < 2800) return '#FF8000';  // orange
    return '#FF0000';  // red
}

function getLeetCodeColor(rating) {
    if (rating < 1400) return '#666666';
    if (rating < 1600) return '#2DB55D';
    if (rating < 1800) return '#5DADE2';
    if (rating < 2000) return '#3498DB';
    if (rating < 2200) return '#9B59B6';
    if (rating < 2400) return '#F39C12';
    if (rating < 2600) return '#E67E22';
    return '#E74C3C';
}

function getColorForPlatform(platform, rating) {
    switch (platform) {
        case 'codeforces': return getCodeforcesColor(rating);
        case 'codechef': return getCodeChefColor(rating);
        case 'atcoder': return getAtCoderColor(rating);
        case 'leetcode': return getLeetCodeColor(rating);
        default: return '#6366f1';
    }
}

function getRankForPlatform(platform, rating) {
    if (platform === 'codeforces') {
        if (rating < 1200) return 'Newbie';
        if (rating < 1400) return 'Pupil';
        if (rating < 1600) return 'Specialist';
        if (rating < 1900) return 'Expert';
        if (rating < 2100) return 'Candidate Master';
        if (rating < 2300) return 'Master';
        if (rating < 2400) return 'Int. Master';
        if (rating < 2600) return 'Grandmaster';
        if (rating < 3000) return 'Int. Grandmaster';
        return 'Legendary GM';
    }
    if (platform === 'codechef') {
        if (rating < 1400) return '1★';
        if (rating < 1600) return '2★';
        if (rating < 1800) return '3★';
        if (rating < 2000) return '4★';
        if (rating < 2200) return '5★';
        if (rating < 2500) return '6★';
        return '7★';
    }
    if (platform === 'atcoder') {
        if (rating < 400) return 'Gray';
        if (rating < 800) return 'Brown';
        if (rating < 1200) return 'Green';
        if (rating < 1600) return 'Cyan';
        if (rating < 2000) return 'Blue';
        if (rating < 2400) return 'Yellow';
        if (rating < 2800) return 'Orange';
        return 'Red';
    }
    if (platform === 'leetcode') {
        return 'Contest Rating';
    }
    return '';
}

async function fetchAllRatingsFromClist() {
    const clistUrl = 'https://clist.by/coder/raiseIQUnderflow/';
    const proxyUrls = [
        // Text extraction proxy (often CORS-friendly)
        'https://r.jina.ai/http://clist.by/coder/raiseIQUnderflow/',
        'https://api.allorigins.win/raw?url=' + encodeURIComponent(clistUrl)
    ];

    let content = null;
    for (const url of proxyUrls) {
        try {
            const res = await fetch(url, { method: 'GET' });
            if (!res.ok) continue;
            const txt = await res.text();
            if (txt && txt.length > 200) { // crude sanity check
                content = txt;
                break;
            }
        } catch (e) {
            // try next proxy
        }
    }

    if (!content) {
        // If we cannot fetch CLIST, show placeholders
        ['codeforces', 'leetcode', 'codechef', 'atcoder'].forEach(p => setRatingError(`${p}-rating`));
        return;
    }

    // Parse content for platform ratings
    const parsed = parseClistContent(content);

    // Update UI per platform
    updateFromParsed('codeforces', parsed.codeforces);
    updateFromParsed('leetcode', parsed.leetcode);
    updateFromParsed('codechef', parsed.codechef);
    updateFromParsed('atcoder', parsed.atcoder);
    updateFromParsed('gfg', parsed.gfg);
}

function updateFromParsed(platform, data) {
    if (!data) {
        setRatingError(`${platform}-rating`);
        return;
    }
    const rating = sanitizeRating(data.rating);
    const subtitle = sanitizeSubtitle(platform, data.subtitle);
    const color = getColorForPlatform(platform, Number(rating) || 0);
    updateRatingDisplay(`${platform}-rating`, rating ?? '—', subtitle, color);
}

function sanitizeRating(r) {
    if (r == null) return '—';
    const m = String(r).match(/\d{3,4}/);
    return m ? m[0] : String(r);
}

function sanitizeSubtitle(platform, s) {
    if (!s) return '';
    // Keep only alphabetic words and star symbols, drop stray digits
    const cleaned = String(s)
        .replace(/[^A-Za-z★\s]/g, '')
        .trim();
    // For Codeforces, prefer rank label we compute instead of scraped text
    if (platform === 'codeforces') {
        const ratingEl = document.getElementById('codeforces-rating');
        return '';
    }
    return cleaned;
}

function parseClistContent(txt) {
    // Attempt to extract ratings next to platform names.
    // This uses heuristic regexes and may be adjusted if CLIST layout changes.
    const get = (name, patterns) => {
        for (const re of patterns) {
            const m = txt.match(re);
            if (m) {
                return { rating: m[1], subtitle: m[2] || '' };
            }
        }
        return null;
    };

    // Generic numeric rating capture near platform name
    const cf = get('codeforces', [
        /Codeforces[^\d]{0,40}(\d{3,4})/i
    ]);
    const lc = get('leetcode', [
        /LeetCode[^\d]{0,40}(\d{3,4})(?:[^\d]+(rating|contest|points))?/i
    ]);
    const cc = get('codechef', [
        /CodeChef[^\d]{0,60}(\d{3,4})(?:[^\d]+([1-7]★|stars?))?/i
    ]);
    const ac = get('atcoder', [
        /AtCoder[^\d]{0,40}(\d{3,4})(?:[^\d]+(rating))?/i
    ]);
    const gfg = get('geeksforgeeks', [
        /GeeksforGeeks[^\d]{0,60}(\d{2,4})(?:[^\d]+(score|rating|points))?/i
    ]);

    return {
        codeforces: cf,
        leetcode: lc,
        codechef: cc,
        atcoder: ac,
        gfg: gfg
    };
}

async function fetchCodeforcesRating() {
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=sarvajnya_18`);
        const data = await response.json();
        if (data.status === 'OK' && data.result.length > 0) {
            const user = data.result[0];
            const rating = user.rating || 0;
            const color = getCodeforcesColor(rating);
            const rank = getRankForPlatform('codeforces', rating);
            updateRatingDisplay('codeforces-rating', rating || 'Unrated', rank, color);
        }
    } catch (error) {
        console.error('Error fetching Codeforces rating:', error);
        setRatingError('codeforces-rating');
    }
}

async function fetchLeetCodeRating() {
    try {
        const query = `
            query userContestRankingInfo($username: String!) {
                userContestRanking(username: $username) {
                    rating
                }
                matchedUser(username: $username) {
                    submitStats: submitStatsGlobal {
                        acSubmissionNum {
                            count
                        }
                    }
                }
            }
        `;
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables: { username: 'raiseIQUnderflow' }
            })
        });
        const data = await response.json();
        if (data.data) {
            const contestRanking = data.data.userContestRanking;
            const solved = data.data.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count || 0;
            if (contestRanking && contestRanking.rating) {
                const rating = Math.round(contestRanking.rating);
                const color = getLeetCodeColor(rating);
                updateRatingDisplay('leetcode-rating', rating, `${solved} solved`, color);
            } else {
                updateRatingDisplay('leetcode-rating', solved, 'problems solved', '#FFA116');
            }
        }
    } catch (error) {
        console.error('Error fetching LeetCode rating:', error);
        setRatingError('leetcode-rating');
    }
}

async function fetchCodeChefRating() {
    try {
        const response = await fetch(`https://codechef-api.vercel.app/handle/omniscient_18`);
        const data = await response.json();
        if (data && data.currentRating) {
            const rating = data.currentRating;
            const color = getCodeChefColor(rating);
            const rank = getRankForPlatform('codechef', rating);
            updateRatingDisplay('codechef-rating', rating, rank, color);
        }
    } catch (error) {
        console.error('Error fetching CodeChef rating:', error);
        setRatingError('codechef-rating');
    }
}

async function fetchAtCoderRating() {
    try {
        const response = await fetch(`https://atcoder.jp/users/raiseIQUnderflow/history/json`);
        const data = await response.json();
        if (data && data.length > 0) {
            const latestContest = data[data.length - 1];
            const rating = latestContest.NewRating;
            const color = getAtCoderColor(rating);
            const rank = getRankForPlatform('atcoder', rating);
            updateRatingDisplay('atcoder-rating', rating, rank, color);
        } else {
            updateRatingDisplay('atcoder-rating', '-', 'No contests', '#808080');
        }
    } catch (error) {
        console.error('Error fetching AtCoder rating:', error);
        setRatingError('atcoder-rating');
    }
}

function updateRatingDisplay(elementId, rating, subtitle, color) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <span class="rating-value" style="color: ${color}">${rating}</span>
            <span class="rating-subtitle">${subtitle}</span>
        `;
        element.classList.add('loaded');
    }
}

function setRatingError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<span class="rating-value">—</span>`;
    }
}

function fetchAllCPRatings() {
    fetchAllRatingsFromClist();
}

// ===================================
// Initialize Everything
// ===================================
function init() {
    initScrollAnimations();
    initCounterAnimation();
    initParallax();
    initSkillHover();
    initTiltEffect();
    fetchAllCPRatings();
}

// Event Listeners
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveNavLink();
    handleBackToTop();
});

window.addEventListener('load', init);

// Initial calls
handleNavbarScroll();
updateActiveNavLink();

// ===================================
// Console Easter Egg
// ===================================
console.log(`
%c👋 Hey there, curious developer!

%cLooking at the code, huh? I like that!
Feel free to reach out if you want to collaborate.

🚀 Built with HTML, CSS, and vanilla JavaScript
💜 Made with love by Sarvajnya
`, 
'font-size: 20px; font-weight: bold;',
'font-size: 14px; color: #6366f1;'
);

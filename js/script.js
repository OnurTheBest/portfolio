// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', currentTheme);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills-grid')) {
                animateSkillBars();
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe sections for animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// === References Tabs PDF Switch ===
const referenceTabs = document.querySelectorAll('.reference-tab');
const pdfFrame = document.getElementById('pdf-frame');

if (referenceTabs && pdfFrame) {
  referenceTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      referenceTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const pdf = this.getAttribute('data-pdf');
      pdfFrame.src = `assets/${pdf}`;
    });
  });
}

// === Dynamic Timeline Dots ===
function updateExperienceTimeline() {
  const timeline = document.querySelector('.timeline');
  const timelineItems = timeline ? timeline.querySelectorAll('.timeline-item') : [];
  const timelineDots = document.getElementById('timeline-dots');
  const line = timeline ? timeline.querySelector('.vertical-timeline-line') : null;

  if (timeline && timelineItems.length && timelineDots && line) {
    timelineDots.innerHTML = '';
    let dotPositions = [];
    timelineItems.forEach((item) => {
      const center = item.offsetTop + item.offsetHeight / 2;
      dotPositions.push(center);
      const date = item.getAttribute('data-date');
      const dotWrap = document.createElement('div');
      dotWrap.className = 'timeline-dot-date';
      dotWrap.style.position = 'absolute';
      dotWrap.style.left = '0';
      dotWrap.style.top = `${center - 9}px`;
      dotWrap.style.width = '140px';
      dotWrap.style.display = 'flex';
      dotWrap.style.alignItems = 'center';
      dotWrap.style.zIndex = '2';
      dotWrap.style.height = '0';
      dotWrap.innerHTML = `<span class="timeline-date-label">${date}</span><span class="timeline-dot"></span>`;
      timelineDots.appendChild(dotWrap);
    });
    if (dotPositions.length > 1) {
      const min = Math.min(...dotPositions);
      const max = Math.max(...dotPositions);
      line.style.top = `${min}px`;
      line.style.height = `${max - min}px`;
    }
  }
}

window.addEventListener('DOMContentLoaded', updateExperienceTimeline);
window.addEventListener('resize', updateExperienceTimeline);

// === Dynamic Timeline Dots for Education ===
window.addEventListener('DOMContentLoaded', () => {
  const educationTimeline = document.querySelector('#education .timeline');
  const educationItems = document.querySelectorAll('#education .timeline-item');
  const educationDots = document.getElementById('education-timeline-dots');
  const educationLine = educationTimeline ? educationTimeline.querySelector('.vertical-timeline-line') : null;

  if (educationTimeline && educationItems.length && educationDots && educationLine) {
    educationDots.innerHTML = '';
    let dotPositions = [];
    educationItems.forEach((item, idx) => {
      const center = item.offsetTop + item.offsetHeight / 2;
      dotPositions.push(center);
      const date = item.getAttribute('data-date');
      const dotWrap = document.createElement('div');
      dotWrap.className = 'timeline-dot-date';
      dotWrap.style.position = 'absolute';
      dotWrap.style.left = '0';
      dotWrap.style.top = `${center - 9}px`;
      dotWrap.style.width = '140px';
      dotWrap.style.display = 'flex';
      dotWrap.style.alignItems = 'center';
      dotWrap.style.zIndex = '2';
      dotWrap.style.height = '0';
      dotWrap.innerHTML = `<span class="timeline-date-label">${date}</span><span class="timeline-dot"></span>`;
      educationDots.appendChild(dotWrap);
    });
    if (dotPositions.length > 1) {
      const min = Math.min(...dotPositions);
      const max = Math.max(...dotPositions);
      educationLine.style.top = `${min}px`;
      educationLine.style.height = `${max - min}px`;
    }
  }
});

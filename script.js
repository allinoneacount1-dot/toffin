const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navActions.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
}

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 1px 0 rgba(39, 39, 42, 0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.eco-card, .product-category, .testimonial-card, .about-card, .brand-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

function animateCounter(el, target, suffix = '') {
  const isNumber = !isNaN(parseInt(target));
  if (!isNumber) {
    el.textContent = target;
    return;
  }
  const num = parseInt(target);
  const duration = 2000;
  const step = num / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= num) {
      current = num;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('id-ID') + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = el.textContent;
      animateCounter(el, target);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
  statsObserver.observe(el);
});

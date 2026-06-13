(function () {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-animate="fade-in"]').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  // Fade-in observer for scroll-triggered animations
  var fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all fade-in elements
  document.querySelectorAll('[data-animate="fade-in"]').forEach(function (el) {
    fadeObserver.observe(el);
  });

  // Hero: trigger immediately on load
  document.addEventListener('DOMContentLoaded', function () {
    var hero = document.querySelector('[data-animate="fade-in"]');
    if (hero) {
      hero.classList.add('visible');
      fadeObserver.unobserve(hero);
    }
  });

  // Nav link highlighting observer
  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          document.querySelectorAll('[data-nav-section]').forEach(function (link) {
            link.classList.remove('nav-link--active', 'text-primary-800', 'font-semibold');
            link.classList.add('text-primary-600');
            if (link.getAttribute('data-nav-section') === id) {
              link.classList.remove('text-primary-600');
              link.classList.add('nav-link--active', 'text-primary-800', 'font-semibold');
            }
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
  );

  // Observe all sections for nav highlighting
  document.querySelectorAll('section[id]').forEach(function (section) {
    navObserver.observe(section);
  });
})();

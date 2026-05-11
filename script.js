/* ============================================
   Pablo's Party — Linktree Clone
   Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Ripple effect on link buttons ---
    document.querySelectorAll('.link-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // --- Parallax subtle on background ---
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const bg = document.querySelector('.bg-image');
                if (bg) {
                    bg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.05)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- Touch feedback for mobile ---
    document.querySelectorAll('.link-btn, .social-icon').forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.97)';
        }, { passive: true });

        el.addEventListener('touchend', () => {
            el.style.transform = '';
        }, { passive: true });
    });

    // --- Intersection Observer for re-triggering animations on scroll ---
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target); // Free up memory once animated
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-in').forEach(el => {
            el.style.animationPlayState = 'paused'; // Ensure they start paused until visible
            observer.observe(el);
        });
    }
});

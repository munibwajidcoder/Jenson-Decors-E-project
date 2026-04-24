document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(card);
    });

    // ---------------------------------------------------------------
    // Make EVERY product card navigate to the product detail page
    // when clicked (anywhere on the card).
    // ---------------------------------------------------------------
    // STEP 2: Product card click → Comparison Page
    // Scroll Reveal Animation Logic
    
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Existing product card navigation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                window.location.href = 'comparison.html';
            }
        });
    });

    // Brand product cards (L'Artiste page etc.) → Comparison Page
    document.querySelectorAll('.brand-product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Don't double-fire if it's already an <a> tag
            if (card.tagName !== 'A') {
                window.location.href = 'comparison.html';
            }
        });
    });

    // STEP 3: Add to Cart on Comparison Page → Technical Documents
    document.querySelectorAll('.comp-atc').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = 'technical-documents.html';
        });
    });

    // Sidebar filter interaction
    const applyBtn = document.querySelector('.btn-apply-filter');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            applyBtn.textContent = 'APPLYING...';
            applyBtn.classList.add('applying');
            
            setTimeout(() => {
                applyBtn.textContent = 'APPLY SECTIONS';
                applyBtn.classList.remove('applying');
                alert('Filters applied successfully!');
            }, 800);
        });
    }

    // Category link active state logic (simplified)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Brand filter logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Add a subtle ripple effect or feedback if desired
                console.log(`Filtering by: ${btn.textContent}`);
            });
        });
    }

    // Product Gallery Interaction
    const thumbs = document.querySelectorAll('.thumb-item');
    const mainView = document.querySelector('.main-image-container');

    if (thumbs.length > 0 && mainView) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Update active state
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                // In a real app, we'd swap the img src.
                // Since we are using SVGs, we'll swap the innerHTML for demo.
                const thumbSvg = thumb.querySelector('svg').cloneNode(true);
                thumbSvg.setAttribute('viewBox', '0 0 100 100'); // Ensure it fits
                mainView.innerHTML = '';
                mainView.appendChild(thumbSvg);
                
                // Adjust for main view
                thumbSvg.style.width = '100%';
                thumbSvg.style.height = '100%';
            });
        });
    }
});

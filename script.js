$(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });
    
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('navbar-scrolled shadow-sm');
        } else {
            $('.navbar').removeClass('navbar-scrolled shadow-sm');
        }
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .explore-card, section').forEach(el => {
        observer.observe(el);
    });
    
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target) + suffix;
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current)) + suffix;
            }
        }, 20);
    }
    
    function formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const statElements = entry.target.querySelectorAll('.display-4');
                statElements.forEach(el => {
                    const text = el.textContent;
                    if (text.includes('BILLION')) {
                        animateCounter(el, 1000000000, '+');
                    } else if (text.includes('55K')) {
                        animateCounter(el, 55000, '+ STUDENTS');
                    } else {
                        el.style.opacity = '0';
                        $(el).animate({ opacity: 1 }, 1000);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    $('.card').hover(
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1)');
        }
    );

    $('.explore-card').on('click', function() {
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
    });

    $('.header-top input[type="search"]').on('keypress', function(e) {
        if (e.which === 13) { 
            e.preventDefault();
            const query = $(this).val().trim();
            if (query.length < 3) {
                alert('Masukkan setidaknya 3 karakter untuk pencarian.');
                return;
            }
            console.log('Mencari: ' + query);

        }
    });

    if ($(window).width() > 992) {
        $('.nav-item.dropdown').hover(
            function() {
                $(this).find('.dropdown-menu').stop(true, true).slideDown(200);
            },
            function() {
                $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
            }
        );
    }

    const $backToTop = $('<button>', {
        class: 'btn btn-red back-to-top',
        html: '↑',
        css: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'none',
            zIndex: 1000
        }
    }).appendTo('body');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $backToTop.fadeIn();
        } else {
            $backToTop.fadeOut();
        }
    });

    $backToTop.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    $('.hero-content').css('opacity', 0).animate({ opacity: 1 }, 1000);

    $('.nav-link.dropdown-toggle').on('keydown', function(e) {
        if (e.which === 13 || e.which === 32) { 
            e.preventDefault();
            $(this).trigger('click');
        }
    });

    function adjustLayout() {
        if ($(window).width() < 768) {
            $('.hero-content h1').css('font-size', '2rem');
            $('.hero-content p').css('font-size', '1rem');
        } else {
            $('.hero-content h1').css('font-size', '');
            $('.hero-content p').css('font-size', '');
        }
    }

    adjustLayout();
    $(window).resize(adjustLayout);
});
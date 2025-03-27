// Animation script for Portfolio website với hiệu ứng công nghệ cao
document.addEventListener('DOMContentLoaded', function() {
    // Thêm hiệu ứng particles cho intro
    addParticleBackground();
    
    // Đảm bảo intro animation chạy trước - giảm thời gian chờ
    setTimeout(() => {
        document.querySelector('.intro-overlay').style.animationPlayState = 'running';
    }, 150); // Giảm từ 300ms xuống 150ms

    // Đánh dấu các phần tử đã được animation để tránh lặp lại
    const animatedElements = new Set();

    // Hiện ngay các phần tử trên màn hình đầu tiên nhanh hơn - giảm thời gian chờ
    setTimeout(() => {
        // Thêm hiệu ứng glitch cho tiêu đề
        const title = document.querySelector('.title.title-shimmer');
        if (title) {
            title.classList.add('tech-glitch');
            setTimeout(() => {
                title.classList.remove('tech-glitch');
            }, 750); // Giảm từ 1500ms xuống 750ms
        }
        
        // Kích hoạt animation cho các phần tử header với hiệu ứng stagger - tăng tốc
        const headerElements = document.querySelectorAll('.animate-fadeInRight, .animate-fadeInLeft');
        headerElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 50); // Giảm từ 100ms xuống 50ms
        });
        
        // Hiệu ứng cho avatar - thêm hiệu ứng pulse
        const mainAvatar = document.getElementById('main-avatar');
        if (mainAvatar) {
            mainAvatar.classList.add('active', 'tech-pulse');
        }
        
        // Hiện ngay tiêu đề và phần profile - tăng tốc stagger
        document.querySelectorAll('.section__text .animate-fadeInUp, .section__text .animate-scale').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, 400 + index * 75); // Giảm từ 800ms + 150ms xuống 400ms + 75ms
        });
    }, 900); // Giảm từ 1800ms xuống 900ms

    // Cải tiến animation cho các phần tử khi scroll - CHỈ CHO PHẦN CONTACT, BỎ ABOUT, EXPERIENCE, PROJECTS
    const animateOnScroll = () => {
        // Chỉ animate các phần tử trong phần contact
        const contactElements = document.querySelectorAll('#contact .contact-info-container, #contact .contact-info-upper-container');
        
        contactElements.forEach((element, index) => {
            // Chỉ animate các phần tử chưa được xử lý
            if (!animatedElements.has(element)) {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.1;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('active', 'tech-pulse');
                    
                    // Đánh dấu đã xử lý
                    animatedElements.add(element);
                }
            }
        });
    };
    
    // Chạy animation khi scroll với tối ưu hiệu suất
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateOnScroll();
                scrollTimeout = null;
            }, 5); // Giảm từ 10ms xuống 5ms để phản ứng nhanh hơn
        }
    });
    
    // Đảm bảo tiêu đề "Le Hai Dang" luôn hiển thị
    const nameTitle = document.querySelector('.title.title-shimmer');
    if (nameTitle) {
        nameTitle.style.opacity = '1';
        
        // Thêm sự kiện hover cho tiêu đề để tạo hiệu ứng glitch
        nameTitle.addEventListener('mouseenter', function() {
            this.classList.add('tech-glitch');
        });
        
        nameTitle.addEventListener('mouseleave', function() {
            this.classList.remove('tech-glitch');
        });
    }

    // Text typing effect cải tiến - tăng tốc
    const textElements = document.querySelectorAll('.typing-text');
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        // Khởi động typing effect sau khi intro animation hoàn thành
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    
                    // Tốc độ gõ nhanh hơn
                    const randomSpeed = Math.floor(Math.random() * 25) + 25; // Giảm từ 50+50ms xuống 25+25ms
                    setTimeout(typeWriter, randomSpeed);
                }
            };
            typeWriter();
        }, 1000); // Giảm từ 2000ms xuống 1000ms
    });

    // Hiệu ứng 3D cho các phần tử khi di chuyển chuột - BỎ HIỆU ỨNG CHO PROJECT CARDS
    
    // Thêm hiệu ứng parallax cho background nâng cao - tăng tốc phản ứng 
    // (CHỈ ÁP DỤNG CHO PHẦN HERO)
    window.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02; // Tăng từ 0.01 lên 0.02
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02; // Tăng từ 0.01 lên 0.02
        
        // CHỈ áp dụng cho phần hero
        const heroSection = document.getElementById('profile');
        if (!heroSection) return;
        
        const heroElements = heroSection.querySelectorAll('.animate-float.active');
        heroElements.forEach(element => {
            element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) translateY(0)`;
            element.style.transition = 'transform 0.05s ease-out'; // Giảm từ 0.1s xuống 0.05s
        });
        
        // Parallax chỉ cho avatar trong phần hero
        const avatarContainer = heroSection.querySelector('.section__pic-container');
        if (avatarContainer) {
            avatarContainer.style.transform = `translate3d(${moveX * 4}px, ${moveY * 4}px, 0)`;
            avatarContainer.style.transition = 'transform 0.1s ease-out';
        }
    });

    // Thêm hiệu ứng hover cho các nút với hiệu ứng glow - tăng tốc
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 150, 255, 0.4), 0 0 15px rgba(0, 150, 255, 0.3)';
            this.style.transition = 'all 0.15s cubic-bezier(0.19, 1, 0.22, 1)'; // Giảm từ 0.3s xuống 0.15s
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.15s cubic-bezier(0.19, 1, 0.22, 1)'; // Giảm từ 0.3s xuống 0.15s
        });
    });

    // Hiệu ứng đặc biệt cho Avatar khi click - tăng tốc
    const mainAvatar = document.getElementById('main-avatar');
    if (mainAvatar) {
        mainAvatar.addEventListener('click', function() {
            this.style.animation = 'futuristicSpin 0.5s ease-in-out'; // Giảm từ 1s xuống 0.5s
            setTimeout(() => {
                this.style.animation = 'techFloat 2s ease-in-out infinite'; // Giảm từ 4s xuống 2s
            }, 500); // Giảm từ 1000ms xuống 500ms
        });
    }

    // Hiệu ứng đặc biệt khi scroll đến cuối trang - tăng tốc
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
            const contact = document.querySelector('#contact');
            if (contact && !contact.classList.contains('animated')) {
                contact.classList.add('tech-pulse', 'animated');
                
                // Hiệu ứng cho các icon trong phần contact
                document.querySelectorAll('#contact .icon').forEach((icon, index) => {
                    setTimeout(() => {
                        icon.classList.add('tech-spin');
                    }, index * 100); // Giảm từ 200ms xuống 100ms
                });
            }
        }
    });

    // HIỂN THỊ NGAY CÁC PHẦN TỬ ABOUT, EXPERIENCE, PROJECTS MÀ KHÔNG CẦN ANIMATION
    const showElementsWithoutAnimation = () => {
        // Hiển thị ngay các phần tử trong About, Experience, Projects
        const staticElements = document.querySelectorAll(
            '#about .details-container, #about .text-container, ' +
            '#experience .details-container, #experience .experience-sub-title, ' +
            '#projects .project-card'
        );
        
        staticElements.forEach(element => {
            // Loại bỏ các class animation và hiển thị ngay
            element.classList.remove('tech-blur-in', 'tech-pulse', 'animate-fadeInUp');
            element.style.opacity = '1';
            element.style.transform = 'none';
            
            // Đánh dấu đã xử lý để tránh animateOnScroll tác động sau này
            animatedElements.add(element);
        });
    };
    
    // Gọi hàm để hiển thị các phần tử ngay lập tức
    showElementsWithoutAnimation();
});

// Hàm tạo hiệu ứng particle background cho intro - Tăng tốc và nhạy
function addParticleBackground() {
    const overlay = document.querySelector('.intro-overlay');
    if (!overlay) return;
    
    // Tạo canvas cho particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    overlay.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Mảng chứa các hạt
    const particles = [];
    const particleCount = 150; // Tăng từ 100 lên 150
    
    // Tạo các hạt
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, 255, ${Math.random() * 0.5 + 0.5})`,
            speedX: Math.random() * 4 - 2, // Tăng từ 2-1 lên 4-2
            speedY: Math.random() * 4 - 2 // Tăng từ 2-1 lên 4-2
        });
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Di chuyển hạt
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Nảy lại khi chạm biên
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
            
            // Vẽ hạt
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Vẽ các đường nối giữa các hạt gần nhau
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) { // Giảm từ 100 xuống 80 để có nhiều đường nối hơn
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - distance / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Thêm keyframes cho hiệu ứng spin
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.2); }
    100% { transform: rotate(360deg) scale(1); }
}
`;
document.head.appendChild(style); 
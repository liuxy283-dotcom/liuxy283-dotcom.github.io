/**
 * 小刘的博客 - 多巴胺液态玻璃交互
 * 包含：粉色粒子、液态波纹、3D卡片、鼠标光晕、滚动动画
 */

(function() {
  'use strict';

  // ===== 粉色粒子背景 =====
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0, mouseY = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 粉色系粒子颜色
    const colors = [
      [255, 107, 157],  // 粉
      [192, 132, 252],  // 紫
      [103, 232, 249],  // 青
      [251, 191, 36],   // 金
      [255, 143, 183],  // 浅粉
    ];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 3 + 1;
        this.alpha = Math.random() * 0.25 + 0.05;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = this.alpha;
      }
      update() {
        // 鼠标吸引 + 排斥混合效果
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          // 近距离排斥，远距离轻微吸引
          if (dist < 80) {
            this.vx += (dx / dist) * force * 0.3;
            this.vy += (dy / dist) * force * 0.3;
          } else {
            this.vx -= (dx / dist) * force * 0.05;
            this.vy -= (dy / dist) * force * 0.05;
          }
          // 靠近鼠标时变亮
          this.alpha = this.baseAlpha + force * 0.3;
        } else {
          this.alpha = this.baseAlpha;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})`;
        ctx.fill();
        // 光晕
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha * 0.2})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 70; i++) {
      particles.push(new Particle());
    }

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 连线（粉色）
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = 0.06 * (1 - dist / 130);
            ctx.strokeStyle = `rgba(255, 107, 157, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ===== 3D 卡片倾斜 + 折射光斑 =====
  function init3DCards() {
    const cards = document.querySelectorAll('.post-card, .sidebar-section');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        card.style.transition = 'transform 0.1s ease';
        // 更新折射光斑位置
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', percentX + '%');
        card.style.setProperty('--mouse-y', percentY + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      });
    });
  }

  // ===== 卡片点击波纹 =====
  function initCardRipple() {
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
      card.addEventListener('click', e => {
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        card.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  // ===== 全局鼠标点击波纹 =====
  function initGlobalRipple() {
    document.addEventListener('click', e => {
      const ripple = document.createElement('div');
      ripple.className = 'global-ripple';
      const size = 200;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - size / 2) + 'px';
      ripple.style.top = (e.clientY - size / 2) + 'px';
      document.body.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  // ===== 鼠标跟随光晕 =====
  function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let gx = 0, gy = 0;
    document.addEventListener('mousemove', e => {
      gx = e.clientX;
      gy = e.clientY;
    });

    function updateGlow() {
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(updateGlow);
    }
    updateGlow();
  }

  // ===== 导航栏滚动效果 =====
  function initNavScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===== 滚动显示动画 =====
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.post-card, .sidebar-section, .page, .post').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `.scroll-reveal.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
  }

  // ===== 打字机效果 =====
  function initTypewriter() {
    const heroDesc = document.querySelector('.hero-desc');
    if (!heroDesc) return;
    const text = heroDesc.textContent;
    heroDesc.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      heroDesc.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 30);
  }

  // ===== 平滑滚动 =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===== 初始化所有 =====
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    init3DCards();
    initCardRipple();
    initGlobalRipple();
    initCursorGlow();
    initNavScroll();
    initScrollReveal();
    initTypewriter();
    initSmoothScroll();
  });
})();

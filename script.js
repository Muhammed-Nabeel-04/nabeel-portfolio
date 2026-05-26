const cur = document.getElementById('cur');
const curRing = document.getElementById('curRing');
const curLabel = document.getElementById('curLabel');
const termWrap = document.getElementById('termWrap');
let mx=0,my=0,rx=0,ry=0;

// Update mouse coordinates globally
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
  curLabel.style.left = mx + 'px';
  curLabel.style.top = my + 'px';
});

function animRing(){
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  curRing.style.left = rx + 'px';
  curRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

// Global Hover Interactions
document.querySelectorAll('a, button, .project-card, .about-card, .skill-tag, .skill-item, .stack-tag, .project-badge, .hero-tag, .terminal-wrap').forEach(el => {
  el.addEventListener('mouseenter', () => {
    // Cursor feedback
    cur.style.width = '16px';
    cur.style.height = '16px';
    cur.style.opacity = '0.5';
    curRing.style.width = '52px';
    curRing.style.height = '52px';
    
    // Label feedback
    const icon = el.getAttribute('data-icon');
    const label = el.getAttribute('data-label');
    if (icon && label) {
      curLabel.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
      curLabel.style.opacity = '1';
      curLabel.style.transform = 'translate(25px, 25px) scale(1)';
    }
  });

  el.addEventListener('mouseleave', () => {
    // Reset cursor
    cur.style.width = '10px';
    cur.style.height = '10px';
    cur.style.opacity = '1';
    curRing.style.width = '36px';
    curRing.style.height = '36px';
    
    // Reset label
    curLabel.style.opacity = '0';
    curLabel.style.transform = 'translate(20px, 20px) scale(0.8)';
  });
});

// Aurora canvas background
const canvas = document.getElementById('aurora');
const ctx = canvas.getContext('2d');
let W, H, t = 0;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const blobs = [
  { x: 0.2, y: 0.3, r: 0.35, vx: 0.0003, vy: 0.0002, c: '124,92,252' },
  { x: 0.7, y: 0.6, r: 0.3,  vx: -0.0002, vy: 0.0003, c: '80,50,180' },
  { x: 0.5, y: 0.1, r: 0.28, vx: 0.0004, vy: -0.0001, c: '160,100,255' },
  { x: 0.1, y: 0.8, r: 0.22, vx: 0.0002, vy: -0.0003, c: '60,30,160' },
];

function drawAurora() {
  ctx.clearRect(0, 0, W, H);
  blobs.forEach(b => {
    b.x += Math.sin(t * b.vx * 200 + b.r) * b.vx;
    b.y += Math.cos(t * b.vy * 200 + b.r) * b.vy;
    if (b.x < 0 || b.x > 1) b.vx *= -1;
    if (b.y < 0 || b.y > 1) b.vy *= -1;
    const grd = ctx.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, b.r * Math.max(W, H));
    grd.addColorStop(0, `rgba(${b.c},0.22)`);
    grd.addColorStop(1, `rgba(${b.c},0)`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  });
  t++;
  requestAnimationFrame(drawAurora);
}
drawAurora();

// --- REFINED TERMINAL ENGINE ---
const T = document.getElementById('typeTarget');
const SPEED = 65; 
const FAST = 40;
const DELETE_SPEED = 55;

const TS = document.getElementById('thoughtStream');
const NB = document.getElementById('neuralBrain');

// Restored original scenes from nabeel_portfolio.html
const scenes = [
  // Scene 1: JWT Auth with multiple hiccups
  [
    {a:'type', color:'t-kw', text:'@ap'},
    {a:'pause', ms:200},
    {a:'delete', count:1},
    {a:'type', color:'t-kw', text:'pp'},
    {a:'type', color:'t-var', text:'.get('},
    {a:'type', color:'t-str', text:'"/admin"'},
    {a:'type', color:'t-var', text:')\n'},
    {a:'type', color:'t-kw', text:'def '},
    {a:'type', color:'t-fn', text:'auth'},
    {a:'type', color:'t-var', text:'(token):\n'},
    {a:'type', color:'t-var', text:'    user = '},
    {a:'type', color:'t-fn', text:'get_user'},
    {a:'type', color:'t-var', text:'(token)'},
    {a:'pause', ms:400},
    {a:'error', text:'  ← NameError: get_user not defined'},
    {a:'emotion', icon:'🤬', text:'shit...!!', ms:1500},
    {a:'pause', ms:500},
    {a:'type', color:'t-var', text:'\n'},
    {a:'type', color:'t-kw', text:'from '},
    {a:'type', color:'t-var', text:'auth '},
    {a:'type', color:'t-kw', text:'import '},
    {a:'type', color:'t-var', text:'get_user'},
    {a:'clearerror'},
    {a:'newline'},
    {a:'success', text:'✓  Imported.'},
    {a:'emotion', icon:'🙌', text:'yeeesss', ms:1200},
    {a:'pause', ms:400},
    {a:'error', text:'  ← InvalidTokenError'},
    {a:'emotion', icon:'🤔', text:'whattt...?', ms:1800},
    {a:'pause', ms:600},
    {a:'delete', count:15},
    {a:'type', color:'t-fn', text:'verify_jwt'},
    {a:'type', color:'t-var', text:'(token)'},
    {a:'clearerror'},
    {a:'newline'},
    {a:'success', text:'✓  Verified.'},
    {a:'emotion', icon:'😆', text:'hahaha got it', ms:1500},
  ],
  // Scene 2: ML Inference with shape chaos
  [
    {a:'type', color:'t-var', text:'\n'},
    {a:'type', color:'t-var', text:'pred = model.'},
    {a:'type', color:'t-fn', text:'predict'},
    {a:'type', color:'t-var', text:'(data)\n'},
    {a:'pause', ms:500},
    {a:'error', text:'  ← ValueError: input shape (1, 50)'},
    {a:'emotion', icon:'😩', text:'Dammm...!!', ms:1800},
    {a:'pause', ms:400},
    {a:'type', color:'t-var', text:'data = data.'},
    {a:'type', color:'t-fn', text:'reshape'},
    {a:'type', color:'t-var', text:'(1, 78)\n'},
    {a:'pause', ms:300},
    {a:'error', text:'  ← Still ShapeMismatch'},
    {a:'emotion', icon:'🫠', text:'aaahh God 🤲?', ms:2000},
    {a:'pause', ms:500},
    {a:'delete', count:6},
    {a:'type', color:'t-var', text:'78, 1)'},
    {a:'clearerror'},
    {a:'newline'},
    {a:'success', text:'✓  Reshaped.'},
    {a:'emotion', icon:'🎉', text:'finally', ms:1500},
  ],
  // Scene 3: Async/Await trap
  [
    {a:'type', color:'t-var', text:'\n'},
    {a:'type', color:'t-kw', text:'async def '},
    {a:'type', color:'t-fn', text:'save'},
    {a:'type', color:'t-var', text:'():\n'},
    {a:'type', color:'t-var', text:'    db.'},
    {a:'type', color:'t-fn', text:'add'},
    {a:'type', color:'t-var', text:'(obj)\n'},
    {a:'type', color:'t-var', text:'    db.'},
    {a:'type', color:'t-fn', text:'commit'},
    {a:'type', color:'t-var', text:'()'},
    {a:'pause', ms:400},
    {a:'error', text:'  ← RuntimeWarning: not awaited'},
    {a:'emotion', icon:'😤', text:'#$!&', ms:1800},
    {a:'pause', ms:600},
    {a:'delete', count:10},
    {a:'type', color:'t-kw', text:'await '},
    {a:'type', color:'t-var', text:'db.'},
    {a:'type', color:'t-fn', text:'commit'},
    {a:'type', color:'t-var', text:'()'},
    {a:'clearerror'},
    {a:'newline'},
    {a:'success', text:'✓  Awaited.'},
    {a:'pause', ms:400},
    {a:'error', text:'  ← ConnectionError: DB down'},
    {a:'emotion', icon:'⏳', text:'Loading....', ms:2000},
    {a:'pause', ms:800},
    {a:'comment', text:'  # restarting docker...'},
    {a:'pause', ms:1000},
    {a:'clearerror'},
    {a:'success', text:'✓  DB online.'},
    {a:'emotion', icon:'😮‍💨', text:'hammmm', ms:1500},
  ],
  // Scene 4: The Accuracy Grind
  [
    {a:'type', color:'t-var', text:'\n'},
    {a:'type', color:'t-kw', text:'return '},
    {a:'type', color:'t-var', text:'{'},
    {a:'type', color:'t-str', text:'"accuracy"'},
    {a:'type', color:'t-var', text:': '},
    {a:'type', color:'t-num', text:'0.92'},
    {a:'type', color:'t-var', text:'}'},
    {a:'pause', ms:400},
    {a:'error', text:'  ← Not enough'},
    {a:'emotion', icon:'😕', text:'meh', ms:1500},
    {a:'pause', ms:500},
    {a:'delete', count:4},
    {a:'type', color:'t-num', text:'0.95'},
    {a:'pause', ms:400},
    {a:'error', text:'  ← Still low'},
    {a:'emotion', icon:'😒', text:'Damm...', ms:1500},
    {a:'pause', ms:500},
    {a:'delete', count:4},
    {a:'type', color:'t-num', text:'0.97'},
    {a:'clearerror'},
    {a:'newline'},
    {a:'success', text:'✓  Perfect.'},
    {a:'emotion', icon:'🔥', text:'yeeeeeee', ms:1500},
    {a:'deploy'},
  ],
];

let codeLines = [];
let currentLine = { html: '', error: '', success: '', comment: '' };

function render() {
  let out = '';
  codeLines.forEach(l => {
    out += `<div class="tl">${l.html || '&nbsp;'}</div>`;
    if (l.error) out += `<div class="tl t-err">${l.error}</div>`;
    if (l.success) out += `<div class="tl t-ok">${l.success}</div>`;
    if (l.comment) out += `<div class="tl t-cm">${l.comment}</div>`;
  });
  
  // Active line with blinking cursor
  out += `<div class="tl">${currentLine.html || ''}<span class="cursor-blink"></span></div>`;
  
  if (currentLine.error) out += `<div class="tl t-err">${currentLine.error}</div>`;
  if (currentLine.success) out += `<div class="tl t-ok">${currentLine.success}</div>`;
  if (currentLine.comment) out += `<div class="tl t-cm">${currentLine.comment}</div>`;
  T.innerHTML = out;
  T.parentElement.scrollTop = T.parentElement.scrollHeight;
}

function showThought(icon, text, duration = 3000) {
  return new Promise(async resolve => {
    const oldBubble = TS.querySelector('.thought-bubble');
    if (oldBubble) oldBubble.remove();
    
    NB.classList.add('pulse');
    const b = document.createElement('div');
    b.className = 'thought-bubble';
    b.innerHTML = `<span class="emo-icon">${icon}</span> <span>${text}</span>`;
    TS.appendChild(b);
    
    await wait(duration);
    b.classList.add('fade-out');
    NB.classList.remove('pulse');
    await wait(800);
    b.remove();
    resolve();
  });
}

function wait(ms) { return new Promise(r => setTimeout(r, ms)) }

async function typeText(color, text, speed) {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '\n') {
      codeLines.push({ ...currentLine });
      currentLine = { html: '', error: '', success: '', comment: '' };
    } else {
      currentLine.html += `<span class="${color}">${char === '<' ? '&lt;' : char === '>' ? '&gt;' : char}</span>`;
    }
    render();
    
    // Realistic variable typing speed
    let delay = speed;
    if (char === ' ' || char === '(' || char === ':') delay *= 2.5; // Punctuation pauses
    if (text.slice(i, i+3) === 'def' || text.slice(i, i+5) === 'async') delay *= 0.5; // Burst for keywords
    
    await wait(delay + Math.random() * 15);
  }
}

async function deleteChars(n) {
  for (let i = 0; i < n; i++) {
    currentLine.html = currentLine.html.replace(/<span[^>]*>[^<]*<\/span>(?![\s\S]*<span)/, '');
    render();
    await wait(DELETE_SPEED + Math.random() * 10);
  }
}

async function runScene(steps) {
  for (let step of steps) {
    switch(step.a) {
      case 'type': await typeText(step.color, step.text, step.speed || SPEED); break;
      case 'pause': await wait(step.ms); break;
      case 'error': 
        currentLine.error = `<span class="t-err-icon">✗</span> ${step.text}`; 
        render(); 
        break;
      case 'clearerror': 
        currentLine.error = ''; 
        if (codeLines.length) codeLines[codeLines.length - 1].error = '';
        render(); 
        break;
      case 'delete': await deleteChars(step.count); break;
      case 'newline': 
        codeLines.push({ ...currentLine });
        currentLine = { html: '', error: '', success: '', comment: '' };
        render(); 
        break;
      case 'success': 
        if (codeLines.length) codeLines[codeLines.length - 1].success = `<span class="t-ok-icon">✓</span> ${step.text}`;
        render(); 
        break;
      case 'comment': 
        currentLine.comment = step.text; 
        render(); 
        break;
      case 'emotion': await showThought(step.icon, step.text, step.ms); break;
      case 'deploy':
        await wait(500);
        await showThought('📦', 'Lets push it....', 3000);
        codeLines.push({html:'',error:'',success:'',comment:''});
        codeLines.push({html:'<span class="t-cm">——————————————————</span>',error:'',success:'',comment:''});
        render();await wait(600);
        codeLines.push({html:'<span class="t-kw">$ </span><span class="t-var">git push origin main</span>',error:'',success:'',comment:''});
        render();await wait(1000);
        await showThought('😍', 'Yes! Finally I done it!', 3500);
        codeLines.push({html:'<span class="t-cm">Deploying ...</span>',error:'',success:'',comment:''});
        render();await wait(1500);
        codeLines.push({html:'',success:'✓  Build successful · port 8000 · live 🚀',error:'',comment:''});
        render();await wait(4000);
        break;
    }
  }
}

async function loop() {
  while (true) {
    codeLines = [];
    currentLine = { html: '', error: '', success: '', comment: '' };
    TS.innerHTML = '';
    render();
    await wait(1000);
    for (let scene of scenes) {
      await runScene(scene);
      await wait(600);
    }
    await wait(2000);
  }
}
loop();

const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible') } });
}, { threshold: 0.12 });
reveals.forEach(r => obs.observe(r));

// --- CONTACT FORM AJAX ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Loading state
    btn.disabled = true;
    btn.innerHTML = '<span>⏳</span> <span>Sending...</span>';
    
    const formData = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        btn.innerHTML = '<span>✅</span> <span>Sent!</span>';
        contactForm.reset();
        await showThought('🚀', 'Message sent! I\'ll get back to you soon.', 4000);
      } else {
        throw new Error();
      }
    } catch (err) {
      btn.innerHTML = '<span>❌</span> <span>Error</span>';
      await showThought('⚠️', 'Oops! Something went wrong. Try again?', 4000);
    } finally {
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }, 3000);
    }
  });
}

// --- REUSABLE COVERFLOW GALLERY LOGIC ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

class CoverflowGallery {
  static instances = [];

  constructor(config) {
    this.toggleBtn = document.getElementById(config.toggleId);
    this.container = document.getElementById(config.containerId);
    this.stage = document.getElementById(config.stageId);
    this.scene = document.getElementById(config.sceneId);
    this.images = config.images;
    
    this.currentIdx = 0;
    this.autoRotateInterval = null;
    this.ecoCards = [];
    
    CoverflowGallery.instances.push(this);
    this.init();
  }

  init() {
    this.scene.innerHTML = '';
    
    this.images.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = 'eco-card';
      card.innerHTML = `
        <div class="eco-card-inner">
          <div class="eco-card-glare"></div>
          <img src="${src}" alt="Screenshot ${i+1}">
        </div>
      `;
      card.dataset.index = i;
      card.setAttribute('data-icon', '🖼️');
      card.setAttribute('data-label', 'View');
      this.scene.appendChild(card);
      this.ecoCards.push(card);
      
      card.addEventListener('click', () => {
        if (this.currentIdx === i) {
          lightboxImg.src = src;
          lightbox.classList.add('active');
          clearInterval(this.autoRotateInterval);
        } else {
          this.currentIdx = i;
          this.updateCarousel();
          this.startAutoRotate();
        }
      });
    });

    this.updateCarousel();

    this.toggleBtn.addEventListener('click', () => {
      const isCollapsed = this.container.classList.contains('collapsed');
      
      if (isCollapsed) {
        // Close all other open galleries
        CoverflowGallery.instances.forEach(gallery => {
          if (gallery !== this && !gallery.container.classList.contains('collapsed')) {
            gallery.container.classList.add('collapsed');
            gallery.toggleBtn.classList.remove('active');
            gallery.toggleBtn.querySelector('span').innerText = 'Explore Ecosystem Hub';
            clearInterval(gallery.autoRotateInterval);
          }
        });

        this.container.classList.remove('collapsed');
        this.toggleBtn.classList.add('active');
        this.toggleBtn.querySelector('span').innerText = 'Close Ecosystem Hub';
        setTimeout(() => { this.scene.style.opacity = '1'; }, 100);
        this.startAutoRotate();
      } else {
        this.container.classList.add('collapsed');
        this.toggleBtn.classList.remove('active');
        this.toggleBtn.querySelector('span').innerText = 'Explore Ecosystem Hub';
        clearInterval(this.autoRotateInterval);
      }
    });

    this.stage.addEventListener('mousemove', (e) => {
      if (this.container.classList.contains('collapsed')) return;
      const rect = this.stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.scene.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    });

    this.stage.addEventListener('mouseleave', () => {
      this.scene.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }

  updateCarousel() {
    const total = this.ecoCards.length;
    this.ecoCards.forEach((card, i) => {
      let offset = i - this.currentIdx;
      
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      
      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);
      
      let x = 0, z = 0, rotY = 0, opacity = 1, blur = 0, brightness = 1;
      
      if (offset === 0) {
        x = 0; z = 120; rotY = 0;
        opacity = 1; blur = 0; brightness = 1;
        card.style.zIndex = 100;
        card.classList.add('active');
      } else {
        x = sign * (130 + (absOffset - 1) * 70);
        z = -absOffset * 80;
        rotY = sign * -25;
        opacity = absOffset > 3 ? 0 : (1 - absOffset * 0.25);
        blur = absOffset * 1.5;
        brightness = 1 - (absOffset * 0.25);
        card.style.zIndex = 100 - absOffset;
        card.classList.remove('active');
      }
      
      card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg)`;
      card.style.opacity = opacity;
      card.style.filter = `blur(${blur}px) brightness(${brightness})`;
      card.style.pointerEvents = absOffset > 2 ? 'none' : 'auto';
    });
  }

  startAutoRotate() {
    clearInterval(this.autoRotateInterval);
    this.autoRotateInterval = setInterval(() => {
      this.currentIdx = (this.currentIdx + 1) % this.ecoCards.length;
      this.updateCarousel();
    }, 2500);
  }
}

// Instantiate Galleries
const cyberGallery = new CoverflowGallery({
  toggleId: 'cyberToggle',
  containerId: 'cyberContainer',
  stageId: 'cyberStage',
  sceneId: 'cyberScene',
  images: [
    "assets/cyber_app/01_Splash_Screen.png",
    "assets/cyber_app/02_loginScreen.png",
    "assets/cyber_app/03_Analysis_Loading.png",
    "assets/cyber_app/04_Analysis_Result.png",
    "assets/cyber_app/05_Dashboard_Screen.png",
    "assets/cyber_app/06_History_Screen.png",
    "assets/cyber_app/07_ML_Details_SHAP.png",
    "assets/cyber_app/02_Hoistory.png"
  ]
});

const campusGallery = new CoverflowGallery({
  toggleId: 'campusToggle',
  containerId: 'campusContainer',
  stageId: 'campusStage',
  sceneId: 'campusScene',
  images: [
    "assets/campus_app/02a_Student_Dashboard.png",
    "assets/campus_app/03b_QR_Attendance_System_student.png",
    "assets/campus_app/03b_QR_Attendance_System_faculty.png",
    "assets/campus_app/04_Student_Complaints.png",
    "assets/campus_app/05_Timetable_Editor.png",
    "assets/campus_app/06_SSM_Dashboard.png",
    "assets/campus_app/06_Principal_Dashboard_System_Reports.png",
    "assets/campus_app/07_Login_Screens_student.png",
    "assets/campus_app/07_Login_Screens_faculty.png",
    "assets/campus_app/08_Role_Selection.png"
  ]
});

const ssmGallery = new CoverflowGallery({
  toggleId: 'ssmToggle',
  containerId: 'ssmContainer',
  stageId: 'ssmStage',
  sceneId: 'ssmScene',
  images: [
    "assets/ssm_app/01_login_screen.png",
    "assets/ssm_app/02_Student_dashboard.png",
    "assets/ssm_app/03_ssm_ocr_screen.png",
    "assets/ssm_app/04_mentor_review.png",
    "assets/ssm_app/05_admin_screen.png",
    "assets/ssm_app/06_Tech_Stack_Diagram.png"
  ]
});

// Lightbox logic
document.querySelectorAll('.project-card img:not(.eco-card img)').forEach(img => {
  img.addEventListener('click', () => {
    if (img.classList.contains('global-rotating')) return;
    img.classList.add('global-rotating');
    
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    }, 300);
    
    setTimeout(() => { img.classList.remove('global-rotating'); }, 600);
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  // Resume animations for any open galleries
  if (!document.getElementById('campusContainer').classList.contains('collapsed')) {
    campusGallery.startAutoRotate();
  }
  if (!document.getElementById('ssmContainer').classList.contains('collapsed')) {
    ssmGallery.startAutoRotate();
  }
  if (!document.getElementById('cyberContainer').classList.contains('collapsed')) {
    cyberGallery.startAutoRotate();
  }
});


// Cursor Registration
function registerEcoHovers() {
  const els = document.querySelectorAll('.eco-card, .eco-toggle-btn');
  els.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width = '16px';
      cur.style.height = '16px';
      cur.style.opacity = '0.5';
      curRing.style.width = '52px';
      curRing.style.height = '52px';
      
      const icon = el.getAttribute('data-icon') || '🖼️';
      const label = el.getAttribute('data-label') || 'View';
      curLabel.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
      curLabel.style.opacity = '1';
      curLabel.style.transform = 'translate(25px, 25px) scale(1)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width = '10px';
      cur.style.height = '10px';
      cur.style.opacity = '1';
      curRing.style.width = '36px';
      curRing.style.height = '36px';
      curLabel.style.opacity = '0';
      curLabel.style.transform = 'translate(20px, 20px) scale(0.8)';
    });
  });
}
registerEcoHovers();



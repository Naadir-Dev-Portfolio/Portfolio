// script.js

/* ---------- DATA ---------- */
const DATA = {
  python: {
    desktop: [
      { title: "PyQt6 Financial Dashboard", img: "FinanceScreen.png", desc: "I developed an Interactive finance KPIs dashboard with automated data importing using the PyQt Framework for Python.", code: "https://github.com/Naadir-Dev-Portfolio/Desktop-PyQt6-finance-dashboard/blob/main/Ui_finance.py", demo: null, details: "https://github.com/Naadir-Dev-Portfolio/Desktop-PyQt6-finance-dashboard/blob/main/README.md" },
      { title: "YouTube Viewer Analytics", img: "yt_viewCountScreen.webp", desc: "I created a cross‑platform PyQt6 dashboard integrating the YouTube Data API to visualize channel view‑count trend.", code: "https://github.com/Naadir-Dev-Portfolio/Desktop-youtube-view-stats-dashboard/blob/main/main.py", demo: null, details: "https://github.com/Naadir-Dev-Portfolio/Desktop-youtube-view-stats-dashboard/blob/main/README.md" },
      { title: "PyQt6 Health Dashboard", img: "healthDashboardScreen.png", desc: "A Project where I've utilized OpenGL within a PyQt Health Dashboard for dynamic 3D model selection and dynamic metrics.", code: "https://github.com/Naadir-Dev-Portfolio/Desktop-PyQt6-health-dashboard/blob/main/Ui_health.py", demo: null, details: "https://github.com/Naadir-Dev-Portfolio/Desktop-PyQt6-health-dashboard/blob/main/README.md" },
      { title: "Mortgage Overpayment and Amortization Tracker", img: "mortgageTrackerScreen.webp", desc: "A Self-built mortgage amortization simulation tool with customizable overpayments analysis.", code: "https://github.com/Naadir-Dev-Portfolio/Desktop-Mortgage-overpayment-tracker/blob/main/main.py", demo: null, details: "https://github.com/Naadir-Dev-Portfolio/Desktop-Mortgage-overpayment-tracker/blob/main/README.md" }
    ],
    automation: [
      {
        title:  "Python / ExtendScript Export Pipeline", videoId:"JtVEtAiz0UU", desc:   "Fully Automated Illustrator Export Pipeline with Python", code: "https://github.com/Naadir-Dev-Portfolio/Automation-Illustrator-Export-Pipeline/blob/main/main.py", demo: null, details: "https://github.com/Naadir-Dev-Portfolio/Automation-Illustrator-Export-Pipeline/blob/main/README.md" }
    ], 
    trading: [

    ], quant: [

    ]
  },
  powerbi: {
    dashboards: [
      
    ],
    dataflow: [

    ]
  },
  ai:    { 
    generativeai: [
      { title: "CCMI Gen AI Chatbot", img: "ccmiChatbot_demo.webp", desc: "I leveraged the Gemini 1.5 flash model to build my own custom ChatGPT for my team.", code: "https://github.com/Naadir-Dev-Portfolio/Streamlit-ccmi-genai/blob/main/main.py", demo: "https://ccmi-genai-chat.streamlit.app/", details: "https://github.com/Naadir-Dev-Portfolio/Streamlit-ccmi-genai/blob/main/README.md" },
      { title: "AI Quiz Bot", img: "aiQuizbot.webp", desc: "Engineered AI Quiz Bot with Google Gemini 1.5-Flash for interactive learning.", code: "https://github.com/Naadir-Dev-Portfolio/Streamlit-AIQuizbot/blob/main/main.py", demo: "https://aiquizbot.streamlit.app/", details: "https://github.com/Naadir-Dev-Portfolio/Streamlit-AIQuizbot/blob/main/README.md" }
    ],
    prompt: [

    ] },
  web:   { 
    teamsites: [
      { title: "CCMI Team Website", img: "ccmisite_demo.webp", desc: "A front-end site I built to showcase the design and functionality for a professional data team.", code: "https://github.com/Naadir-Dev-Portfolio/Website-ccmi-team-site/tree/main", demo: "https://ccmiteamsite-by-naadir.netlify.app/", details: "https://github.com/Naadir-Dev-Portfolio/Website-ccmi-team-site/blob/main/README.md" } 

    ], 
    tools: [ 
      
    ], 
    cognitive: [
      { title: "Rain Drops Arithmetics Game", img: "raindropsScreen.webp", desc: "Rain Drops in Lumosity was my most favourite brain training game, So I built a replica. ", code: "https://github.com/Naadir-Dev-Portfolio/HTML5-Game-RainDrops/blob/main/index.html", demo: "https://raindrops-by-naadir.netlify.app/", details: "https://github.com/Naadir-Dev-Portfolio/HTML5-Game-RainDrops/blob/main/README.md" },
      { title: "Hexamatch Fractions Game", img: "hexamatchScreen.webp", desc: "I built this game to provide an engaging, way to develop intuitive understanding of fractions.", code: "https://github.com/Naadir-Dev-Portfolio/HTML5-Game-Hexamatch/blob/main/index.html", demo: "https://hexamatch-by-naadir.netlify.app/", details: "https://github.com/Naadir-Dev-Portfolio/HTML5-Game-Hexamatch/blob/main/README.md" },
      { title: "AlgebraVerse Algebra Game", img: "algebraverseScreen.webp", desc: "Progressive algebra challenges, I created this to relearn algebra.", code: "https://github.com/Naadir-Dev-Portfolio/HTML5-Game-Algebraverse/blob/main/index.html", demo: "https://algebraverse-by-naadir.netlify.app/", details: "https://github.com/Naadir-Dev-Portfolio/HTML5-Game-Algebraverse/blob/main/README.md" },
      { title: "Logic Grid Boolean Game", img: "logicgridscreen.webp", desc: "This game visualizes logic gates, I created it to improve Boolean reasoning.", code: "https://github.com/Naadir-Dev-Portfolio/HTML5-Game-LogicGrid/blob/main/index.html", demo: "https://logicgrid-by-naadir.netlify.app/", details: "https://github.com/Naadir-Dev-Portfolio/HTML5-Game-LogicGrid/blob/main/README.md" }
    ] },
  office365: {
    "vba-macros": [
      // Placeholder project example
     
    ],
    "power-automate": [
     
    ]
  },
  browserextensions: {
    "google-chrome": [
      
    ]
  }
};

/* ---------- Card templates ---------- */
const card = p => {
  // If this project has a YouTube ID, show thumbnail + play button
  if (p.videoId) {
    const thumb = `https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg`;
    return `
      <div class="card video-card" data-video-id="${p.videoId}">
        <div class="video-thumb">
          <img src="${thumb}" alt="${p.title}">
          <div class="play-overlay"></div>
        </div>
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.desc || ""}</p>
          <div class="card-links">
            ${p.demo    ? `<a href="${p.demo}"    target="_blank">Live</a>`    : ""}
            ${p.code    ? `<a href="${p.code}"    target="_blank">Code</a>`    : ""}
            ${p.details ? `<a href="${p.details}" target="_blank">Details →</a>` : ""}
          </div>
        </div>
      </div>`;
  }

  // Fallback for normal image-only cards
  return `
    <div class="card">
      <img src="images/${p.img}" alt="${p.title}">
      <div class="card-body">
        <h3>${p.title}</h3>
        <p>${p.desc || ""}</p>
        <div class="card-links">
          ${p.demo    ? `<a href="${p.demo}"    target="_blank">Live</a>`    : ""}
          ${p.code    ? `<a href="${p.code}"    target="_blank">Code</a>`    : ""}
          ${p.details ? `<a href="${p.details}" target="_blank">Details →</a>` : ""}
        </div>
      </div>
    </div>`;
};
/* ---------- Placeholder ---------- */
const placeholderCard = `
  <div class="card placeholder-card">
    <div class="card-body">
      <h3>Coming Soon</h3>
      <p>Projects arriving shortly.</p>
      <div class="card-links"><a style="visibility:hidden">btn</a></div>
    </div>
  </div>`;

/* ---------- Populate grids ---------- */
for (const [cat, subs] of Object.entries(DATA)) {
  for (const [sub, arr] of Object.entries(subs)) {
    const grid = document.getElementById(`grid-${cat}-${sub}`);
    if (!grid) continue;
    grid.innerHTML = arr.length? arr.map(card).join("") : placeholderCard;
  }
}

/* ---------- Slide helper ---------- */
function toggleSlide(el, open) {
  if (open) {
    el.classList.add("open");
  } else {
    el.classList.remove("open");
  }
}

/* ---------- Helpers ---------- */
const setActiveSub = li => {
  li.parentElement.querySelectorAll("li")
    .forEach(l=>l.classList.toggle("active", l===li));
};
const showPanel = (cat, sub) => {
  document.querySelectorAll(".tab-panel")
    .forEach(p=>p.classList.remove("active"));
  document.getElementById(`panel-${cat}-${sub}`)?.classList.add("active");
};

/* ---------- Primary tabs ---------- */
document.getElementById("proj-tabs").addEventListener("click", e=>{
  if(e.target.tagName!=="LI") return;
  const cat = e.target.dataset.target;
  const menu = document.getElementById(`sub-${cat}`);
  const open = menu.classList.contains("open");
  document.querySelectorAll("#proj-tabs li")
    .forEach(li=>li.classList.toggle("active", li===e.target));
  document.querySelectorAll(".sub-nav")
    .forEach(m=>m!==menu && toggleSlide(m,false));
  toggleSlide(menu, !open);
  if(!open){
    const first = menu.querySelector("li.active")||menu.querySelector("li");
    setActiveSub(first);
    showPanel(cat, first.dataset.subtarget);
  }
});

/* ---------- Sub-menus ---------- */
document.querySelectorAll(".sub-nav").forEach(menu=>{
  menu.addEventListener("click", e=>{
    if(e.target.tagName!=="LI") return;
    setActiveSub(e.target);
    const cat = menu.id.replace("sub-","");
    showPanel(cat, e.target.dataset.subtarget);
  });
});

/* ---------- Initial state ---------- */
const defaultCat = "python";
const defaultSub = "desktop";

document.querySelectorAll("#proj-tabs li").forEach(li => {
  li.classList.toggle("active", li.dataset.target === defaultCat);
});
document.querySelectorAll(`#sub-${defaultCat} li`).forEach(li => {
  li.classList.toggle("active", li.dataset.subtarget === defaultSub);
});

showPanel(defaultCat, defaultSub);
toggleSlide(document.getElementById(`sub-${defaultCat}`), true);

/* ---------- Books Carousel ---------- */
const BOOKS = [
  { title:"SMART OFFICE: How Anyone Can Harness AI to Work Better", img:"smartOffice.png", url:"https://amazon.com" },
  { title:"Prompt Playground: 1000 Easy & Entertaining AI Prompts", img:"prompt.png", url:"https://amazon.com" },
  { title:"Start Coding with AI: No Experience? No Problem.", img:"code.png", url:"https://amazon.com" },
  { title:"Cognitive Upgrade: Use AI to Learn Faster, Think Sharper", img:"cognitive.png", url:"https://amazon.com" }
];

const carouselTrack = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

// Create book cards with duplicates for seamless loop
const bookCards = [...BOOKS, ...BOOKS, ...BOOKS].map(book => `
  <div class="book-card">
    <a href="${book.url}" target="_blank">
      <img src="images/${book.img}" alt="${book.title}">
      <span>${book.title}</span>
    </a>
  </div>
`).join('');

carouselTrack.innerHTML = bookCards;

let currentPosition = 0;
let autoScrollInterval;
let scrollSpeed = 0.3; // pixels per frame
let targetSpeed = 0.3; // target speed for smooth acceleration/deceleration
const scrollInterval = 16; // ~60fps
const bookWidth = 300; // width of each book card
const gap = 32; // gap between books
const totalWidth = (bookWidth + gap) * BOOKS.length;
let isHovered = false;
let isDragging = false;
let dragStartX = 0;
let dragStartPosition = 0;
let lastDragTime = 0;
let lastDragX = 0;
let velocity = 0;
let isButtonPressed = false;

function updateCarousel() {
  if (!isDragging) {
    // Smoothly adjust speed to target speed
    scrollSpeed += (targetSpeed - scrollSpeed) * 0.1;
    currentPosition -= scrollSpeed;
  }

  // Reset position when reaching the end of the first set
  if (currentPosition <= -totalWidth) {
    currentPosition = 0;
  } else if (currentPosition > 0) {
    currentPosition = -totalWidth;
  }
  
  carouselTrack.style.transform = `translateX(${currentPosition}px)`;
}

function startAutoScroll() {
  if (!autoScrollInterval) {
    autoScrollInterval = setInterval(updateCarousel, scrollInterval);
  }
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = null;
}

function handleDragStart(e) {
  isDragging = true;
  dragStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  dragStartPosition = currentPosition;
  lastDragTime = Date.now();
  lastDragX = dragStartX;
  stopAutoScroll();
}

function handleDragMove(e) {
  if (!isDragging) return;
  
  const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const diff = dragStartX - currentX;
  currentPosition = dragStartPosition - diff;
  
  // Calculate velocity
  const currentTime = Date.now();
  const timeDiff = currentTime - lastDragTime;
  if (timeDiff > 0) {
    velocity = (lastDragX - currentX) / timeDiff;
    lastDragX = currentX;
    lastDragTime = currentTime;
  }
}

function handleDragEnd() {
  isDragging = false;
  
  // Apply momentum based on velocity
  if (Math.abs(velocity) > 0.1) {
    targetSpeed = velocity * 30;
    setTimeout(() => {
      targetSpeed = 0.3;
    }, 1000);
  }
  
  setTimeout(startAutoScroll, 1000);
}

// Initialize carousel
startAutoScroll();

// Mouse events
carouselTrack.addEventListener('mouseenter', () => {
  isHovered = true;
  targetSpeed = 0;
});

carouselTrack.addEventListener('mouseleave', () => {
  isHovered = false;
  targetSpeed = 0.3;
});

carouselTrack.addEventListener('mousedown', handleDragStart);
document.addEventListener('mousemove', handleDragMove);
document.addEventListener('mouseup', handleDragEnd);

// Touch events
carouselTrack.addEventListener('touchstart', handleDragStart);
document.addEventListener('touchmove', handleDragMove);
document.addEventListener('touchend', handleDragEnd);

// Handle book hover and click
carouselTrack.addEventListener('mouseover', (e) => {
  const bookCard = e.target.closest('.book-card');
  if (bookCard) {
    bookCard.classList.add('active');
  }
});

carouselTrack.addEventListener('mouseout', (e) => {
  const bookCard = e.target.closest('.book-card');
  if (bookCard) {
    bookCard.classList.remove('active');
  }
});

carouselTrack.addEventListener('click', (e) => {
  const bookCard = e.target.closest('.book-card');
  if (bookCard) {
    targetSpeed = 0;
    setTimeout(() => {
      targetSpeed = 0.3;
    }, 3000);
  }
});

// Handle manual navigation with speed control
prevButton.addEventListener('mousedown', () => {
  isButtonPressed = true;
  targetSpeed = -3.0;
});

nextButton.addEventListener('mousedown', () => {
  isButtonPressed = true;
  targetSpeed = 3.0;
});

// Reset speed when button is released
document.addEventListener('mouseup', () => {
  if (isButtonPressed) {
    isButtonPressed = false;
    targetSpeed = 0.3;
  }
});

// Touch events for buttons
prevButton.addEventListener('touchstart', () => {
  isButtonPressed = true;
  targetSpeed = -3.0;
});

nextButton.addEventListener('touchstart', () => {
  isButtonPressed = true;
  targetSpeed = 3.0;
});

document.addEventListener('touchend', () => {
  if (isButtonPressed) {
    isButtonPressed = false;
    targetSpeed = 0.3;
  }
});

/* ---------- Intersection reveal ---------- */
const obs = new IntersectionObserver((entries,o)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.classList.add("visible");
      o.unobserve(ent.target);
    }
  });
},{threshold:0.18});
document.querySelectorAll(".reveal-left, .reveal-right, .reveal-fade, .about-fade")
  .forEach(el=>obs.observe(el));

/* ---------- Year & hamburger ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", ()=>{
  const exp = navToggle.getAttribute("aria-expanded")==="true";
  navToggle.setAttribute("aria-expanded", !exp);
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("show");
});
navLinks.querySelectorAll("a").forEach(a=>
  a.addEventListener("click", ()=>{
    if(window.innerWidth<=600){
      navToggle.setAttribute("aria-expanded","false");
      navToggle.classList.remove("open");
      navLinks.classList.remove("show");
    }
  })
);


// ——— Play YouTube in-place when you click the thumbnail ———
document.querySelectorAll(".video-card").forEach(cardEl => {
  cardEl.addEventListener("click", () => {
    const id = cardEl.dataset.videoId;
    // build the iframe + body
    cardEl.innerHTML = `
      <iframe
        width="100%"
        height="180"
        src="https://www.youtube.com/embed/${id}?autoplay=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>
      <div class="card-body">
        ${cardEl.querySelector(".card-body").innerHTML}
      </div>
    `;
  });
});

// Smooth scroll to element by id with optional offset
function smoothScrollToId(id, offset = 0) {
  const el = document.getElementById(id);
  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Expand AI assistant toggle button if collapsed
function expandAIAssistant() {
  const aiContainer = document.getElementById('naadirs-ai-assistant-container');
  if (!aiContainer) return;
  const toggler = aiContainer.querySelector('.ai-assistant-toggler');
  if (toggler && toggler.getAttribute('aria-expanded') === 'false') {
    toggler.click();
  }
}

// Event listener for "View my projects below" link
document.addEventListener('DOMContentLoaded', () => {
  const viewProjectsLink = document.getElementById('view-projects-link');
  if (viewProjectsLink) {
    viewProjectsLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollToId('projects');
    });
  }

  function scrollToAndExpandAI() {
    smoothScrollToId('naadirs-ai-assistant-container', -200);
    setTimeout(() => {
      expandAIAssistant();
      setTimeout(() => {
        const aiContainer = document.getElementById('naadirs-ai-assistant-container');
        if (aiContainer) {
          const rect = aiContainer.getBoundingClientRect();
          if (rect.top < 0) {
            window.scrollBy({ top: rect.top - 400, behavior: 'smooth' });
          }
        }
      }, 300);
    }, 600);
  }

  // Event listener for "AI assistant" link
  const viewAIAssistantLink = document.getElementById('view-ai-assistant-link');
  if (viewAIAssistantLink) {
    viewAIAssistantLink.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToAndExpandAI();
    });
  }
});

// Smooth scroll to element by id with optional offset
function smoothScrollToId(id, offset = 0) {
  const el = document.getElementById(id);
  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Expand AI assistant toggle button if collapsed
function expandAIAssistant() {
  const aiContainer = document.getElementById('naadirs-ai-assistant-container');
  if (!aiContainer) return;
  const toggler = aiContainer.querySelector('.ai-assistant-toggler');
  if (toggler && toggler.getAttribute('aria-expanded') === 'false') {
    toggler.click();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Event listener for "View my projects below" link
  const viewProjectsLink = document.getElementById('view-projects-link');
  if (viewProjectsLink) {
    viewProjectsLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollToId('projects');
    });
  }

  function scrollToAndExpandAI() {
    smoothScrollToId('naadirs-ai-assistant-container', -100);
    setTimeout(() => {
      expandAIAssistant();
      setTimeout(() => {
        const aiContainer = document.getElementById('naadirs-ai-assistant-container');
        if (aiContainer) {
          const rect = aiContainer.getBoundingClientRect();
          if (rect.top < 0) {
            window.scrollBy({ top: rect.top - 400, behavior: 'smooth' });
          }
        }
      }, 300);
    }, 600);
  }

  // Event listener for "AI assistant" link
  const viewAIAssistantLink = document.getElementById('view-ai-assistant-link');
  if (viewAIAssistantLink) {
    viewAIAssistantLink.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToAndExpandAI();
    });
  }

  // Event listener for nav bar "AI" link (replacing W.I.P)
  const navAILink = document.getElementById('nav-ai-link');
  if (navAILink) {
    navAILink.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToAndExpandAI();
    });
  }
});

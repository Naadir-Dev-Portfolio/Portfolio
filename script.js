// script.js

/* ---------- DATA ---------- */
const DATA = {
  python: {
    desktop: [
      { title: "Financial Dashboard", img: "financeDashboard.jpg", desc: "Interactive finance KPIs with drill-down charts in PyQt6.", code: "https://github.com/yourhandle/finance-dashboard", demo: null, details: "#" },
      { title: "Desktop AI Assistant", img: "png2.png", desc: "Gemini-powered desktop assistant & quick-launch tool.", code: "https://github.com/yourhandle/desktop-ai", demo: null, details: "#" }
    ],
    automation: [

    ], 
    trading: [

    ], quant: [

    ]
  },
  powerbi: {
    dashboards: [
      { title: "Sales KPI Dashboard", img: "png3.png", desc: "Power BI report with drill-through & RLS.", code: null, demo: null, details: "#" }
    ],
    dataflow: [

    ]
  },
  ai:    { 
    chatbots: [

    ],
    prompt: [

    ] },
  web:   { 
    teamsites: [

    ], 
    tools: [ 
      { title: "Admin Task Automator", img: "png5.png", desc: "Python scripts automating bulk data-entry jobs.", code: null, demo: null, details: "#" } 
    ], 
    cognitive: [
      { title: "Arithmetic Brain Training Game", img: "rainGameScreenCapture.jpg", desc: "Rain Drops in Lumosity was my most favourite brain training game, So I built a replica. ", code: "https://github.com/Naadir-Dev-Portfolio/maths-rain-drops/blob/main/index.html", demo: "mathraindrops-by-naadir.netlify.app", details: null }
      { title: "Hexamatch Fractions Game", img: "hexamatchScreenCapture.jpg", desc: "I built this game to provide an engaging, hands-on way for beginners to develop intuitive understanding of fractions by matching hexagon values to a target before time runs out. ", code: "https://github.com/Naadir-Dev-Portfolio/HexamatchFractions/blob/main/hexamatch.html", demo: "hexamatch-by-naadir.netlify.app", details: null }
    ] }
};

/* ---------- Card templates ---------- */
const card = p => `
  <div class="card">
    <img src="images/${p.img}" alt="${p.title}">
    <div class="card-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="card-links">
        ${p.demo ? `<a href="${p.demo}" target="_blank">Live</a>` : ""}
        ${p.code ? `<a href="${p.code}" target="_blank">Code</a>` : ""}
        ${p.details ? `<a href="${p.details}" target="_blank">Details →</a>` : ""}
      </div>
    </div>
  </div>`;

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
showPanel("python","desktop");
toggleSlide(document.getElementById("sub-python"), true);

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

// Typewriter effect for headline
const typewriterText = "Naadir Duglas";
const typewriterElement = document.getElementById("typewriter");
const cursorElement = document.querySelector(".typewriter-cursor");
let typeIndex = 0;

function typeWriter() {
  if (typeIndex <= typewriterText.length) {
    typewriterElement.textContent = typewriterText.slice(0, typeIndex);
    typeIndex++;
    setTimeout(typeWriter, 120); // typing speed
  }
}
typeWriter();

// Typewriter effect for About Me description
const aboutText = "With hands-on experience managing developer teams and owning end-to-end projects, I specialize in automating administrative workflows. From custom Excel and Python applications to real-time dashboards and AI integrations, I deliver reliable, one-click solutions that reclaim time, uphold data accuracy, and drive operational excellence.";
const aboutTypewriter = document.getElementById("about-typewriter");
let aboutIndex = 0;

function typeAbout() {
  if (aboutIndex <= aboutText.length) {
    aboutTypewriter.textContent = aboutText.slice(0, aboutIndex);
    aboutIndex++;
    setTimeout(typeAbout, 18); // Adjust speed as desired
  }
}
typeAbout();

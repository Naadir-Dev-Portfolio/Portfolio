// Load JSON and populate both grids
async function init() {
  await loadProjects();
  await loadBooks();
  setupThemeToggle();
  handleScroll();
  setFooterYear();
}

// Projects
async function loadProjects() {
  const res = await fetch('data/projects.json');
  const projects = await res.json();
  const grid = document.getElementById('projectsGrid');

  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="images/${p.img}" alt="${p.title}">
      <div class="card-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="card-links">
          ${p.demo?`<a href="${p.demo}" target="_blank">Live</a>`:''}
          ${p.code?`<a href="${p.code}" target="_blank">Code</a>`:''}
          <a href="projects/${p.slug}.html">Details →</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// Books
async function loadBooks() {
  const res = await fetch('data/books.json');
  const books = await res.json();
  const grid = document.getElementById('booksGrid');

  books.forEach(b => {
    const img = document.createElement('img');
    img.src = `images/${b.img}`;
    img.alt = b.title;
    grid.appendChild(img);
  });
}

// Theme toggle
function setupThemeToggle() {
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// Scroll behaviors
function handleScroll() {
  const arrow = document.querySelector('.scroll-down');
  const box   = document.querySelector('.content-box');
  window.addEventListener('scroll', () => {
    arrow.classList.toggle('hide', window.scrollY > 100);
    if (window.scrollY > 50) {
      box.style.transform = 'translateY(0)';
      box.style.opacity   = '1';
    }
  });
}

// Footer year
function setFooterYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  // hide content-box initially
  const box = document.querySelector('.content-box');
  box.style.transform  = 'translateY(-150px)';
  box.style.opacity    = '0';
  box.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
  init();
});
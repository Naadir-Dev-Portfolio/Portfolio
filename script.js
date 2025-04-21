/* ---------- DATA ---------- */
const DATA = {
  python: [
    { title: 'Financial Health Dashboard', img: 'png1.png', desc: 'Interactive finance KPIs with drill‑down charts in PyQt6.', code: 'https://github.com/yourhandle/finance-dashboard', demo: null, details: 'https://example.com' },
    { title: 'Desktop AI Assistant',        img: 'png2.png', desc: 'Gemini‑powered desktop assistant & quick‑launch tool.',    code: 'https://github.com/yourhandle/desktop-ai',        demo: null, details: 'https://example.com' },
    { title: 'Streamlit Chatbot',           img: 'png4.png', desc: 'Custom persona chatbot powered by Gemini API.',            code: 'https://github.com/yourhandle/streamlit-chatbot', demo: 'https://your-streamlit-url', details: 'https://example.com' }
  ],
  powerbi: [
    { title: 'Sales KPI Dashboard',         img: 'png3.png', desc: 'Power BI report with drill‑through & RLS.',                code: null, demo: null, details: 'https://example.com' }
  ],
  ai:    [],
  pyqt:  [],
  mobile:[],
  misc:  [
    { title: 'Admin Task Automator', img: 'png5.png', desc: 'Python scripts automating bulk data‑entry jobs.', code: null, demo: null, details: 'https://example.com' }
  ]
};

const BOOKS = [
  { title: 'SMART OFFICE: How Anyone Can Harness AI to Work Better', img: 'smartOffice.png', url: 'https://amazon.com' },
  { title: 'Prompt Playground: 1000 Easy & Entertaining AI Prompts for Everyone',       img: 'prompt.png', url: 'https://amazon.com' },
  { title: 'Start Coding with AI: No Experience? No Problem.',        img: 'code.png', url: 'https://amazon.com' },
  { title: 'Cognitive Upgrade: Use AI to Learn Faster, Think Sharper, Do More',        img: 'cognitive.png', url: 'https://amazon.com' }
];

/* ---------- Render helpers ---------- */
const projectCard = p => `
  <div class="card">
    <img src="images/${p.img}" alt="${p.title}">
    <div class="card-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="card-links">
        ${p.demo ? `<a href="${p.demo}" target="_blank">Live</a>`   : ''}
        ${p.code ? `<a href="${p.code}" target="_blank">Code</a>`   : ''}
        <a href="${p.details}" target="_blank">Details →</a>
      </div>
    </div>
  </div>`;

/* populate project grids */
for (const cat in DATA) {
  const grid = document.getElementById(`grid-${cat}`);
  if (!grid) continue;
  grid.innerHTML = DATA[cat].length
    ? DATA[cat].map(projectCard).join('')
    : '<p class="placeholder">Coming soon.</p>';
}

/* populate books */
document.getElementById('booksGrid').innerHTML =
  BOOKS.map(b => `
    <div class="book-card">
      <a href="${b.url}" target="_blank">
        <img src="images/${b.img}" alt="${b.title}">
        <span>${b.title}</span>
      </a>
    </div>`).join('');

/* tab switcher */
document.getElementById('proj-tabs').addEventListener('click', e => {
  if (e.target.tagName !== 'LI') return;
  const target = e.target.dataset.target;
  e.currentTarget.querySelectorAll('li').forEach(li =>
    li.classList.toggle('active', li === e.target)
  );
  document.querySelectorAll('#projects .tab-panel').forEach(p =>
    p.classList.toggle('active', p.id === `panel-${target}`)
  );
});

/* intersection‑observer reveals */
const obs = new IntersectionObserver(entries => {
  entries.forEach(ent => {
    if (ent.isIntersecting) {
      ent.target.classList.add('visible');
      obs.unobserve(ent.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.content-box, .reveal-left, .reveal-right')
        .forEach(el => obs.observe(el));

/* current year */
document.getElementById('year').textContent = new Date().getFullYear();

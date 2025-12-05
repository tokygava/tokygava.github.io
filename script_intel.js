// === Тёмная тема (localStorage) ===
(() => {
  const key = 'theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const saved = localStorage.getItem(key);
  const initial = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);

  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(key, next);
  });
})();

// === Мобильное меню ===
(() => {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
})();

// === Продукты Intel (фильтр + поиск) ===
(() => {
  const products = [
    {
      name: 'Intel Core i5‑12400F',
      type: 'desktop',
      meta: '6 ядер • LGA1700 • до 4.4 ГГц',
      desc: 'Популярный процессор для игровых и домашних ПК.',
      year: 2022
    },
    {
      name: 'Intel Core i7‑13700K',
      type: 'desktop',
      meta: '16 ядер (8P+8E) • LGA1700 • до 5.4 ГГц',
      desc: 'Мощный вариант для гейминга и стриминга.',
      year: 2022
    },
    {
      name: 'Intel Core i9‑14900K',
      type: 'desktop',
      meta: '24 ядра (8P+16E) • LGA1700 • до 6.0 ГГц',
      desc: 'Флагман для максимально требовательных задач.',
      year: 2023
    },
    {
      name: 'Intel Core i5‑13500H',
      type: 'laptop',
      meta: '12 ядер (4P+8E) • мобильный • до 4.7 ГГц',
      desc: 'Процессор для тонких и лёгких ноутбуков.',
      year: 2023
    },
    {
      name: 'Intel Core Ultra 7 155H',
      type: 'laptop',
      meta: '16 ядер • NPU • ориентирован на задачи ИИ',
      desc: 'Мобильный чип нового поколения с упором на ИИ‑нагрузки.',
      year: 2024
    },
    {
      name: 'Intel Xeon Gold 6430',
      type: 'server',
      meta: '32 ядра • LGA4677 • до 3.6 ГГц',
      desc: 'Серверный процессор для рабочих станций и ЦОД.',
      year: 2022
    },
    {
      name: 'Intel Xeon Platinum 8480+',
      type: 'server',
      meta: '56 ядер • LGA4677 • до 3.8 ГГц',
      desc: 'Для нагруженных серверных задач и виртуализации.',
      year: 2023
    }
  ];

  const grid   = document.getElementById('product-grid');
  const empty  = document.getElementById('product-empty');
  const tmpl   = document.getElementById('product-card-template');
  const search = document.getElementById('search');
  const pills  = [...document.querySelectorAll('.pill')];

  if (!grid || !empty || !tmpl || !search || !pills.length) return;

  const icons = {
  desktop: '<img src="icons8-intel.png" width="26" height="26">',
  laptop:  '<img src="icons8-ноутбук-50.png" width="26" height="26">',
  server:  '<img src="icons8-database-50_intel.png" width="26" height="26">'
};





  let state = { filter: 'all', query: '' };

  function render() {
    grid.innerHTML = '';

    const list = products.filter(p =>
      (state.filter === 'all' || p.type === state.filter) &&
      p.name.toLowerCase().includes(state.query)
    );

    if (!list.length) {
      empty.classList.remove('hidden');
      return;
    }

    empty.classList.add('hidden');

    const fragment = document.createDocumentFragment();

    list.forEach(p => {
      const node = tmpl.content.cloneNode(true);
      const card = node.querySelector('.card');
      card.dataset.type = p.type;

      const iconEl = node.querySelector('.product-icon');
      iconEl.innerHTML = icons[p.type];


      node.querySelector('.card-title').textContent = p.name;
      node.querySelector('.card-meta').textContent  = `${p.meta} • ${p.year}`;
      node.querySelector('.card-desc').textContent  = p.desc;

      fragment.appendChild(node);
    });

    grid.appendChild(fragment);
  }

  pills.forEach(btn => {
    btn.addEventListener('click', () => {
      pills.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      state.filter = btn.dataset.filter || 'all';

      render();
    });
  });

  search.addEventListener('input', e => {
    state.query = e.target.value.toLowerCase().trim();
    render();
  });

  render();
})();

// === Кнопка "наверх" ===
(() => {
  const btn = document.querySelector('.to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

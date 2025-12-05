// === Тёмная тема (сохранение в localStorage) ===
(() => {
  const key = 'theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Устанавливает тему при загрузке
  const saved = localStorage.getItem(key);
  const initial = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);

  // Кнопка переключения
  const btn = document.querySelector('.theme-toggle');
  btn?.addEventListener('click', () => {
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

// === Продукты (фильтр + поиск) ===
(() => {

  const products = [
    { name: 'Ryzen 5 5600', type: 'cpu', meta: '6 ядер • Сокет AM4 • 3.5 ГГц - 4.4 ГГц', desc: 'Популярный игровой CPU', year: 2020 },
    { name: 'Ryzen 9 7950X', type: 'cpu', meta: '16 ядер • Сокет AM5 • 4.5 ГГц - 5.7 ГГц', desc: 'Флагман', year: 2022 },
    { name: 'Ryzen 7 9700X', type: 'cpu', meta: '8 ядер • Сокет AM5 • 3.8 ГГц - 5.5 ГГц', desc: 'Популярный игровой CPU', year: 2022 },
    { name: 'EPYC 9654', type: 'server', meta: '96 ядер • Сокет SP5 • 3.5 ГГц - 4.4 ГГц', desc: 'Серверный процессор', year: 2022 },
    { name: 'AMD Ryzen Threadripper PRO 7995WX', type: 'server', meta: '96 ядер • Сокет sTR5 • 2.5 ГГц или до 5.1 ГГц в режиме Turbo', desc: 'Серверный процессор', year: 2023  },
    { name: 'AMD Ryzen Threadripper PRO 5975WX', type: 'server', meta: '32 ядер • Сокет sWRX8 • 3.6 ГГц - 4.5', desc: 'Серверный процессор', year: 2022 },
  ];

  const grid  = document.getElementById('product-grid');
  const empty = document.getElementById('product-empty');
  const tmpl  = document.getElementById('product-card-template');
  const search = document.getElementById('search');
  const pills = [...document.querySelectorAll('.pill')];

  const icons = {
    cpu:`<img src="file:///C:/Users/user/Project/icons8-processor-48.png" width="26" height="26" alt="">`,
    server:`<img src="file:///C:/Users/user/Project/icons8-database-50.png" width="26" height="26" alt="">`
  };

  let state = { filter: 'all', query: '' };

  function render() {
    grid.innerHTML = '';

    const list = products.filter(p =>
      (state.filter === 'all' || p.type === state.filter) &&
      (p.name.toLowerCase().includes(state.query))
    );

    if (!list.length) {
      empty.classList.remove('hidden');
      return;
    }

    empty.classList.add('hidden');

    const f = document.createDocumentFragment();
    list.forEach(p=>{
      const n = tmpl.content.cloneNode(true);
      n.querySelector('.product-icon').innerHTML = icons[p.type];
      n.querySelector('.card-title').textContent = p.name;
      n.querySelector('.card-meta').textContent = `${p.meta} • ${p.year}`;
      n.querySelector('.card-desc').textContent = p.desc;
      f.appendChild(n);
    });

    grid.appendChild(f);
  }

  pills.forEach(btn=>{
    btn.addEventListener('click',()=>{
      pills.forEach(b=>b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.filter = btn.dataset.filter;
      render();
    });
  });

  search.addEventListener('input', e=>{
    state.query = e.target.value.toLowerCase().trim();
    render();
  });

  render();
})();

// === Кнопка "наверх" ===
(() => {
  const btn = document.querySelector('.to-top');
  window.addEventListener('scroll',()=>{
    btn.classList.toggle('show', window.scrollY > 600);
  });
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

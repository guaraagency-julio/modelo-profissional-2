(() => {
  const list = document.querySelector('[role="tablist"][aria-label="Fases da pele"]');
  const panel = document.querySelector('[role="tabpanel"]');
  if (!list || !panel) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const content = {
    '20': { title: 'Construindo bons hábitos', text: 'O cuidado pode começar por uma rotina simples, com limpeza adequada, hidratação e proteção solar. Acne e oleosidade também podem ser avaliadas de acordo com as necessidades da sua pele.', items: ['Acne e oleosidade', 'Rotina personalizada', 'Proteção solar diária'] },
    '30': { title: 'Prevenção e cuidado contínuo', text: 'Nesta fase, a avaliação pode considerar manchas, textura e os primeiros sinais de expressão. Uma rotina individualizada ajuda a manter a saúde da pele no dia a dia.', items: ['Manchas e tonalidade', 'Textura da pele', 'Prevenção personalizada'] },
    '40': { title: 'Atenção às mudanças da pele', text: 'Com o passar do tempo, a pele pode apresentar alterações de firmeza, hidratação e textura. A consulta permite entender essas mudanças e conversar sobre opções adequadas a cada pessoa.', items: ['Hidratação e viço', 'Firmeza e textura', 'Avaliação individual'] },
    '50': { title: 'Cuidado em todas as fases', text: 'A pele madura pode precisar de atenção especial à hidratação e à sensibilidade. O acompanhamento considera o histórico, as mudanças hormonais e as prioridades de cada pessoa.', items: ['Pele madura', 'Hidratação e conforto', 'Acompanhamento contínuo'] }
  };
  const select = (tab, focus = false) => {
    const age = tab.id.replace('tab-', '');
    const data = content[age];
    if (!data) return;
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.setAttribute('tabindex', selected ? '0' : '-1');
      item.setAttribute('aria-controls', 'skin-age-panel');
      item.classList.toggle('text-cream', selected);
      item.classList.toggle('text-wine/60', !selected);
      item.classList.toggle('hover:text-wine', !selected);
      let highlight = item.querySelector('[data-tab-highlight]');
      if (selected && !highlight) {
        highlight = document.createElement('span');
        highlight.dataset.tabHighlight = '';
        highlight.setAttribute('aria-hidden', 'true');
        highlight.className = 'absolute inset-0 rounded-full bg-wine shadow-[0_10px_30px_-12px_rgba(83,31,42,0.6)]';
        item.prepend(highlight);
      } else if (!selected && highlight) highlight.remove();
    });
    panel.id = 'skin-age-panel';
    panel.setAttribute('aria-labelledby', tab.id);
    panel.querySelector('h3').textContent = data.title;
    panel.querySelector('p').textContent = data.text;
    panel.querySelector('[aria-hidden="true"]').textContent = age + '+';
    panel.querySelectorAll('li').forEach((li, i) => { li.lastElementChild.textContent = data.items[i]; });
    if (focus) tab.focus();
  };
  const original = tabs[0].querySelector('span.absolute');
  if (original) original.dataset.tabHighlight = '';
  tabs.forEach(tab => tab.addEventListener('click', () => select(tab)));
  list.addEventListener('keydown', event => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0 || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    select(tabs[index], true);
  });
  select(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
})();

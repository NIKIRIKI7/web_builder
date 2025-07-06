export default function(rootElement: HTMLElement) {
  const filterButtons = Array.from(rootElement.querySelectorAll<HTMLButtonElement>('.filtered-grid__filter-btn'));
  const items = Array.from(rootElement.querySelectorAll<HTMLElement>('.filtered-grid__item'));
  const itemsContainer = rootElement.querySelector<HTMLElement>('.filtered-grid__items');

  if (filterButtons.length === 0 || items.length === 0 || !itemsContainer) return;

  let activeButton = filterButtons.find(btn => btn.dataset.filter === 'all') || filterButtons[0];
  if (activeButton) {
    activeButton.classList.add('is-active');
  }

  const filterItems = (filter: string | undefined) => {
    items.forEach(item => {
      const category = item.dataset.category;
      const shouldShow = filter === 'all' || filter === category;
      item.classList.toggle('is-hidden', !shouldShow);
    });
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      if (activeButton) {
        activeButton.classList.remove('is-active');
      }
      button.classList.add('is-active');
      activeButton = button;

      filterItems(filter);
    });
  });

  filterItems(activeButton.dataset.filter);
}
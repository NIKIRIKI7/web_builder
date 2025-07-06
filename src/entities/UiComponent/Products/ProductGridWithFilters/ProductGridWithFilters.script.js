export default function(rootElement) {
  const filterButtons = Array.from(rootElement.querySelectorAll('.filtered-grid__filter-btn'));
  const items = Array.from(rootElement.querySelectorAll('.filtered-grid__item'));
  const itemsContainer = rootElement.querySelector('.filtered-grid__items');

  if (filterButtons.length === 0 || items.length === 0 || !itemsContainer) return;

  let activeButton = filterButtons.find(btn => btn.dataset.filter === 'all') || filterButtons[0];
  if (activeButton) {
    activeButton.classList.add('is-active');
  }

  const filterItems = (filter) => {
    items.forEach(item => {
      const category = item.dataset.category;
      const shouldShow = filter === 'all' || !filter || filter === category;
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

  if (activeButton) {
    filterItems(activeButton.dataset.filter);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeBtn = document.querySelector('.header__theme--btn');
  const header = document.querySelector('.header');
  const main = document.querySelector('.main');
  const menuBtn = document.querySelector('.header__menu--btn');
  const menuList = document.querySelector('.header__list');
  const menuLinks = document.querySelectorAll('.header__link');
  
  // Theme toggle
  if (themeBtn && header) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      header.classList.add(savedTheme);
      updateThemeIcons(savedTheme === 'dark');
      main.classList.add(savedTheme);
      updateThemeIcons(savedTheme === 'dark');
    }
    
    themeBtn.addEventListener('click', () => {
      const isDark = header.classList.toggle('dark');
      main.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
    });
  }
  
  function updateThemeIcons(isDark) {
    const lightLogo = document.querySelector('.header__logo--light');
    const darkLogo = document.querySelector('.header__logo--dark');
    const lightThemeIcon = document.querySelector('.header__theme--light');
    const darkThemeIcon = document.querySelector('.header__theme--dark');
    const lightClientsItem = document.querySelectorAll('.clients__item--light');
    const darkClientsItem = document.querySelectorAll('.clients__item--dark');
    
    [lightLogo, lightThemeIcon].forEach(el => {
      if (el) el.style.display = isDark ? 'none' : 'block';
    });
    
    [darkLogo, darkThemeIcon].forEach(el => {
      if (el) el.style.display = isDark ? 'block' : 'none';
    });

    lightClientsItem.forEach(el => {
      el.style.display = isDark ? 'none' : 'block';
    });

    darkClientsItem.forEach(el => {
      el.style.display = isDark ? 'block' : 'none';
    });
    
  }
  
  // Mobile menu toggle
  if (menuBtn && menuList) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      menuBtn.classList.toggle('active');
      menuList.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.classList.remove('active');
        menuList.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.classList.remove('active');
        menuList.classList.remove('active');
      }
    });
  }
});


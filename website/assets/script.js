(function () {
  const langToggle = document.getElementById('langToggle');
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  let currentLang = 'en';

  function applyTranslations(lang) {
    const strings = translations[lang];
    if (!strings) return;

    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (strings[key]) {
        if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
          node.setAttribute('placeholder', strings[key]);
        } else if (node.tagName === 'OPTION') {
          node.textContent = strings[key];
        } else {
          node.textContent = strings[key];
        }
      }
    });

    const heroCTA = document.querySelector('.hero .primary');
    if (heroCTA) heroCTA.setAttribute('aria-label', strings['hero.cta']);

    langToggle.textContent = lang === 'en' ? '日本語' : 'EN';
  }

  function setLanguage(lang) {
    currentLang = lang;
    applyTranslations(lang);
  }

  langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'ja' : 'en');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';
    status.classList.remove('error', 'success');

    const requiredFields = ['name', 'email', 'organization', 'interest', 'message'];
    const missing = requiredFields.some((id) => {
      const field = document.getElementById(id);
      return !field.value.trim();
    });

    if (missing) {
      status.classList.add('error');
      status.textContent = translations[currentLang]['contact.form.error'];
      return;
    }

    form.reset();
    status.classList.add('success');
    status.textContent = translations[currentLang]['contact.form.success'];
  });

  setLanguage('en');
})();

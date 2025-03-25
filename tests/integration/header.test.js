import { fireEvent } from '@testing-library/dom';

describe('Header Component', () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <div id="header-placeholder"></div>
    `;
    
    const headerHtml = await fetch('/components/header.html').then(r => r.text());
    document.getElementById('header-placeholder').innerHTML = headerHtml;
  });

  test('navigation links work correctly', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    expect(navLinks.length).toBeGreaterThan(0);
    
    navLinks.forEach(link => {
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });

  test('language switcher changes language', () => {
    const langSwitcher = document.querySelector('.lang-switcher');
    expect(langSwitcher).toBeTruthy();
    
    fireEvent.change(langSwitcher, { target: { value: 'zh' } });
    expect(langSwitcher.value).toBe('zh');
  });
}); 
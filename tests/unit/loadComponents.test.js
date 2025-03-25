import { loadComponent } from '../../src/js/utils/loadComponents';

describe('loadComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="header-placeholder"></div>
      <div id="footer-placeholder"></div>
    `;
    fetch.mockClear();
  });

  test('loads component content into placeholder', async () => {
    const mockHtml = '<header>Test Header</header>';
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(mockHtml)
      })
    );

    await loadComponent('header-placeholder', '/components/header.html');
    expect(document.getElementById('header-placeholder').innerHTML).toBe(mockHtml);
  });

  test('handles fetch errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    fetch.mockImplementationOnce(() => Promise.reject('Network error'));

    await loadComponent('header-placeholder', '/components/header.html');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
}); 
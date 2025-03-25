function loadComponent(elementId, componentPath) {
  const element = document.getElementById(elementId);
  if (element) {
    fetch(componentPath)
      .then(response => response.text())
      .then(html => {
        element.innerHTML = html;
        // Dispatch event when component is loaded
        window.dispatchEvent(new CustomEvent(`${elementId}Loaded`));
      })
      .catch(error => console.error(`Error loading ${componentPath}:`, error));
  }
}

// Usage example:
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header-placeholder', '/components/header.html');
  loadComponent('footer-placeholder', '/components/footer.html');
}); 
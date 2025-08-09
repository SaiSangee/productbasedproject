document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("spa-container");

  // Get subdomain (assumes format like client1.example.com)
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0]; // naive method, can improve

  // Path to the domain-specific SPA content (HTML snippets)
  const spaPath = `/spa/${subdomain}.html`;

  // Load and inject SPA
  fetch(spaPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`SPA not found for: ${subdomain}`);
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
    })
    .catch(error => {
      container.innerHTML = `
        <div class="text-red-600 font-bold">
          Failed to load SPA for <code>${subdomain}</code>: ${error.message}
        </div>`;
      console.error("Error loading SPA:", error);
    });
});

// Smooth scroll for navbar links
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-links a");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Simple contact form submission
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }

  // Load projects
  loadProjects();
});

// Fetch and display projects
async function loadProjects() {
  try {
    const projectGrid = document.getElementById("project-grid");

    // Check if element exists
    if (!projectGrid) {
      console.error("project-grid element not found!");
      return;
    }

    const response = await fetch("./data.json");
    const data = await response.json();

    data.projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      // Create technologies badges
      const techBadges = project.technologies
        .map((tech) => `<span class="tech-badge">${tech}</span>`)
        .join("");

      // Create view live buttons
      const viewLiveButtons = project.viewLive
        .map(
          (link) => `
          <a href="${link.url}" target="_blank" class="btn-secondary">
            ${link.label}
          </a>
        `
        )
        .join("");

      projectCard.innerHTML = `
        <div class="project-image">
          <img src="./images/${project.image}" alt="${project.title}" />
        </div>
        <h3>${project.title}</h3>
        <p class="project-category">${project.category} | ${project.date}</p>
        <p class="project-description">${project.description}</p>
        <div class="tech-stack">
          ${techBadges}
        </div>
        <div class="project-links">
          ${viewLiveButtons}
        </div>
      `;

      projectGrid.appendChild(projectCard);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

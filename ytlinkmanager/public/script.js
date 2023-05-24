document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addForm');
  const titleInput = document.getElementById('titleInput');
  const urlInput = document.getElementById('urlInput');
  const linksList = document.getElementById('linksList');

  // Function to fetch all links from the server
  const fetchLinks = async () => {
    try {
      const response = await fetch('/links');
      const links = await response.json();
      renderLinks(links);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  // Function to render links in the UI
  const renderLinks = (links) => {
    linksList.innerHTML = '';
    links.forEach((link) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span><a href="${link.url}" target="_blank">${link.title}</a></span>
        <button class="delete" data-id="${link._id}">Delete</button>
      `;
      linksList.appendChild(li);
    });
  };

  // Function to handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const url = urlInput.value;

    if (!title || !url) {
      return;
    }

    try {
      const response = await fetch('/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url }),
      });
      const link = await response.json();
      titleInput.value = '';
      urlInput.value = '';
      fetchLinks();
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  // Function to handle link deletion
  const handleLinkDelete = async (event) => {
    if (!event.target.classList.contains('delete')) {
      return;
    }

    const linkId = event.target.dataset.id;

    try {
      await fetch(`/links/${linkId}`, { method: 'DELETE' });
      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  // Event listeners
  form.addEventListener('submit', handleFormSubmit);
  linksList.addEventListener('click', handleLinkDelete);

  // Fetch initial links
  fetchLinks();
});


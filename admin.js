document.addEventListener('DOMContentLoaded', () => {
    const fileListContainer = document.getElementById('file-list');
    const fileContentDisplay = document.getElementById('file-content');
    let activeLink = null;

    fileListContainer.addEventListener('click', async (event) => {
        const link = event.target.closest('a');
        if (!link) return;

        event.preventDefault(); // Prevent default link navigation

        // Update active link styling
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        link.classList.add('active');
        activeLink = link;

        const filePath = link.dataset.path;
        if (!filePath) return;

        // Determine file type
        const isHtmlFile = filePath.endsWith('.html') || filePath.endsWith('.htm');
        const isImageFile = filePath.match(/\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i);
        const isTextFile = filePath.match(/\.(js|css|md|txt|log|json|xml)$/i);

        fileContentDisplay.innerHTML = ''; // Clear previous content

        if (isHtmlFile) {
            // For HTML files, embed in an iframe for live preview
            const iframe = document.createElement('iframe');
            iframe.src = filePath;
            fileContentDisplay.appendChild(iframe);
        } else if (isImageFile) {
            // For image files, display directly
            const img = document.createElement('img');
            img.src = filePath;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            fileContentDisplay.appendChild(img);
        } else if (isTextFile) {
            // For text-based files, fetch and display content
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const textContent = await response.text();
                const pre = document.createElement('pre');
                pre.textContent = textContent;
                fileContentDisplay.appendChild(pre);
            } catch (error) {
                console.error(`Error fetching file ${filePath}:`, error);
                fileContentDisplay.innerHTML = `<p style="color: red;">Could not load file: ${filePath}<br>${error.message}</p>`;
            }
        } else {
            // Fallback for unknown file types
            fileContentDisplay.innerHTML = `<p>Cannot display content for this file type: ${filePath}</p>`;
        }
    });
});

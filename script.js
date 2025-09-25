// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('overlay');
  const overlayImg = document.getElementById('overlay-img');
  const zoomables = document.querySelectorAll('.zoomable');

  // Only proceed if overlay elements exist
  if (overlay && overlayImg) {
    zoomables.forEach(img => {
      img.addEventListener('click', () => {
        overlayImg.src = img.src;
        overlayImg.alt = img.alt;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      overlayImg.src = '';
      overlayImg.alt = '';
      document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close overlay with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.style.display === 'flex') {
        overlay.style.display = 'none';
        overlayImg.src = '';
        overlayImg.alt = '';
        document.body.style.overflow = 'auto';
      }
    });
  }
});
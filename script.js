<script>
  const overlay = document.getElementById('overlay');
  const overlayImg = document.getElementById('overlay-img');
  const zoomables = document.querySelectorAll('.zoomable');

  zoomables.forEach(img => {
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlay.style.display = 'flex';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlayImg.src = '';
  });
</script>
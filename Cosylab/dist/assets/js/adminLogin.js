const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');
if (error) {
  document.getElementById('error-message').textContent = error;
}
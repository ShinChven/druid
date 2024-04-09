/**
 * Scrolls the window to the top of the page with a smooth animation.
 */
export const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
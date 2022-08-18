export default function selectLayout(pathname) {
  return pathname.includes('/users') ? 'LoginLayout' : 'BaseLayout';
}

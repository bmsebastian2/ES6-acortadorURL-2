export function obtenerDominioDesdeURL(url) {
  const dominio = url.replace(/^(https?:\/\/)?(www\.)?/, "");
  return dominio;
}

export function obtenerDominioDesdeURL(url) {
  const dominio = url.replace(/^(https?:\/\/)?/, "");
  return dominio;
}

export function obtenerDominioDesdeURL2(url) {
  // Utilizamos una expresión regular para eliminar "http://" o "https://"
  const dominioSinProtocolo = url.replace(/^(https?:\/\/)?(www\.)?/, "");

  // Luego, eliminamos el símbolo "/" al final si existe
  const dominioSinBarra = dominioSinProtocolo.replace(/\/$/, "");

  return dominioSinBarra;
}

export function obtenerDominioDesdeURL3(url) {
  const dominioSinProtocolo = url.replace(/^(https?:\/\/)?(www\.)?/, "");
  return dominioSinProtocolo;
}

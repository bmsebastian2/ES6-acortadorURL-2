export function obtenerDominioDesdeURL(url) {
  const dominio = url.replace(/^(https?:\/\/)?(www\.)?/, "");
  return dominio;
}


export function obtenerDominioDesdeURL2(url) {
  // Utilizamos una expresión regular para eliminar "http://" o "https://"
  const dominioSinProtocolo = url.replace(/^https?:\/\//, "");

  // Luego, eliminamos el símbolo "/" al final si existe
  const dominioSinBarra = dominioSinProtocolo.replace(/\/$/, "");

  return dominioSinBarra;
}
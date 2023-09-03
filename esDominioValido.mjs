import dns from "dns";

export function esDominioValido(dominio) {
  return new Promise((resolve, reject) => {
    dns.lookup(dominio, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

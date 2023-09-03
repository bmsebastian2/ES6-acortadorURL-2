import dns from "dns";

export function esDominioValido(dominio) {
  return new Promise((resolve, reject) => {
    dns.lookup(dominio, (err, address, family) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}


import { obtenerDominioDesdeURL } from "./obtenerDominioDesdeURL.mjs";
import { esDominioValido } from "./esDominioValido.mjs";


const dominio = obtenerDominioDesdeURL("https://www.google.com/");

esDominioValido(obtenerDominioDesdeURL(dominio))
  .then((resultado) => {
    console.log(`El dominio ${dominio} es válido.`);
  })
  .catch((error) => {
    console.error(`El dominio ${dominio} no es válido o no se pudo resolver.`);
  });

const validarHora = (time = "") => {
  const validar = new RegExp(
    "^(?:0?[1-9]|1[0-2]):[0-5][0-9]s?(?:[aApP](.?)[mM]\1)?$"
  );

  if (!validar.test(parseInt(time))) {
    throw new Error("El formato es incorrecto 00:00");
  }
};

const validarImg = (img = "", next) => {
  console.log(next);
  if (!img) {
    return;
  }

  const validar = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  if (!validar.test(img)) {
    throw new Error("El formato no es correcto http://imagen.com");
  }
};

module.exports = {
  validarHora,
  validarImg,
};

const validarHora = (time = "") => {
  const validar = new RegExp(
    //"^(?:0?[1-9]|1[0-2]):[0-5][0-9]s?(?:[aApP](.?)[mM]\1)?$"
    "^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
  );

  if (!validar.test(time)) {
    throw new Error("El formato es incorrecto 00:00");
  }
  else{
    return "ok"
  }
};

const validarImg = (img) => {
  if (!img || !img.length) {
    return "ok";
  }

  const validar = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  if (!validar.test(img)) {
    throw new Error("El formato no es correcto http://imagen.com");
  }
  else{
    return "ok"
  }
};

module.exports = {
  validarHora,
  validarImg,
};

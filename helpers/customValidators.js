const validarHora = (time = "") => {
  const validar = new RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$");

  if (!validar.test(time)) {
    throw new Error("El formato es incorrecto 00:00");
  }
  else{
    return "ok"
  }
};

const validateDateTime = (date) =>{
  //no funciona el regex
  const validate = new RegExp("(?:19\d{2}|20[01][0-9]|2020)[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])");
  if(!validate.test(date)){
    throw new Error("El formato es incorrecto dd/mm/aaaa");
  }
  else{
    return 0;
  }
}

const validateDate = (date) =>{
  //no funciona el regex
  const validate = new RegExp("^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$")
  console.log(validate.test(String(date)))
if(!validate.test(date)){
  throw new Error("El formato es incorrecto dd/mm/aaaa");
}
else{
  return 0;
}
}


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
  validateDateTime,
  validateDate
};

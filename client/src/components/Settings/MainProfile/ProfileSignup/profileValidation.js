const profileValidation = state => {
  let isValid = false;
  let errors = {};

  if (state.username === "") {
    errors.username = "You must submit the username";
  }
  if (state.fullname === "") {
    errors.fullname = "You must submit the fullname";
  }
  if (state.country === "") {
    errors.country = "You must provide a country";
  }
  if (state.blood_group === "") {
    errors.blood_group = "You must provide a blood group";
  }
  if(state.locality === ""){
    errors.locality = "You must provide a locality";
    
  }
  if (state.gender === "") {
    errors.gender = "You must provide a gender";
  }

  if (state.description === "") {
    errors.description = "You must provide a description";
  }

  if (Object.keys(errors).length === 0) {
    isValid = true;
  }

  return {
    isValid,
    errors
  };
};

export default profileValidation;

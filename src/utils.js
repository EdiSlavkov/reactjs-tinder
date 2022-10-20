export const validateEmail = (email)=>{
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return email ? email.match(emailFormat) ? true : "Only e-mail is accepted!" :
    "Email is required!";
     
}

export const validatePassword = (password)=>{

    const symbols = "~`!@#$%^&*()_+{}|:';/.>?<,1234567890№€§ ";
    const passwordMinLength = 6;

    if(password){
        let upperCase = false;
        let lowerCase = false;
        let symbol = false;

        password.split("").forEach(e => {
            if (e.includes(e.toUpperCase()) && !symbols.includes(e)) {
                upperCase = true;
              }
              if (e.includes(e.toLowerCase()) && !symbols.includes(e)) {
                lowerCase = true;
              }
              if (symbols.includes(e)) {
                symbol = true;
              }
        })
        
          if (
            !(symbol && upperCase && lowerCase)
          ) {
            return "Password must contain atleast 1 uppercase, 1 lowercase and 1 symbol or number!";
          } else if (
            password.length > 0 &&
            password.length < passwordMinLength
          ) {
            return `You must enter atleast ${passwordMinLength - password.length} symbols more!`;
          } else {
            return true;
          }
    } else {
       return "Password is required!";
    }
}

export const confirmPasswords = (passOne, passTwo) =>{
    return passOne === passTwo ? true : "Passwords does not match!";
}
// base64 converter for user images:

export const convert = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }
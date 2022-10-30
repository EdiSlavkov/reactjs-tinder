export const validateEmail = (email)=>{
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return email ? email.match(emailFormat) ? true : "Only e-mail is accepted!" :
    "Email is required!";
     
}

export const validatePassword = (password)=>{

    const symbols = "~`!@#$%^&*()_+{}|:';/.>?<,1234567890№€§ ";
    const passwordMinLength = 7;

    if(password){
        let upperCase = 1;
        let lowerCase = 1;
        let symbol = 1;

        password.split("").forEach(e => {
            if (e.includes(e.toUpperCase()) && !symbols.includes(e)) {
                upperCase = 0;
              }
              if (e.includes(e.toLowerCase()) && !symbols.includes(e)) {
                lowerCase = 0;
              }
              if (symbols.includes(e)) {
                symbol = 0;
              }
        })
         let msgUpper = upperCase ? ` 1 uppercase` : "";
        let msgLower = lowerCase ? ` 1 lowercase` : "";
        let msgSymb = symbol ? ` 1 symbol` : "";
        let msg = `Enter${msgUpper}${msgLower}${msgSymb}!`;
          if(upperCase === 1){
            return msg;
          }
           if(lowerCase === 1){
            return msg;
          } if(symbol === 1){
            return msg
          } if (
            password.length > 0 &&
            password.length < passwordMinLength
            
          ) 
          {
            
            return `You must enter at least ${passwordMinLength} symbols! ${passwordMinLength - password.length} symbols remaining!`;
          } else {
            return true;
          }
    } else {
       return `Enter ${passwordMinLength} symbols! 1 uppercase, 1 lowercase, 1 symbol!`;
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


  export const validateLength = (value, length) => {
    if(value.split("").length > length){
      return false;
    } else {
      return true;
    }
  }

  export   const validateRequirements = (user) => {
    if (
      user.username.trim().length > 2 &&
      user.age > 17 &&
      user.phone.trim().length >= 10 &&
      user.phone[0] === "0" &&
      user.phone[1] === "8"
    ) {
      return false;
    } else {
      return true;
    }
  };
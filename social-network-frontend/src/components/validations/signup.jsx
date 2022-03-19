import * as zxcvbn from 'zxcvbn';

export const minMaxLength = (text, minLength, maxLength) => {
    let result = !text || text.length < minLength;
    if (maxLength) {
        result = result || text.length < minLength;
    }
    return result;
}

export const validEmail = (text) => {
    const regex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    return !regex.test(text);
}

export const passwordStrength = (text) => {
    let result = zxcvbn(text);
    return result.score < 3;
}

let registeredUsers = [
    'ravi@kiran.com',
    'mail@myblog.in',
    'contact@lucky.com'
];
 
export const userExists = (email) => {
    return new Promise(resolve => {
        setTimeout(() => {
            if(registeredUsers.findIndex(u => u === email) !== -1) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}

export const validateConfirmPassword = (
    password,
    confirmpassword,
    formErrors
  ) => {
    formErrors = formErrors || {};
    if (password !== confirmpassword) {
      formErrors.confirmpassword =
        'Confirmed password is not matching with password';
      return false;
    } else {
      delete formErrors.confirmpassword;
      return true;
    }
  }


  
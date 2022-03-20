import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  Warning
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { minMaxLength, validEmail, passwordStrength, userExists, validateConfirmPassword } from '../validations/signup'
import userEvent from "@testing-library/user-event";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [user, setUser] = useState({});
  const [formErrors, setFormErrors] = useState({});
  
  const currentFormErrors = {};
  const inputFinished = {};

  function handleChange (e) {
    const {name, value} = e.target;
    // let formErrors = this.state.formErrors;
    

    switch (name) {
      case 'firstName':
        if (minMaxLength(value, 3)) {
          currentFormErrors[
            name
          ] = `First Name should have minimum 3 characters`;
        } else {
          setUser({
            ...user,
            firstname: value,
          })
          delete currentFormErrors[name];
        }
        break;
      case 'lastName':
        if (minMaxLength(value, 3)) {
          currentFormErrors[
            name
          ] = `Last Name should have minimum 3 characters`;
        } else {
          setUser({
            ...user,
            lastname: value,
          })
          delete currentFormErrors[name];
        }
        break;
      case 'email':
        if (!value || validEmail(value)) {
          currentFormErrors[name] = `Email address is invalid`;
        } else {
          userExists(value).then((result) => {
            if (result) {
              currentFormErrors[name] =
                'The email is already registered. Please use a different email.';
            } else {
              setUser({
                ...user,
                email: value,
              })
              delete currentFormErrors[name];
            }
          });
      }
        break;
      case 'password':
        if (minMaxLength(value, 8)) {
          currentFormErrors[name] = 'Password should have minimum 8 characters';
        } else if (passwordStrength(value)) {
          currentFormErrors[name] =
            'Password is not strong enough. Include an upper case letter, a number or a special character to make it strong';
        } else {
          delete currentFormErrors[name];
          setUser({
            ...user,
            password: value,
          });
          if (user.confirmpassword) {
            validateConfirmPassword(
              value,
              user.confirmpassword,
              currentFormErrors
            );
          }
        }
        break;
      case 'confirmpassword':
        let valid = validateConfirmPassword(
          user.password,
          value,
          currentFormErrors
        );
        if (valid) {
          setUser({ ...user, confirmpassword: value });
        }
       break;
      default:
        break;
    }
    setFormErrors(currentFormErrors);
  }

  

  const fetchData = (e) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };

    fetch("http://localhost:3000/auth/register", requestOptions, {mode: "cors"})
    .then(data => {
      console.log(data.json());
    })
    .catch(err => {
      console.log(err.message);
    })    
  }




  return (
    <BoxContainer>
      <FormContainer>
      <Input type="text" placeholder="First Name" name="firstName" onBlur={handleChange} />
      {formErrors && formErrors.firstName ? <Warning>{formErrors.firstName}</Warning> : ""}
        <Input type="text" placeholder="Last Name" name="lastName" onBlur={handleChange} />
      {formErrors && formErrors.lastName ? <Warning>{formErrors.lastName}</Warning> : ""}
        <Input type="email" placeholder="Email" name="email" onBlur={handleChange} />
      {formErrors && formErrors.email ? <Warning>{formErrors.email}</Warning> : ""}
        <Input type="password" placeholder="Password" name="password" onBlur={handleChange} />
      {formErrors && formErrors.password ? <Warning>{formErrors.password}</Warning> : ""}
        <Input type="password" placeholder="Confirm Password" name="confirmpassword" onBlur={handleChange} />
      {formErrors && formErrors.confirmpassword ? <Warning>{formErrors.confirmpassword}</Warning> : ""}
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={fetchData}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

import React, { useContext } from 'react';
import { AuthContext } from '../../shared/utils/auth-context';
import { useForm } from '../../shared/utils/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from '../../shared/utils/validator';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import axios from 'axios';
import './Auth.css';

const RegisterPage = () => {
  const auth = useContext(AuthContext);

  // Handle login form structure.
  const [formState, inputHandler] = useForm(
    // initialInputs (default setup).
    {
      username: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
      fname: {
        value: '',
        isValid: false
      },
      lname: {
        value: '',
        isValid: false
      },
      city: {
        value: '',
        isValid: false
      },
      country: {
        value: '',
        isValid: false
      }
    },
    // initialFormValidity.
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const axiosConfigs = {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'Token',
          "Access-Control-Allow-Origin": "*"
        }
      };
      // Use axios package to post data.
      await axios.post(
        'http://localhost:5000/register',
        JSON.stringify({
          username: formState.inputs.username.value,
          password: formState.inputs.password.value,
          fname: formState.inputs.fname.value,
          lname: formState.inputs.lname.value,
          city: formState.inputs.city.value,
          country: formState.inputs.country.value
        }),
        axiosConfigs
      ).then((res) => {
        auth.login(res.userId, res.token);
        // Take user to homepage.
        window.location.href="/";
      });
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Card className="authentication">
        <h2>Register New Account</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
        <Input
            element="input"
            id="username"
            type="text"
            label="Username"
            validators={ [VALIDATOR_REQUIRE()] }
            errorText="Please enter a username."
            onInput={ inputHandler }
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={ [VALIDATOR_REQUIRE()] }
            errorText="Please enter a valid password, at least 8 characters."
            onInput={ inputHandler }
          />
          <Input
            element="input"
            id="fname"
            type="text"
            label="First Name"
            validators={ [VALIDATOR_REQUIRE()] }
            errorText="Please enter a first name."
            onInput={ inputHandler }
          />
          <Input
            element="input"
            id="lname"
            type="text"
            label="Last Name"
            validators={ [VALIDATOR_REQUIRE()] }
            errorText="Please enter a last name."
            onInput={ inputHandler }
          />
          <Input
            element="input"
            id="city"
            type="text"
            label="Your City"
            validators={ [VALIDATOR_REQUIRE()] }
            errorText="Please enter a city."
            onInput={ inputHandler }
          />
          <Input
            element="input"
            id="country"
            type="text"
            label="Your Country Code"
            validators={ [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(3)] }
            errorText="Please enter a 2-3 digit, ISO 3166 country code."
            onInput={ inputHandler }
          />
          <Button type="submit" disabled={ !formState.isValid }>
            REGISTER
          </Button>
        </form>
        <Button inverse href="http://localhost:3000/login">
          SWITCH TO LOGIN
        </Button>
        <Button href="http://localhost:3000">
          GO HOME
        </Button>
      </Card>
    </React.Fragment>
  );

}

export default RegisterPage;

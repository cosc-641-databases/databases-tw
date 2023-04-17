import React, { useContext } from 'react';
import { AuthContext } from '../../shared/utils/auth-context';
import { useForm } from '../../shared/utils/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utils/validator';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import './Auth.css';
import axios from 'axios';

const LoginPage = () => {
  // Provide global authContext to page.
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
      }
    },
    // initialFormValidity.
    false
  );

  const authSubmitHandler = async event => {
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
        'http://localhost:5000/login',
        JSON.stringify({
          username: formState.inputs.username.value,
          password: formState.inputs.password.value
        }),
        axiosConfigs
      ).then((res) => {
        console.log("Successfully Logged In!");
        auth.login(res.data.userId, res.data.token);
        // Take user to homepage.
        window.location.href="/";
      });
    } catch(err) {
      console.log("Login failed!");
    }
  };

  return (
    <React.Fragment>
      <Card className="authentication">
        <h2>User Login</h2>
        <hr />
        <form onSubmit={ authSubmitHandler }>
        <Input
            element="input"
            id="username"
            type="text"
            label="Username"
            validators={ [VALIDATOR_REQUIRE()] }
            errorText="Please enter a valid username."
            onInput={ inputHandler }
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={ [VALIDATOR_REQUIRE()] }
            errorText="Please enter a valid password."
            onInput={ inputHandler }
          />
          <Button type="submit" disabled={ !formState.isValid }>
            LOGIN
          </Button>
        </form>
        <Button inverse href="http://localhost:3000/register">
          SWITCH TO REGISTER
        </Button>
        <Button href="http://localhost:3000">
          GO HOME
        </Button>
      </Card>
    </React.Fragment>
  );

}

export default LoginPage;

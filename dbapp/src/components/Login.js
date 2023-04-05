import Button from './Button'

function Login() {

    //forms used mostly from: https://contactmentor.com/login-form-react-js-code/
  return (
    <div className="form">
    <form>
      <div className="input-container">
        <label>Username </label>
        <input type="text" name="uname" required />
      </div>
      <div className="input-container">
        <label>Password </label>
        <input type="password" name="pass" required />
      </div>
      <div className="button-container">
        <input type="submit" value="Login"/>
      </div>
    </form>
  </div>
  )

}

export default Login
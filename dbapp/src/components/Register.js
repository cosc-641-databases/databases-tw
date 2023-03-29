import Button from './Button'

function Register() {
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
      <div className="input-container">
        <label>Confirm Password </label>
        <input type="password" name="pass" required />
      </div>
      <div className="button-container">
        <input type="submit" value="Register"/>
      </div>
    </form>
  </div>
  )
}

export default Register
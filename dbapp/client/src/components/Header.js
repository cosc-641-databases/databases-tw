import Button from './Button'

const Header = ({user}) => {
    const logInClick = () => {
        console.log("logIn Clicked");
        window.location.href="http://localhost:3000/login";
    }
    const accountClick = () => {
        console.log("account Clicked")
    }
    const dashboardClick = () => {
        console.log("dashboard Clicked")
    }
    const logOutClick = () => {
        console.log("dashboard Clicked")
    }

  return (
    <header className = 'header'>
        <h1>Awesome React and MongoDB Weather App</h1>
        <div className = 'header'>
            <Button color = 'blue' text = 'Log In' onClick={logInClick}/>
            <Button color = 'black' text = 'Your Account' onClick={accountClick}/>
            <Button color = 'black' text = 'Dashboard' onClick={dashboardClick}/>
            <Button color = '#F51E05' text = 'Log Out' onClick={logOutClick}/>
            <h2>Welcome {user}</h2>
        </div>
    </header>
  )
}

Header.defaultProps = {
    user: "Tester"
}

export default Header

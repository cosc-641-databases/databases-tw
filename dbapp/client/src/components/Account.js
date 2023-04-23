import Button from './Button'

// Used to show a user their account info.
function Account({title}) {
  return (
    <div className = "box">
        <h2>{title}</h2>
        <Button color = 'grey' text = 'Edit'/>
    </div>
  )
}

Account.defaultProps = {
    title: "Your Information"
}



export default Account;

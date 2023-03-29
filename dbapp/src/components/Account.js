import Button from './Button'

//this component is used to show a user their account info and gives them the ability to edit
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



export default Account
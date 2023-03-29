import Location from './Location'

//displays list of locations together
function Spots({title}) {
  return (
    <div className = 'box'>
        <h2>{title}</h2>
        <div className = 'spots'>
            <Location location = "New York" temp = {47} />
            {/* below rely on defauly props */}
            <Location /> 
            <Location />
            <Location />
            <Location />
        </div>
    </div>
  )
}

Spots.defaultProps = {
    title: 'Popular Spots'
}


export default Spots
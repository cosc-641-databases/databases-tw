import Location from '../../components/Location'
import './Spots.css';

//displays list of locations together
function Spots({title}) {
  return (
    <div className = 'box'>
        <h2>{title}</h2>
        <div className = 'spots'>
            <Location location = "New York" temp = {47} />
            {/* below rely on default props */}
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


export default Spots;

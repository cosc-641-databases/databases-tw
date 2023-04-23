import Location from '../../components/Location';
import './Spots.css';

// Displays list of locations together.
function Spots({title}) {
  return (
    <div className='box'>
        <h2>{title}</h2>
        <div className='spots'>
            {/* Washington, DC */}
            <Location
              lat={38.9072}
              lon={-77.0369}
            />
            {/* Los Angeles */}
            <Location
              lat={34.0522}
              lon={-118.2347}
            />
            {/* London */}
            <Location
              lat={51.5072}
              lon={-0.1276}
            />
            {/* Tokyo */}
            <Location
              lat={35.6895}
              lon={139.6917}
            />
            {/* New York City */}
            <Location
              lat={40.71427}
              lon={-74.00597}
            />
        </div>
    </div>
  )
};

Spots.defaultProps = {
    title: 'Popular Spots'
};

export default Spots;

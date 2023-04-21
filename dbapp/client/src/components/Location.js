import './Location.css';
// Component used as cards for each location being displayed within the app.
function Location({location, icon, temp, desc}) {
  const srcUrl = `http://openweathermap.org/img/w/${icon}.png`
  return (
    <div className='location'>{location}: <br />
      <img id="wicon" src={srcUrl} alt="Weather icon"></img> {temp} °F <br />
      <p className='locDesc'>{desc}</p>
    </div>
  )
}

Location.defaultProps = {
  location: 'Paris',
  icon: '01d',
  temp: '50',
  desc: 'clear sky'
}

export default Location;

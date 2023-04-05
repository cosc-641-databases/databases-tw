
//conponent used as cards for each location being displayed within the app
function Location({location, temp}) {

  return (
    <div className = 'location'>{location}: {temp}°</div>
  )

  }

  Location.defaultProps = {
    location: 'Paris',
    temp: '50'
  }


export default Location
import Button from './Button'
import './Search.css';

function Search() {
    const searchClick = () => {
        console.log("Search Clicked")
    }

  return (
    <div className = 'search'>
        <label htmlFor = "search">Search for weather in specific locations:</label>
        <br></br>
        <input type="search" id = "search" name = "q"></input>
        <Button color = 'blue' text = 'Search' onClick={searchClick}/>
    </div>
  )
}

export default Search;

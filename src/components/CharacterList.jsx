import { useEffect, useState } from "react"; 
import Character from "./Character";

function NavPage(props){
    return(
        <header className="d-flex justify-content-between aling-items-center">
            <p>Page: {props.page}</p>
            <button className="btn btn-danger btn-md"
                onClick={() => props.setPage(1)} >Inicio
            </button>
            <button className="btn btn-primary btn-sm"
                onClick={() => props.setPage(props.page +1)}
            >
                Page:{props.page +1}

            </button>
            
        </header>
    )
}

function CharacterList() {
     //se almacenan los datos que se traen de la API en el useState
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)

  //utilizmos el hook useEffect para pedir los datos a la API una vez se cargue la aplicación
  useEffect(()=>{
    async function fetchData(){
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`); 
    const data = await response.json()
    setCharacters(data.results)
  }
  //llamo a la función
  fetchData()
  }, [page])
  return (    
    <div className="container">
        <NavPage page={page} setPage={setPage}  />
     <div className="row">
     {characters.map((character) => {
        return (
          <div className="col-md-4" key={character.id} >
            <Character 
          name={character.name}
          origin={character.origin}
          image={character.image} />
          </div>
        );
      })}
     </div>
     <NavPage page={page} setPage={setPage}  />
    </div>
  );
}

export default CharacterList;

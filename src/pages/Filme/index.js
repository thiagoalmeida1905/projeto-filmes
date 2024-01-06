import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './filme-info.css'
import api from '../../services/api';

function Filme () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params: {
                    api_key: 'c0777693c9ee1b20fb92113f5518ec98',
                    language: 'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('Filme não encontrado');
                navigate('/', { replace: true });
                return
            })
        }

        loadFilme();

        return () => {
            console.log('Componente foi desmontado')
        }
    }, [navigate, id])

    if(loading){
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10 </strong>

            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;
import { useState, useEffect } from "react"

function Home() {

    const [dadosCovid, setDadosCovid] = useState([])

    useEffect(() => {
        fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1`)
        .then(response => response.json())
        .then(data => setDadosCovid(data.results))
    }, [])

    return(
        <section>

            <h1>Casos</h1>

            {dadosCovid.map((dados) => {
                const {pais, timeline} = dados
                return (
                    <ul>
                        <li>
                            <h2>`${dados.id}`</h2>
                        </li>
                        <li>
                            {dados.pais}
                        </li>
                        <li>
                            {dados.timeline}
                        </li>
                    </ul>
                )
            })}
        </section>
    )
}

export default Home
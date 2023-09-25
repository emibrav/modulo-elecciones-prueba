import Papa from "papaparse"
import Card from "./Card"

const fetchResults = () => {
  return fetch("https://docs.google.com/spreadsheets/d/1IXw8QNVwQ540csFzPfcnPe84lKMJNJ5z80mJYdfKQ1M/pub?output=csv", { next: { revalidate: 60 } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fetching error")
      }
      return response.text() // Cambiamos a response.text() para obtener el texto
    })
    .then((text) => {
      return new Promise((resolve, reject) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            resolve(results.data)
            // console.log(results.data[0]["Mesas Escrutadas"])
          },
          error: (error) => {
            reject(error.message)
          },
        })
      })
    })
}
// const mesasEscrutadas = results[0]["Mesas Escrutadas"]
const formatNumber = (numberString) => {
  const number = parseFloat(numberString.replace(",", ".")) // Reemplaza la coma por el punto y convierte a número
  return number.toLocaleString("es-ES") // Formatea el número con separadores de miles y decimales
}

const GetCandidates = async () => {
  const results = await fetchResults()
  return (
    <>
      {/* <div className='px-3'>
        <p className='text-xs'>
          Escrutado: {formatNumber(results[0]["Mesas Escrutadas"])}% <br></br>
          En blanco: {formatNumber(results[0]["Votos en Blanco"])} | Votos totales: {formatNumber(results[0]["Total de Votos"])}
        </p>
      </div> */}
      <Card results={results} />
    </>
  )
}
export default GetCandidates

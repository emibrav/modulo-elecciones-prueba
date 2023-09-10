import Papa from "papaparse"
import Card from "./Card"

const fetchResults = () => {
  return fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQK1MR-HUUIj8rXpby9uGFU7BgbZo2pHJlpZ6-FgFDpu8_kDJDwBbWNxG-U2Au_ZuMcp9kffuvhwZON/pub?output=csv", { next: { revalidate: 2 } })
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
          },
          error: (error) => {
            reject(error.message)
          },
        })
      })
    })
}

const GetCandidates = async () => {
  const results = await fetchResults()
  return (
    <>
      <h1>{results["Porcentaje Escrutado"]}</h1>
      <Card results={results} />
    </>
  )
}
export default GetCandidates

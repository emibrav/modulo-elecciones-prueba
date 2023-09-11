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
      {results.data}
      <Card results={results} />
    </>
  )
}
export default GetCandidates

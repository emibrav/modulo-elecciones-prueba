import Papa from "papaparse"
import Card from "./Card"

const fetchResults = () => {
  return fetch(process.env.SHEET_URL, { next: { revalidate: 30 } })
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
      <Card results={results} />
    </>
  )
}
export default GetCandidates

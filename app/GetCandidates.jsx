import axios from "axios"
import Papa from "papaparse"
import Image from "next/image"

import "./globals.css"

const fetchResults = () => {
  return fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQK1MR-HUUIj8rXpby9uGFU7BgbZo2pHJlpZ6-FgFDpu8_kDJDwBbWNxG-U2Au_ZuMcp9kffuvhwZON/pub?output=csv", { next: { revalidate: 120 } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.text() // Cambiamos a response.text() para obtener el texto
    })
    .then((text) => {
      return new Promise((resolve, reject) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            console.log(results.data)
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
    <div style={{ display: "flex", padding: "30px", gap: "20px", border: "1px solid red" }}>
      {results.map((item) => (
        <div key={item.id} style={{ display: "flex", flexDirection: "column" }}>
          <Image alt={item.candidato} src={`/img/${item.foto}`} width={120} height={120} />
          {item.candidato} {item.porcentajePartido}
        </div>
      ))}
    </div>
  )
}
export default GetCandidates

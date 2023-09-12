import React from "react"
import Image from "next/image"

const sortByPercentage = (a, b) => {
  const percentageA = parseFloat(a["% Candidato"])
  const percentageB = parseFloat(b["% Candidato"])

  return percentageB - percentageA
}
const formatNumber = (numberString) => {
  const number = parseFloat(numberString.replace(",", ".")) // Reemplaza la coma por el punto y convierte a número
  return number.toLocaleString("es-ES") // Formatea el número con separadores de miles y decimales
}
const Card = ({ results }) => {
  return (
    <>
      <div className='grid grid-flow-col gap-2 p-3 overflow-x-auto max-w-fit'>
        {results.sort(sortByPercentage).map((item) => (
          <div
            key={item.id}
            style={{
              border: `2px solid ${item["Color"]}`,
            }}
            className='w-32 border-green-800 rounded-b-lg shadow-md '
          >
            <div className='flex w-full h-3 max-w-sm overflow-hidden bg-gray-300 '>
              <div className='flex flex-col justify-center text-center text-white bg-blue-500 text-xxs ' role='progressbar' style={{ backgroundColor: item["Color"], width: `${parseFloat(item["% Partido"])}%` }} aria-valuemin={0} aria-valuemax={100}>
                {item["% Partido"]}%
              </div>
            </div>
            <div className='flex flex-col p-1 rounded-b-lg'>
              <Image
                style={{
                  border: `3px solid ${item["Color"]}`,
                }}
                className='p-1 rounded-full h-28 md:w-52'
                alt={item.candidato}
                src={`/img/${item["Foto Candidato"]}`}
                width={120}
                height={160}
              />
              <div className='flex flex-col h-full p-1 bg-white rounded-b-lg flex-2'>
                <h2 className='text-2xl font-bold text-center text-gray-800 '>{item["% Candidato"]}%</h2>
                <h3 className='text-sm font-bold text-center text-gray-800 '>{item.candidato}</h3>
                <p className='mt-1 text-xs text-center text-gray-800'>{item["Nombre Partido"]}</p>
                <p className='inline-block m-2 text-center text-gray-500 text-xxs align-end'>Votos: {formatNumber(item["Votos Candidato"])}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default Card

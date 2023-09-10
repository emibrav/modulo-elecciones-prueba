import React from "react"
import Image from "next/image"

const sortByPercentage = (a, b) => {
  const percentageA = parseFloat(a["Porcentaje Partido"].replace("%", ""))
  const percentageB = parseFloat(b["Porcentaje Partido"].replace("%", ""))

  return percentageB - percentageA
}
const Card = ({ results }) => {
  return (
    <>
      {results.sort(sortByPercentage).map((item) => (
        <div
          key={item.id}
          style={{
            border: `2px solid ${item["Color"]}`,
          }}
          className='border-green-800 rounded-b-lg shadow-lg w-52 '
        >
          <div className='flex w-full h-6 max-w-sm overflow-hidden bg-gray-300 '>
            <div className='flex flex-col justify-center text-xs text-center text-white bg-blue-500 ' role='progressbar' style={{ backgroundColor: item["Color"], width: `${parseFloat(item["Porcentaje Partido"].replace("%", ""))}%` }} aria-valuemin={0} aria-valuemax={100}>
              {item["Porcentaje Partido"]}
            </div>
          </div>
          <div className='flex flex-col rounded-b-lg '>
            <Image className='w-full h-44 md:w-52' alt={item.candidato} src={`/img/${item["Foto Candidato"]}`} width={120} height={160} />
            <div className='flex flex-col h-full p-2 rounded-b-lg flex-2'>
              <h2 className='text-4xl font-bold text-center text-gray-800 '>{item["Porcentaje Partido"]}</h2>
              <h3 className='text-lg font-bold text-center text-gray-800 '>{item.candidato}</h3>
              <p className='mt-1 text-sm text-center text-gray-800'>{item["Nombre Partido"]}</p>
              <p class='inline-block align-end m-2 text-center text-xs text-gray-500 dark:text-gray-500'>Votos: {item["Votos Totales"]}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default Card

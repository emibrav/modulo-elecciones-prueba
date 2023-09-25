import React from "react"
import Image from "next/image"
import styles from "./Card.module.css"
import "./globals.css"

const sortByVotes = (a, b) => {
  const votesA = parseFloat(a["Votos Totales"])
  const votesB = parseFloat(b["Votos Totales"])

  return votesB - votesA
}

const formatNumber = (numberString) => {
  const number = parseFloat(numberString.replace(/\./g, ""))
  return number.toLocaleString("es-ES") // Formatea el número con separadores de miles y decimales
}

// Función para dividir una cadena de porcentaje en números individuales con coma antes de los últimos dos dígitos
function dividirPorcentajeConComa(cadena) {
  const numeros = cadena.split(",").join("").split("").map(Number)
  const resultado = []
  for (let i = 0; i < numeros.length; i++) {
    if (i === numeros.length - 2) {
      resultado.push(",", numeros[i])
    } else {
      resultado.push(numeros[i])
    }
  }
  return resultado
}
const Card = ({ results }) => {
  return (
    <>
      {/* <div className='w-full grid-flow-col p-3 md:gap-2 lg:grid lg:overflow-x-auto'>
        {results.sort(sortByPercentage).map((item) => (
          <div key={item.id} className='block w-full border border-red-500 rounded-b-lg shadow-xl md:w-48 '>
            <div className='flex w-full h-3 max-w-sm overflow-hidden bg-gray-300 '>
              <div className='flex flex-col justify-center text-center text-white bg-blue-500 text-xxs ' role='progressbar' style={{ backgroundColor: item["Color"], width: `${parseFloat(item["% Partido"])}%` }} aria-valuemin={0} aria-valuemax={100}>
              {item["% Partido"]}%
              </div>
            </div>
            <div className='relative flex flex-col p-1 rounded-b-lg'>
              <Image className='w-24 border border-red-500 md:w-4/5 md:absolute smd:-top-8 rounded-xl' alt={item.candidato} src={`/img/${item["Foto Candidato"]}`} width={120} height={160} />
              <div className='flex flex-col p-1 bg-white border border-red-500 rounded-b-lg w- md:h-full flex-2'>
                <h2 className='text-2xl font-bold text-center text-gray-800 '>{item["% Candidato"]}%</h2>
                <h3 className='text-sm font-bold text-center text-gray-800 '>{item.candidato}</h3>
                <p className='mt-1 text-xs text-center text-gray-800'>{item["Nombre Partido"]}</p>
                <p className='inline-block m-2 text-center text-gray-500 text-xxs align-end'>Votos: {formatNumber(item["Votos Candidato"])}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      {/* `${styles[]}` */}
      <div className={styles["elecciones-container"]}>
        <div className={`${styles["loading-circle-container"]} ${styles["center-me-x-y"]}`} style={{ display: "none" }}>
          <div className={styles["loading-circle"]}>
            <Image alt='imagen' width={120} height={160} className={styles["grey-circle"]} src='/img/loading-grey.png' />
            <Image alt='imagen' width={120} height={160} className={styles["orange-circle"]} src='/img/loading-orange.png' />
          </div>
        </div>
        <div className={`${styles.escrutinio} ${styles["flex-container"]}`}>
          <div className={styles["escrutinio-first-data"]}>
            <p className={styles.poppins}>Mesas escrutadas</p>
            <p className={`${styles["porcentaje-escrutinio"]} ${styles.poppins} ${styles["font-700"]}`}>{results[0]["Mesas Escrutadas"]}</p>
          </div>
          <div className={styles["escrutinio-second-data"]}>
            <div className={`${styles["porcentaje-escrutinio-bar"]} ${styles["hide-desktop"]}`}>
              <div className={styles["porcentaje-escrutinio-color-bar"]}></div>
            </div>
            <p className={`${styles["votos-escrutinio"]} ${styles.poppins} ${styles["font-500"]}]`}>
              <span className={`${styles.poppins} ${styles["font-500"]}}`}>{results[0]["Total de Votos"]}</span> votos
            </p>
          </div>
        </div>
        <div className={`${styles["swiper-container"]}`} data-fotogaleria='' data-fotogaleriathumbnails='no' data-fotogaleriafullscreen='no'>
          <div className={styles["swiper-button-prev"]}></div>
          <div className={styles["swiper-wrapper"]}>
            {results.sort(sortByVotes).map((item, index) => (
              <div key={item.id} className={`${styles["swiper-slide"]} ${styles["candidate-card"]} ${styles["show-difference"]}`}>
                <div className={styles["vote-difference"]}>
                  <span className={`${styles.block} ${styles["font-700"]}`}>{index["Votos Candidato"] - (index + 1)["Votos Candidato"]}</span>
                  <span className={styles.block}>Votos de diferencia</span>
                </div>
                <div className={styles["opacity-holder"]}>
                  <div className={styles["main-data-holder"]}>
                    <div className={styles["extra-holder"]}>
                      <figure className={styles.figure}>
                        <Image src={`/img/${item["Foto Candidato"]}`} width={100} height={420} className={styles.asd} alt={item.candidato} />
                        <div className={`${styles["position-number"]} ${styles["center-me-y"]} ${styles["font-700"]}`}>{results.indexOf(item) + 1}º</div>
                        <div className={`${styles["porcentaje-bar"]} ${styles["center-me-x"]} ${styles["hide-mobile"]}}`}>
                          <div className={styles["porcentaje-color-bar"]}></div>
                        </div>
                      </figure>
                      <div className={styles["nombres-holder"]}>
                        <div className={styles["nombre-partido"]} style={{ color: `${item["Color"]}` }}>
                          <p className={styles["poppins"]}>{item["Nombre Partido"]}</p>
                        </div>
                        <div className={`${styles["nombre-candidato"]} ${styles["font-700"]}}`}>
                          <p>{item.candidato}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["justify-center"]} ${styles["porcentaje-votos"]} ${styles["flex-container"]} ${styles["font-700"]} ${styles.poppins}`}>
                      <div className={`${styles["single-number"]} ${styles[`digit-${dividirPorcentajeConComa(item["% Partido"])[0]}`]} ${styles["font-700"]} ${styles["poppins"]}`}>
                        <div className={styles["extra-holder"]}>
                          <span className=''>0</span>
                          <span className=''>1</span>
                          <span className=''>2</span>
                          <span className=''>3</span>
                          <span className=''>4</span>
                          <span className=''>5</span>
                          <span className=''>6</span>
                          <span className=''>7</span>
                          <span className=''>8</span>
                          <span className=''>9</span>
                        </div>
                      </div>

                      <div className={`${styles["single-number"]} ${styles[`digit-${dividirPorcentajeConComa(item["% Partido"])[1]}`]} ${styles["font-700"]} ${styles["poppins"]}`}>
                        <div className={styles["extra-holder"]}>
                          <span className=''>0</span>
                          <span className=''>1</span>
                          <span className=''>2</span>
                          <span className=''>3</span>
                          <span className=''>4</span>
                          <span className=''>5</span>
                          <span className=''>6</span>
                          <span className=''>7</span>
                          <span className=''>8</span>
                          <span className=''>9</span>
                        </div>
                      </div>
                      <div className={`${styles["font-700"]} ${styles["poppins"]}`}>,</div>
                      <div className={`${styles["single-number"]} ${styles[`digit-${dividirPorcentajeConComa(item["% Partido"])[3]}`]} ${styles["font-700"]} ${styles["poppins"]}`}>
                        <div className={styles["extra-holder"]}>
                          <span className=''>0</span>
                          <span className=''>1</span>
                          <span className=''>2</span>
                          <span className=''>3</span>
                          <span className=''>4</span>
                          <span className=''>5</span>
                          <span className=''>6</span>
                          <span className=''>7</span>
                          <span className=''>8</span>
                          <span className=''>9</span>
                        </div>
                      </div>
                      <div className={`${styles["single-number"]} ${styles[`digit-${dividirPorcentajeConComa(item["% Partido"])[4]}`]} ${styles["font-700"]} ${styles["poppins"]}`}>
                        <div className={styles["extra-holder"]}>
                          <span className=''>0</span>
                          <span className=''>1</span>
                          <span className=''>2</span>
                          <span className=''>3</span>
                          <span className=''>4</span>
                          <span className=''>5</span>
                          <span className=''>6</span>
                          <span className=''>7</span>
                          <span className=''>8</span>
                          <span className=''>9</span>
                        </div>
                      </div>
                      <div className={`${styles["font-700"]} ${styles["poppins"]}`}>%</div>
                    </div>
                  </div>
                  <div className={styles["cantidad-votos"]}>
                    <div className={`${styles["mobile-porcentaje-color-bar"]} ${styles["hide-desktop"]}`}>
                      <div className={styles["porcentaje-color-bar"]}></div>
                    </div>
                    <p>
                      <span>{formatNumber(item["Votos Candidato"])}</span> Votos
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles["swiper-button-next"]}></div>
        </div>
      </div>
    </>
  )
}
export default Card

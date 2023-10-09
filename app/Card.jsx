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
  // Eliminar comas y convertir a números
  const num1 = parseFloat(results[0]["Votos Candidato"].replace(/,/g, ""))
  const num2 = parseFloat(results[1]["Votos Candidato"].replace(/,/g, ""))

  // Realizar la resta
  const resta = num1 - num2
  // Redondear el resultado a 3 decimales
  const resultadoRedondeado = resta.toFixed(3)

  // Mostrar el resultado
  console.log(parseFloat(resultadoRedondeado))
  return (
    <>
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
            <p className={`${styles["porcentaje-escrutinio"]} ${styles.poppins} ${styles["font-700"]}`}>{results[0]["Mesas Escrutadas"]}%</p>
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
                {index > 0 && index < 3 && Math.abs(parseFloat(item["Votos Candidato"].replace(/\./g, "")) - parseFloat(results[index - 1]["Votos Candidato"].replace(/\./g, ""))).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 }) < 249.999 && (
                  <div style={{ background: `${results[index - 1]["Color"]}` }} className={styles["vote-difference"]}>
                    {/* Convertir los valores con puntos en números y calcular la diferencia en valor absoluto */}
                    <span className={`${styles.block} ${styles["font-700"]}`}>{Math.abs(parseFloat(item["Votos Candidato"].replace(/\./g, "")) - parseFloat(results[index - 1]["Votos Candidato"].replace(/\./g, ""))).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })}</span>
                    <span className={styles.block}>Votos de diferencia</span>
                  </div>
                )}
                <div className={styles["opacity-holder"]}>
                  <div className={styles["main-data-holder"]}>
                    <div className={styles["extra-holder"]}>
                      <figure className={styles.figure}>
                        <Image src={`/img/${item["Foto Candidato"]}`} width={100} height={420} className={styles.imagen} alt={item.candidato} />
                        <div className={`${styles["position-number"]} ${styles["center-me-y"]} ${styles["font-700"]}`}>{results.indexOf(item) + 1}º</div>
                        <div className={`${styles["porcentaje-bar"]} ${styles["center-me-x"]} ${styles["hide-mobile"]}}`}>
                          <div style={{ background: `${item["Color"]}`, width: `${parseFloat(item["% Partido"])}%` }} className={styles["porcentaje-color-bar"]}></div>
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
                      {/* Si la primera cifra es 0, por ejemplo "08,74", que no muestre nada */}
                      {dividirPorcentajeConComa(item["% Partido"])[0] != 0 ? (
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
                      ) : (
                        ""
                      )}

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

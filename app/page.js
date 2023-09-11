import GetCandidates from "./GetCandidates"
import "./globals.css"

export default function Home() {
  return (
    <div>
      <h1 className='text-2xl font-bold px-3'>Elecciones Presidenciales</h1>
      <GetCandidates />
    </div>
  )
}

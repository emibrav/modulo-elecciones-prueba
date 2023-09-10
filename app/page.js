import GetCandidates from "./GetCandidates"
import "./globals.css"

export default function Home() {
  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>Elecciones Presidenciales</h1>
      <GetCandidates />
    </div>
  )
}

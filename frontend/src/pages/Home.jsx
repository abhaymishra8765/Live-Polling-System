import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div style={{maxWidth:760}}>
      <h3>Pick a role</h3>
      <div style={{display:'flex', gap:12}}>
        <Link to="/teacher"><button>Teacher</button></Link>
        <Link to="/student"><button>Student</button></Link>
      </div>
    </div>
  )
}

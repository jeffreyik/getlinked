import './Loading.css'
import ClipLoader from "react-spinners/ClipLoader"

const Loading = () => {
  return (
    <div className="loading">
        <ClipLoader color={'#000'} size={50} />
    </div>
  )
}

export default Loading
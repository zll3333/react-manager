import ReactDOM from "react-dom/client"
import Loading from './loading'
import "./loading.less"

let count = 0

export const ShowLoading = () => {
  if(count === 0){
    const loading = document.createElement("div")
    document.body.appendChild(loading)
    loading.setAttribute("id",'loading')

    ReactDOM.createRoot(loading).render(<Loading/>)
  }
  count++
}

export const HideLoading = () => {
  if (count <= 0) return;
  count--;
  if(count === 0) document.body.removeChild(document.getElementById("loading") as HTMLDivElement)
}
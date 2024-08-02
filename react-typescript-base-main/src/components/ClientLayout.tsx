import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"


const ClientLayout = () => {
  return (
    <>
    <Header/>
    {/* <div className="container"> */}
        <Outlet/>
    {/* </div> */}
    <Footer/>
    </>
  )
}

export default ClientLayout
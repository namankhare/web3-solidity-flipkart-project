import { useState } from 'react'
import { AddCopoun } from '../../module/copoun/AddCopoun'
import { ViewCopoun } from '../../module/copoun/ViewCopoun'
import Header from '../../module/header/Header'
import Navbar from '../../module/header/Navbar'

const Partner = () => {
    const [copouns, setCopouns] = useState([]);
    return (
        <div>
            <Header />
            <Navbar />
            <AddCopoun copouns={copouns} setCopouns={setCopouns}/>
            <ViewCopoun copouns={copouns} setCopouns={setCopouns}/>
        </div>
    )
}

export default Partner
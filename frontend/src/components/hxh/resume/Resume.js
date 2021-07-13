import React, { useState, useEffect, useContext, useRef } from 'react'
import Pieces from './Pieces'
import DeadTime from './DeadTime'
import { maxWidth, URL } from '../../../var'
import axios from 'axios'
import Modal from 'react-modal'
import { ModalContainer } from '../../../styles/common'
import { CreateUserForm } from '../../../styles/tpm'
import { ResumeRowContainer } from '../../../styles/hxh'
import { appContext } from '../../../reducers/ProviderHXH'

Modal.setAppElement('#root')

const styles = {
    content : {
        top: window.innerWidth <= maxWidth ? '5%' : '15%',
        left: window.innerWidth <= maxWidth ? '10%' : '30%',
        right: 'auto',
        bottom: 'auto',
        width: window.innerWidth <= maxWidth ? '70%' : '40%',
        height: window.innerWidth <= maxWidth ? '85%' : "90%",
        inset: window.innerWidth > maxWidth ? "5% auto auto 30%" : "5% auto auto 15%"
    },
    overlay: {
        zIndex: 2
    }
}

function Resume( { open, close, line} ){

    //VARS
    const [okPieces, setOkPieces] = useState(NaN)
    const [badPieces, setBadPieces] = useState(NaN)
    const [data, setData] = useState('')
    const interval = useRef()

    const [deadMaterial, setDeadMaterial] = useState('00:00:00')
    const [deadProduction, setDeadProduction] = useState('00:00:00')
    const [deadQuality, setDeadQuality] = useState('00:00:00')
    const [deadEngineering, setDeadEngineering] = useState('00:00:00')
    const [deadChange, setDeadChange] = useState('00:00:00')
    const [deadMant, setDeadMant] = useState('00:00:00')
    const [deadFacilities, setDeadFacilities] = useState("00:00:00")
    const [deadPsi, setDeadPsi] = useState("00:00:00")
    const [deadPse, setDeadPse] = useState("00:00:00")

    const labels = ["Materiales", "Produccción", "Calidad", "Ingeniería", "Cambio Modelo", "Mantenimiento", "Facilities", "PSI", "PSE"]
    const deadTime = [deadMaterial, deadProduction, deadQuality, deadEngineering, deadChange, deadMant, deadFacilities, deadPsi, deadPse]

    const context = useContext(appContext)
    
    const fetchData = async () =>{
        let response = await axios({
            method: 'GET',
            url: `${URL}/hxh/get/all/`
        })
        return response.data
    }

    const CalcDeadTime = (reazon, elements, values) => {
        //console.log(reazon)
        let ocurrences = []
        let val = []
        for(let i = 0; i < elements.length; i++){
            if(elements[i] == reazon){
                ocurrences.push(i)
                val.push(values[i])
            }
        }
        return {'reazon': reazon, 'values': val}
    }

    const setDeadTime = (reazon, value) => {
        switch(reazon){
            case "mantenimiento": return setDeadMant(value)
            case "produccion" : return setDeadProduction(value)
            case "calidad" : return setDeadQuality(value)
            case "ingenieria" : return setDeadEngineering(value)
            case "cambio de modelo": return setDeadChange(value)
            case "materiales": return setDeadMaterial(value)
            case "facilities": return setDeadFacilities(value)
            case "pse": return setDeadPse(value)
            case "psi": return setDeadPsi(value)
        }
    }

    const handleClose = () => {
        
        __setDefault()
        console.log("Closing Modal")
        close()
    }

    const fillResume = () => {
        interval.current = setInterval(() =>{
            fetchData().then((info) => {
                let tempPiecesOk = 0, tempPiecesBad = 0
                let arr = [], allData = []
                let j = 0, k = 0;
                for(let i = 0; i < info.data.piecesOk.length; i++){
                    tempPiecesOk += info.data.piecesOk[i]
                    tempPiecesBad += info.data.pieces[i] - info.data.piecesOk[i]
                }
    
                (new Set(info.data.andon.status)).forEach((idx) => {
                    arr[j++] = idx
                    return arr;
                })
                               
                //console.log(info.data.andon.deadTime)
                //console.log(context.linea)
                arr.forEach(e => allData[k++] = CalcDeadTime(e, info.data.andon.status, info.data.andon.deadTime))
                //console.log(allData)
                allData.forEach((e) => {
                    //console.warn(typeof e)
                    if(e.values.length > 1){
                        let response = e.values.reduce((curr, next) => {
                            //console.log(curr, next)
                            var hourAct = curr.split(":"), nextHour = next.split(":")
                            let hour = Number(hourAct[0]) + Number(nextHour[0])
                            let min = Number(hourAct[1]) + Number(nextHour[1])
                            let seg = Number(hourAct[2]) + Number(nextHour[2])
                            hour = Math.floor(hour + min / 60)
                            min = (Math.floor(min % 60)) + Math.floor(seg / 60)
                            seg = Math.floor(seg % 60)
                            //console.debug(hour, min, seg)
                            //console.log(seg)
                            //console.log(e.reazon)
                            let chain = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}`: min}:${seg < 10 ? `0${seg}`: seg}`;
                            //console.info(chain)
                            return chain      
                        })
                        //console.log(response)
                        setDeadTime(e.reazon, response)
                    }else{
                        setDeadTime(e.reazon, e.values)
                    }
                })   
                setOkPieces(tempPiecesOk)
                setBadPieces(tempPiecesBad)  
                
            }).catch(error => console.error(error))
        }, 1000)
         
    }

    const __setDefault = () =>{
        setDeadMaterial('00:00:00')
        setDeadQuality('00:00:00')
        setDeadChange('00:00:00')
        setDeadEngineering('00:00:00')
        setDeadMant('00:00:00')
        setDeadProduction('00:00:00')
        setDeadFacilities("00:00:00")
        setDeadPse("00:00:00")
        setDeadPsi("00:00:00")
    }

    useEffect(() => {
        if(context.linea && context.linea !== "" && context.linea !== " "){
            //console.log(context.linea)
            setData(line)
            fillResume()
            
        }
        return () => {clearInterval(interval.current)}
    }, [context.linea])

    useEffect(() => {
        if(open){
            __setDefault()
        }
    }, [open])

    return(

        <Modal
            isOpen={open}
            onRequestClose={handleClose}
            style={styles}
        >   
            {(window.innerWidth <= maxWidth ? (
                <CreateUserForm>
                    <h1 style={{fontFamily: 'Arial', color: 'rgb(255, 13, 47)'}}>Resumen: {line}</h1>
                    <ResumeRowContainer>
                        <Pieces
                            title="Piezas Ok"
                            noPieces={okPieces}
                        >
                        </Pieces>
                        <Pieces
                            title="Piezas Bad"
                            noPieces={badPieces}
                        >
                        </Pieces>
                    </ResumeRowContainer>
                    <div>
                        {labels.map((label, idx) => (
                            <DeadTime 
                                title={label}
                                time={deadTime[idx]}
                                isOpened={open}
                            />
                        ))}
                    </div>
                </CreateUserForm>
            ) : (
                <ModalContainer>
                    <h1 style={{fontFamily: 'Arial', color: 'rgb(255, 13, 47)'}}>Resumen: {line}</h1>
                    <ResumeRowContainer>
                        <Pieces
                            title="Piezas Ok"
                            noPieces={okPieces}
                        >
                        </Pieces>
                        <Pieces
                            title="Piezas Bad"
                            noPieces={badPieces}
                        >
                        </Pieces>
                    </ResumeRowContainer>
                    <div>
                        {labels.map((label, idx) => (
                            <DeadTime 
                                title={label}
                                time={deadTime[idx]}
                                isOpened={open}
                            />
                        ))}
                    </div>
                </ModalContainer>
            ) )}
            
        </Modal>

    )

}

export default Resume
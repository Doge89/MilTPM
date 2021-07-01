import React, { useState, useEffect, useContext } from 'react'
import Pieces from './Pieces'
import DeadTime from './DeadTime'
import { maxWidth, URL } from '../../../var'
import axios from 'axios'
import Modal from 'react-modal'
import { ModalContainer } from '../../../styles/common'
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
        height: window.innerWidth <= maxWidth ? '85%' : "70%"
    },
    overlay: {
        zIndex: 2
    }
}

function Resume( { open, close, line, dataLine } ){

    //VARS
    const [okPieces, setOkPieces] = useState(NaN)
    const [badPieces, setBadPieces] = useState(NaN)
    const [data, setData] = useState('')
    const [allData, setAllData] = useState({})

    const [deadMaterial, setDeadMaterial] = useState('00:00:00')
    const [deadProduction, setDeadProduction] = useState('00:00:00')
    const [deadQuality, setDeadQuality] = useState('00:00:00')
    const [deadEngineering, setDeadEngineering] = useState('00:00:00')
    const [deadChange, setDeadChange] = useState('00:00:00')
    const [deadMant, setDeadMant] = useState('00:00:00')

    const context = useContext(appContext)
    
    const fetchData = async () =>{
        let response = await axios({
            method: 'GET',
            url: `${URL}/hxh/get/all/`
        })
        return response.data
    }

    const CalcDeadTime = (reazon, elements, values) => {
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
        }
    }

    const handleClose = () =>{
        setAllData({})
        setDeadMaterial('00:00:00')
        setDeadQuality('00:00:00')
        setDeadChange('00:00:00')
        setDeadEngineering('00:00:00')
        setDeadMant('00:00:00')
        setDeadProduction('00:00:00')
        close()
    }

    const fillResume = () => {
        fetchData().then((info) => {
            const information = info
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

            arr.forEach(e => allData[k++] = CalcDeadTime(e, info.data.andon.status, info.data.andon.deadTime))
            allData.forEach((e) => {
                //console.log(e)

                if(e.values > 1){
                    e.values.reduce((curr, next) => {
                        var hourAct = curr.split(":"), nextHour = next.split(":")
                        let hour = parseInt(hourAct[0]) + parseInt(nextHour[0])
                        let min = parseInt(hourAct[1]) + parseInt(nextHour[1])
                        let seg = parseInt(hourAct[2]) + parseInt(nextHour[2])
                        hour = Math.floor(hour + min / 60)
                        min = Math.floor(min % 60)
                        seg = Math.floor(seg % 60)
                        //console.log(seg)
                        console.log(e.reazon)
                        console.log(`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}`: min}:${seg < 10 ? `0${seg}`: seg}`)
                        let chain = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}`: min}:${seg < 10 ? `0${seg}`: seg}`;
                        // switch(e.reazon){
                        //     case "mantenimiento": console.log("a"); return setDeadMant(chain)
                        //     case "produccion": console.log("b"); return setDeadProduction(chain)
                        //     case "materiales": console.log("c"); return setDeadMaterial(chain)
                        //     case "ingenieria": console.log("d"); return setDeadEngineering(chain)
                        //     case "calidad":  console.log("e"); return setDeadQuality(chain)
                        //     case "cambio modelo": console.log("f"); return setDeadChange(chain); 
                        // }
                        setDeadTime(e.reazon, chain)
                    })
                }else{
                    setDeadTime(e.reazon, e.values)
                }
            })
            setAllData(information.data.andon)      
            setOkPieces(tempPiecesOk)
            setBadPieces(tempPiecesBad)  
            
        }).catch(error => console.error(error)) 
    }

    useEffect(() => {
        if(line && line !== "" && line !== " "){
            setData(line)
            setInterval(() =>{
                fillResume()
            }, 2000)
        }
    }, [context.linea])

    return(

        <Modal
            isOpen={open}
            onRequestClose={handleClose}
            style={styles}
        >   
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
                    <DeadTime
                        title={"Mantenimiento"}
                        time={deadMant}
                    />
                    <DeadTime
                        title={"Produccion"}
                        time={deadProduction}
                    />
                    <DeadTime
                        title={"Materiales"}
                        time={deadMaterial}
                    />
                    <DeadTime
                        title={"Calidad"}
                        time={deadQuality}
                    />
                    <DeadTime
                        title={"Ingenieria"}
                        time={deadEngineering}
                    />
                    <DeadTime
                        title={"Cambio de Modelo"}
                        time={deadChange}
                    />
                </div>
            </ModalContainer>
            
        </Modal>

    )

}

export default Resume
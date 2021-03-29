import React from 'react'

import Input from '../../common/Input'

import { Container, Title } from '../../../styles/common'

function TableHeader({ title, subtitlesCentered, subtitles, className, width, height, contramedida }){

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']

    const getWidthTitle = () => {
        if(subtitlesCentered.length !== 0){
            return `${(100 - ((100 / (subtitlesCentered.length + subtitles?.length)) * subtitles?.length)).toFixed(2)}%`
        }else{ return '100%' }
    }

    const getWidthSubtitleCentered = () => `${(100 / subtitlesCentered.length).toFixed(2)}%`
    
    const getWidthSubtitle = () => `${((100 / (subtitlesCentered.length + subtitles?.length)) * subtitles?.length).toFixed(2)}%`

    const getDate = () => {
        const date = new Date()
        return `${date.getDate()}/${months[date.getMonth()]}/${date.getFullYear()}`
    }

    return(
        <Container 
            flexDirection="column"
            width={width}
            height={height}
            className={className}
            alignItems="flex-start"
            justifyContent="center"
        >
            {contramedida ? (
                <>
                <Container 
                    flexDirection="row"
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Container 
                        flexDirection="row"
                        width="45%"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Input 
                            label="Turno"
                            width="80%"
                        />
                    </Container>
                    <Container 
                        flexDirection="row"
                        width="52%"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <h2>Fecha: {getDate()}</h2>
                    </Container>
                </Container>
                <Container 
                    flexDirection="row"
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <h2>Contramedida efecto</h2>
                </Container>
                </>
            ):(
                <>
                <Container 
                    flexDirection="row"
                    width={getWidthTitle()}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Title color="rgb(80, 80, 80)" size="2vw">{title}</Title>
                </Container>
                {subtitlesCentered.length !== 0 && (
                    <Container 
                        flexDirection="row"
                        width="100%"
                        alignItems="center"
                    >
                        <Container 
                            flexDirection="row"
                            width={getWidthTitle()}
                            alignItems="center"
                        >
                            {subtitlesCentered.map((subtitle, idx) => (
                                <Container 
                                    flexDirection="row"
                                    width={getWidthSubtitleCentered()}
                                    alignItems="center"
                                    justifyContent="center"
                                    key={idx}
                                >
                                    <h2>{subtitle}</h2>
                                </Container>
                            ))}
                        </Container>
                        {subtitles?.map((subtitle, idx) => (
                            <Container 
                                flexDirection="row"
                                width={getWidthSubtitle()}
                                alignItems="center"
                                justifyContent="center"
                                key={idx}
                            >
                                <h2>{subtitle}</h2>
                            </Container>
                        ))}
                    </Container>
                )}
                </>
            )}
        </Container>
    )
}

export default TableHeader
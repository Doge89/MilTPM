export const columns = [{
    width: '15%',
    subtitlesCentered: ['Inicio', 'Final'],
    subtitles: ['Plan'],
    title: 'Hora'
},{
    width: '23%',
    subtitlesCentered: ['Actual', 'Diferencia', 'Tiempo muerto'],
    subtitles: [],
    title: 'Producción'
},{
    width: '13%',
    subtitlesCentered: ['Código', 'Cantidad'],
    subtitles: [],
    title: 'FTQ'
},{
    width: '12%',
    subtitlesCentered: ['Descripción defecto'],
    subtitles: [],
    title: 'Status'
},{
    width: '17%',
    subtitlesCentered: ['Contramedida defecto'],
    subtitles: [],
    contramedida: true
},{
    width: '20%',
    subtitlesCentered: [],
    subtitles: [],
    title: 'Comentarios'
}]

export const scheduleA = [{ start: '06:00:00', end: '07:00:00' }, { start: '07:00:00', end: '08:00:00' }, { start: '08:00:00', end: '09:00:00' },
{ start: '09:00:00', end: '10:00:00' }, { start: '10:00:00', end: '11:00:00' }, { start: '11:00:00', end: '12:00:00' }, 
{ start: '12:00:00', end: '13:00:00' }, { start: '13:00:00', end: '14:00:00' }, { start: '14:00:00', end: '15:00:00' }]

export const scheduleB = [{ start: '15:00:00', end: '16:00:00' }, { start: '16:00:00', end: '17:00:00' }, { start: '17:00:00', end: '18:00:00' }, 
{ start: '18:00:00', end: '19:00:00' }, { start: '19:00:00', end: '20:00:00' }, { start: '20:00:00', end: '21:00:00' }, 
{ start: '21:00:00', end: '22:00:00' }, { start: '22:00:00', end: '23:00:00' }]

export const scheduleC = [{ start: '23:00:00', end: '20:00:00' }, { start: '00:00:00', end: '01:00:00' }, { start: '00:00:00', end: '01:00:00' },
 { start: '01:00:00', end: '02:00:00' }, { start: '02:00:00', end: '03:00:00' }, { start: '03:00:00', end: '04:00:00' }, 
 { start: '04:00:00', end: '05:00:00' }, { start: '05:00:00', end: '06:00:00' }]

export const allDay= [{ start: '00:00:00', end: '01:00:00' }, { start: '01:00:00', end: '02:00:00' }, { start: '02:00:00', end: '03:00:00' }
, { start: '03:00:00', end: '04:00:00' }, { start: '04:00:00', end: '05:00:00' }, { start: '05:00:00', end: '06:00:00' }, ...scheduleA, ...scheduleB,
{ start: '23:00:00', end: '24:00:00' }]

export const URL = 'http://192.168.100.22'

export const modifyViews = [{ nombre: 'Usuarios', value: 'user' }, { nombre: 'Cronograma', value: 'schedule' }, { nombre: 'Puerto COM', value: 'port' }]

export const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

export const maxWidth = 768

export const andonReason = ['materiales', 'mantenimiento', 'produccion', 'ingenieria', 'calidad', 'cambio']
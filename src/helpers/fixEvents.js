import moment from 'moment';

export const fixEvents = ( events =[] ) => {
    return events.map(
        (e) => ({
            ...e,
            start: moment(e.initDate).toDate(),
            end: moment(e.endDate).toDate()
        }))
}
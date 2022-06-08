import moment from 'moment';

// this helper will reformat the date value we receive from the backend request
// as sometimes the data gets on conflict with the calendar formatting of the events
// so, along with the moment.js, the date data will be properly received and fixed
export const fixEvents = ( events = [] ) => {
    return events.map(
        (e) => ({
            ...e,
            start: moment(e.start).toDate(),
            end: moment(e.end).toDate()
        }))
}
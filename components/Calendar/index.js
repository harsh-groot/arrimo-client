import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import { Row, Col } from 'antd';
import ModalComponent from '../CalendarModal';
import { httpGetEvents } from '../../requests/events';

const FullCalendar =  dynamic(() =>  import('@fullcalendar/react'), {ssr:false});


const CalendarComponent = () => {

    
    const [state, setState] = useState({
        showModal:false,
        operationType:"Add",
        modalTitle:"Add New Event",
        selectedDate:null,
        eventData:null
    })
    
    const { operationType, modalTitle, selectedDate, showModal, eventData } = state;

    const [allEvents, setAllEvents] = useState([]);

    const handleDateClick = (arg) => {
        setState({
            ...state,
            showModal:true,
            selectedDate:arg,
            eventData:null
        })
    }

    const getEvents = () => {
        httpGetEvents().then(res => {
            console.log(res.data);
              setAllEvents(res.data.map(item => (
                    {
                      title:item.event,
                      date:item.date,
                      event_id:item._id      
                    }
                )))    
        })
    }

    const handleEventClick = (eventData) => {
        console.log(eventData);
        setState({
            ...state,
            showModal:true,
            operationType:'Edit',
            modalTitle:"Edit Event",
            eventData:{
                title:eventData?.event._def.title,
                date:eventData?.el?.fcSeg.eventRange.range.start,
                event_id:eventData?.event._def?.extendedProps.event_id
            }
        })
    }

    const handleClose = () => {
        setState({
            ...state,
            showModal:false,
            selectedDate:null,
            operationType:"Add",
            modalTitle:"Add New Event",
        })
        getEvents();
    }

useEffect(() => {
  getEvents();
},[])

return (
    <Row className='calendar-container'>
        <Col span={20}>
        <FullCalendar
    plugins={[ dayGridPlugin, interactionPlugin ]}
    initialView="dayGridMonth"
    weekends={true}
    events={allEvents}
    dateClick={handleDateClick}
    eventClick={handleEventClick}
  />
  </Col>

    {showModal ? <ModalComponent show={showModal} handleCancel={handleClose} title={modalTitle} operationType={operationType} selectedDate={selectedDate} eventData={eventData}/>  : null}
    </Row>
)
}

export default CalendarComponent;
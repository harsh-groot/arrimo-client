import React from 'react'
import CalendarComponent from '../components/Calendar'
import Layout from '../components/Layout';

const CalendarPage = () => {
  return (
    <CalendarComponent/>
  )
}

CalendarPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CalendarPage
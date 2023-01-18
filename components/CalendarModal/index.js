import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import moment from 'moment/moment';
import {DeleteOutlined} from '@ant-design/icons';
import { httpAddEvent, httpDeleteEvent, httpUpdateEvent } from '../../requests/events';

const ModalComponent = ({show, handleCancel, title, operationType, selectedDate, eventData}) => {
console.log(selectedDate);
console.log(eventData);
const [form] = Form.useForm();

const deleteEvent = () => {
  let payload = {
    id:eventData?.event_id
  }
  httpDeleteEvent(payload).then(res => {
    if(res.status == 200){
     message.success('Event Deleted Successfully')
     handleCancel();
    }else{
      message.error("We are facing network issues. Kindly try again after sometime.")
    }
   })
}

  const onFinish = (values) => {
    console.log('Success:', values);
if(eventData == null){
    let payload = {
      event:values.event_title,
      date:values.event_date
    }
    httpAddEvent(payload).then(res => {
     if(res.status == 200){
      message.success('Event Added Successfully')
      handleCancel();
     }else{
      message.error("We are facing network issues. Kindly try again after sometime.")
    }
    })

  }else{
    let payload = {
      event:values.event_title,
      date:values.event_date,
      id:eventData?.event_id
    }
    httpUpdateEvent(payload).then(res => {
      if(res.status == 200){
       message.success('Event Updated Successfully')
       handleCancel();
      }else{
        message.error("We are facing network issues. Kindly try again after sometime.")
      }
     })
  }
}

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

useEffect(() => {
    if(selectedDate !== null){
    form.setFieldValue("event_date", moment(selectedDate?.date).format('YYYY-MM-DD'))
    }

    if(eventData){
        console.log(eventData);
        form.setFieldValue('event_title', eventData?.title);
        form.setFieldValue('event_date', moment(eventData?.date).format('YYYY-MM-DD'))
    }
},[])

  return (
    <>
 
      <Modal title={title} open={show} footer={null} onCancel={handleCancel}>
      <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onErr
    >
      <Form.Item
        label="Event Title"
        name="event_title"
        rules={[{ required: true, message: 'Please input your event title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Event Date"
        name="event_date"
      >
        <Input type='date'   />
      </Form.Item>
      <Form.Item className='action-buttons'>
       
        <Button type="primary" htmlType="submit">
         {operationType === "Add" ? "Save" : "Update" }
        </Button>
        <Button htmlType="button" onClick={handleCancel}>
          Cancel
        </Button>
        </Form.Item>
      </Form>
      {operationType !== "Add" ? <DeleteOutlined onClick={deleteEvent} className='delete-btn' /> : null}
      </Modal>
    </>
  );
};

export default ModalComponent;
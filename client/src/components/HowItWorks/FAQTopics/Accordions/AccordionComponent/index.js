import React from 'react';
import { Accordion } from 'react-bootstrap';

function AccordionComponent ({ id, title, data }) {
  const items = data.map((item, i) => {
    return (
      <Accordion.Item eventKey={i} className={'mb-3 border-top'}>
        <Accordion.Header>{item.head}</Accordion.Header>
        <Accordion.Body>{item.content}</Accordion.Body>
      </Accordion.Item>
    );
  });
  return (
    <div id={id} className={'py-5'}>
      <h3 className='text-primary fw-bold'>{title}</h3>
      <Accordion defaultActiveKey={0}>{items}</Accordion>
    </div>
  );
}

export default AccordionComponent;

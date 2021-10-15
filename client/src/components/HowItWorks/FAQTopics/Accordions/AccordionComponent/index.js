import React from 'react';
import { Accordion } from 'react-bootstrap';

function AccordionComponent ({ id, title, data }) {
  const items = data.map((item, i) => {
    return (
      <Accordion.Item key={i} eventKey={i} className={'mb-3 border-top'}>
        <Accordion.Header>{item.head}</Accordion.Header>
        <Accordion.Body>{item.content}</Accordion.Body>
      </Accordion.Item>
    );
  });
  return (
    <>
      <h3 className='text-primary fw-bold mb-2'>{title}</h3>
      <Accordion defaultActiveKey={0}>{items}</Accordion>
    </>
  );
}

export default AccordionComponent;

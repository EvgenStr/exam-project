import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import cx from 'classnames';
import styles from './ModalVideo.module.sass';

function ModalVideo () {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        className='btn btn-primary btn-wide btn-pill mb-2 mb-sm-0 mr-sm-2'
        onClick={() => setModalShow(true)}
      >
        <small className={cx('fas fa-play', styles.play)}></small>
        Play Video
      </Button>

      <Modal
        show={modalShow}
        size='lg'
        dialogClassName='modal-90w'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <div className={styles.playerWrapper}>
            <ReactPlayer
              className={styles.reactPlayer}
              url='https://vimeo.com/368584367'
              controls
              width='100%'
              height='100%'
            />{' '}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalVideo;

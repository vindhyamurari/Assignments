import {Modal,Button} from 'react-bootstrap'

function MyVerticallyCenteredModal(props:any) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       {/*  <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <h5>{props.header}</h5>
          <p>
            {props.body}
          </p>
        </Modal.Body>
        {/* <Modal.Footer> */}
          <Button className='btn btn-dark' onClick={props.onHide}>Close</Button>
        {/* </Modal.Footer> */}
      </Modal>
    );
  }
 export {MyVerticallyCenteredModal}
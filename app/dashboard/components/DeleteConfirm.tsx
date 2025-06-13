import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  show,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Body className='text-center'>
        <p>삭제하시겠습니까?</p>
        <div className='d-flex justify-content-center gap-2 mt-3'>
          <Button variant='danger' onClick={onConfirm}>
            삭제
          </Button>
          <Button variant='secondary' onClick={onCancel}>
            취소
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

import { Modal, Button, Form } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import useAddItems, { AddItemProps } from "../hooks/useAddItems";
import { TodoStatus } from "../hooks/useCtrlItems";
import DateRangeInput from "./DateValidation";

export default function AddItem({
  item,
  onSave,
  onDelete,
  show,
  onClose,
}: AddItemProps) {
  const {
    title,
    setTitle,
    contents,
    setContents,
    tagInput,
    setTagInput,
    tags,
    setTags,
    handleSave,
    handleRemoveTag,
    handleKeyDown,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
  } = useAddItems({ item, onSave, onDelete, show, onClose });

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Form.Group controlId={"titleCtrl-" + item?.id}>
            <Form.Label className='mb-2'>Task</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name='title'
              placeholder='제목을 입력해 주세요'
            />
          </Form.Group>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className='mb-3'>
          <DateRangeInput
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startId={`${item?.id}-start`}
            endId={`${item?.id}-end`}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId={"statusCtrl-" + item?.id}>
          <Form.Label className='mb-2'>상태</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value as TodoStatus)}
          >
            <option value='todo'>할 일</option>
            <option value='doing'>진행중</option>
            <option value='done'>완료</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId={"contentCtrl-" + item?.id}>
          <Form.Label className='mb-2'>내용</Form.Label>
          <Form.Control
            as='textarea'
            rows={10}
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            placeholder='내용을 입력해 주세요.'
            name='contents'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId={"tagCtrl-" + item?.id}>
          <div className='d-flex'>
            <Form.Control
              type='text'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='태그를 입력하고 Enter를 누르세요'
            />
            <Button
              variant='outline-secondary'
              onClick={() => {
                if (tagInput.trim() !== "") {
                  setTags((prev) => [...prev, tagInput.trim()]);
                  setTagInput("");
                }
              }}
              className='ms-2'
            >
              추가
            </Button>
          </div>

          <div className='mt-2'>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className='badge bg-primary me-2'
                onClick={() => handleRemoveTag(idx)}
              >
                {tag} <BsXCircleFill />
              </span>
            ))}
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleSave}>
          저장
        </Button>
        <Button variant='secondary' onClick={onClose}>
          취소
        </Button>
        <Button
          variant='danger'
          onClick={() => {
            if (item) onDelete(item);
          }}
        >
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

"use client";
import "../styles/dashboard.css";
import { Container, Card } from "react-bootstrap";
import BoardHeader from "./components/BoardHeader";
import TodoItem from "./components/TodoItem";
import AddItem from "./components/AddItem";
import useCtrlItems from "./hooks/useCtrlItems";

export default function DashBoard() {
  const {
    items,
    selectedItem,
    handleAddItem,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveItem,
    handleDeleteItem,
  } = useCtrlItems();

  return (
    <Container>
      <BoardHeader onAddClick={handleAddItem} />

      <div id='dashBoard'>
        <Card>
          <Card.Header>할 일</Card.Header>
          <div className='card-body'>
            {items.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                text={item.text}
                tags={item.tags}
                onClick={() => handleOpenDetail(item)}
              />
            ))}
          </div>
        </Card>

        <AddItem
          show={!!selectedItem}
          item={selectedItem}
          onSave={handleSaveItem}
          onClose={handleCloseDetail}
          onDelete={handleDeleteItem}
        />

        <Card>
          <Card.Header>진행중</Card.Header>
          <div className='card-body'></div>
        </Card>
        <Card>
          <Card.Header>완료</Card.Header>
          <div className='card-body'></div>
        </Card>
      </div>
    </Container>
  );
}

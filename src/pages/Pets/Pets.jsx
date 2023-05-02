import axios from "axios";
import "./Pets.css"
import { useEffect, useState } from "react";
import { Table, Button, Modal, Pagination } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Pets() {
  const [pets, setPets] = useState([]);
  const [petId, setPetId] = useState(null);
  const [show, setShow] = useState(null);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/pets")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Pagination pets
  const [ petsPerPage, setPetPerPage ] = useState(10);
  const [ currentPage, setCurrentPage ] = useState(0);
  const startIndex = currentPage * petsPerPage;
  const endIndex = startIndex + petsPerPage;
  const currentIndex = pets.slice(startIndex, endIndex)
  const pages = Math.ceil( pets.length / petsPerPage)

  function prev() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  function next() {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }
  // Pagination pets
  console.log(pages)

  const handleClose = () => {
    setPetId(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setPetId(id);
    setShow(true);
  };

  function onDelete() {
    axios
      .delete(`http://localhost:3001/pets/${petId}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }

  return (
    <div className="pets container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Pets</h1>
        <Button>
          <i className="bi bi-plus-lg me-2"></i> Pet
        </Button>
      </div>
      {pets === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>tipo</th>
              <th>porte</th>
              <th>data de Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentIndex.map((pet) => {
              return (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.tipo}</td>
                  <td>{pet.porte}</td>
                  <td>{pet.dataNasc}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <Button onClick={() => handleShow(pet.id)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button as={Link} to={`/pet/editar/${pet.id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button as={Link} to={`/petsinfo/${pet.id}`}>
                      <i className="bi bi-info-lg"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Pagination className="d-flex justify-content-center">
        <Button className="button rounded-start" variant="none" onClick={prev}><Pagination.Prev /></Button>
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item className="pagination">{currentPage + 1}</Pagination.Item>
        <Pagination.Ellipsis />
      <Pagination.Item>{pages}</Pagination.Item>
        <Button className="button rounded-end" variant="none" onClick={next}><Pagination.Next /></Button>      
      </Pagination>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o Pet?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Servicos() {
  const [servicos, setServicos] = useState(null);
  const [show, setShow] = useState(false);
  const [idServico, setIdServico] = useState(null);

  const handleClose = () => {
    setIdServico(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdServico(id);
    setShow(true);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/servicos")
      .then((response) => {
        setServicos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/servicos/${idServico}`)
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
    <div className="clientes container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Serviços</h1>
        <Button as={Link} to="/servicos/novo">
          <i className="bi bi-plus-lg me-2"></i> Serviço
        </Button>
      </div>
      {servicos === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((servico) => {
              return (
                <tr key={servico.id}>
                  <td>{servico.nome}</td>
                  <td style={{ color: "forestgreen", fontSize: " 18px" }}>
                    {servico.preco}R$
                  </td>
                  <td className="d-flex gap-2">
                    <Button onClick={() => handleShow(servico.id)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button as={Link} to={`/servicos/editar/${servico.id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o serviço?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={onDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

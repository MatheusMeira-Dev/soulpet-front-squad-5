import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useState, useEffect } from "react";

export function Agendamentos() {
  const [listaAgendamentos, setListaAgendamentos] = useState(null);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/agendamentos")
      .then((response) => {
        setListaAgendamentos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteAgendamento() {
    console.log("ok");
  }

  return (
    <div className="agendamento container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Agendamento</h1>
        <Button as={Link} to="#">
          <i className="bi bi-plus-lg me-2 "></i> Agendamento
        </Button>
      </div>
      {listaAgendamentos === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Realizada</th>
              <th>Data Agendada</th>
            </tr>
          </thead>
          <tbody>
            {listaAgendamentos.map((agendamento) => {
              return (
                <tr key={agendamento.id}>
                  <td>
                    {agendamento.realizada === true ? "Realizado" : "Pendente"}
                  </td>
                  <td>{agendamento.dataAgendada}</td>
                  <td className="d-flex gap-2">
                    <Button onClick={() => deleteAgendamento}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button as={Link} to={`/agendamentos/editar/${agendamento.id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

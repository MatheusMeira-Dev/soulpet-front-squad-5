import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { Loader } from "../../components/Loader/Loader";


export function PetsInfo() {
    const [ pet, setPet ] = useState([]);
    const [cliente, setCliente] = useState([]);
    const { id } = useParams();
    console.log(pet.clienteId)

    useEffect(() => {
        initializeTable();
      }, []);

    
      function initializeTable() {
        axios.get(`http://localhost:3001/pets/${id}`)
          .then((response) => {
            setPet(response.data);
            axios.get(`http://localhost:3001/clientes/${response.data.clienteId}`)
            .then(response => {
                setCliente(response.data);
            })
            .catch(error => {
                console.log(error);
            });
          })
          .catch((error) => {
            console.log(error);
          });
          
      }


    return (
        <div className="petsinfo container">
            <h1>Detalhes de {pet.nome}</h1>
            {pet === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dono</th>
              <th>Email do Dono</th>
              <th>Telefone do Dono</th>
            </tr>
          </thead>
          <tbody>
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                </tr>
          </tbody>
        </Table>
      )}
        </div>
    )
}
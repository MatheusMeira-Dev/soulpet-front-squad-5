import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";


export function Clientes() {

    const [clientes, setClientes] = useState(null);
    const [show, setShow] = useState(false);
    const [idCliente, setIdCliente] = useState(null);
  
    const handleClose = () => {
        setIdCliente(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdCliente(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }



    function onDelete() {
        axios.delete(`http://localhost:3001/clientes/${idCliente}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    async function gerarPDF(clienteId) {
        
        const clienteResponse = await axios.get(`http://localhost:3001/clientes/${clienteId}`);
        const petsResponse = await axios.get(`http://localhost:3001/clientes/${clienteId}/pets`);
      
        const cliente = clienteResponse.data;
        const pets = petsResponse.data; 
                  
        const doc = new jsPDF();      
        
        doc.setFontSize(22);
        doc.text("Dados do Cliente", 14, 22);
        doc.setFontSize(12);      
        
        const clienteTableData = [
          { label: "Nome", value: cliente.nome },
          { label: "E-mail", value: cliente.email },
          { label: "Telefone", value: cliente.telefone },
        ];
      
        doc.autoTable({
          head: [["Campo", "Valor"]],
          body: clienteTableData.map((data) => [data.label, data.value]),
          startY: 32,
        });      
        
        const petsTableData = pets.map((pet) => ({
          id: pet.id,
          nome: pet.nome,
          tipo: pet.tipo,
          porte: pet.porte,
          dataNasc: pet.dataNasc,
        }));
      
        if (petsTableData.length > 0) {
          doc.setFontSize(22);
          doc.text("Pets", 14, doc.autoTable.previous.finalY + 14);
          doc.setFontSize(12);
          doc.autoTable({
            columns: [
              { header: "ID", dataKey: "id" },
              { header: "Nome", dataKey: "nome" },
              { header: "Tipo", dataKey: "tipo" },
              { header: "Porte", dataKey: "porte" },
              { header: "Data de Nascimento", dataKey: "dataNasc" },
            ],
            body: petsTableData,
            startY: doc.autoTable.previous.finalY + 22,
          });
        }
      
        const pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);        
        window.open(pdfUrl);
      }
      

    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Clientes</h1>
                
                <Button   as={Link} to="/clientes/novo">
                    <i className="bi bi-plus-lg me-2"></i> Cliente
                </Button>
            </div>
            {
                clientes === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => {
                                return (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.telefone}</td>
                                        <td className="d-flex gap-2">
                                            <Button   onClick={() => handleShow(cliente.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button   as={Link} to={`/clientes/editar/${cliente.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button onClick={() => gerarPDF(cliente.id)}>
                                                 <i className="bi bi-file-earmark-pdf-fill"></i>
                                            </Button>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o cliente?</Modal.Body>
                <Modal.Footer>
                    <Button   onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button   onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    ); 
}
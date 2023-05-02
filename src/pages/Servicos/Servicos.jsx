import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Servicos() {

    const [ servicos, setServicos] = useState(null);

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/servicos")
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Serviços</h1>
                <Button as={Link} to="/servicos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Serviço
                </Button>
            </div>
            {
                servicos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map(servico => {
                                return (
                                    <tr key={servico.id}>
                                        <td>{servico.nome}</td>
                                        <td style={{ color: 'forestgreen', fontSize: ' 18px' }}>{servico.preco}R$</td>
                                        <td className="d-flex gap-2">
                                            <Button >
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/servicos/editar/${servico.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
        </div>
    );
}
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";


export function Produtos() {

    const [produtos, setProdutos] = useState(null);
    
 
    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/produtos")
            .then(response => {
              setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div className="produtos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Produtos</h1>
                <Button   as={Link} to="/">
                    <i className="bi bi-plus-lg me-2 "></i> Produtos
                </Button>
            </div>
            {
                produtos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produtos => {
                                return (
                                    <tr key={produtos.id}>
                                        <td>{produtos.nome}</td>
                                        <td>R$ {produtos.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        <td>{produtos.categoria}</td>
                                        <td className="d-flex gap-2">
                                            <Button  > 
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button   >
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

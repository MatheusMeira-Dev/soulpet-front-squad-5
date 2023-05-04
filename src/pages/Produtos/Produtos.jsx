import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Produtos() {

    const [produtos, setProdutos] = useState(null);
    const [ produtoId, setProdutoId] = useState(false);
    const [show, setShow] = useState(null);
    
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
    const handleClose = () => {
        setProdutoId(null);
        setShow(false);
      };
      const handleShow = (id) => {
        setProdutoId(id);
        setShow(true);
      };

    function onDelete() {
            axios.delete(`http://localhost:3001/produtos/${produtoId}`)
            .then((response) => {
               toast.success(response.data.menssage, {position:"bottom-left", duration:2000})
               initializeTable();
               setShow(false);
            })
            .catch((error) => {
                console.log(error);
            });
        }

    return (
        <div className="produtos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Produtos</h1>
                <Button   as={Link} to="/produto/novo">
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
                            {produtos.map(produto => {
                                return (
                                    <tr key={produto.id}>
                                        <td>{produto.nome}</td>
                                        <td style={{ color: 'forestgreen', fontSize: ' 18px' }}>R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        <td>{produto.categoria}</td>
                                        <td className="d-flex gap-2">
                                        <Button onClick={() => handleShow(produto.id)}> 
                                        <i className="bi bi-trash-fill"></i>
                                        </Button>

                                            <Button  as={Link}  to={`/produto/editar/${produto.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
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
        <Modal.Body>Tem certeza que deseja excluir o Produto?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={onDelete}>Excluir</Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}


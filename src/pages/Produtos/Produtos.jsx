import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";


export function Produtos() {

    const [produtos, setProdutos] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [produtoExclusao, setProdutoExclusao] = useState(null);
    
 
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
    function handleDeleteClick(produto) {
        setProdutoExclusao(produto);
        setShowModal(true);
    }
    function handleConfirmDelete() {
        if (produtoExclusao) {
            axios
            .delete(`http://localhost:3001/produtos/${produtoExclusao.id}`)
            .then(() => {
                const newProdutos = produtos.filter(
                    (produto) => produto.id !== produtoExclusao.id
                );
                setProdutos(newProdutos);
                setProdutoExclusao(null);
                setShowModal(false);
            })
            .catch((error) => {
                console.log(error);
            });
        }}
        
        function handleCancelDelete() {
        setProdutoExclusao(null);
        setShowModal(false);
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
                            {produtos.map(produtos => {
                                return (
                                    <tr key={produtos.id}>
                                        <td>{produtos.nome}</td>
                                        <td style={{ color: 'forestgreen', fontSize: ' 18px' }}>R$ {produtos.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        <td>{produtos.categoria}</td>
                                        <td className="d-flex gap-2">
                                        <Button onClick={() => handleDeleteClick(produtos)}> 
                                        <i className="bi bi-trash-fill"></i>
                                        </Button>

                                            <Button  as={Link}  to={`/produto/editar/${produtos.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Footer closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
          <Modal.Body className="exclusao-modal-body">
            Tem certeza que deseja excluir o produto {produtoExclusao && produtoExclusao.nome}?
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Excluir
          </Button>
          <Modal.Footer className="bg-light"></Modal.Footer>

        </Modal.Footer>
        </Modal.Footer>
       </Modal>

        </div>
        
    );
}


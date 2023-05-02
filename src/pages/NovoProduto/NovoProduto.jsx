import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


import "./NovoProduto.css";

export function NovoProduto() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    function onSubmit(data) {
        axios.post("http://localhost:3001/produtos", data)
            .then(response => {
                toast.success("Produto adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/produtos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Novo Produto</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."} })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" step="0.01" className={errors.email && "is-invalid"} {...register("preco", { required: "O preço é obrigatório.", maxLength: { value: 10, message: "Digite um valor valido"} })} />
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control as="textarea" className={errors.descricao && "is-invalid"} {...register("descricao", { required: "A descrição é obrigatória.", maxLength: { value: 1000, message: "Limite de 1000 caracteres."} })} />
                  {errors.descricao && <Form.Text className="invalid-feedback">{errors.descricao.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Desconto (R$)</Form.Label>
                <Form.Control type="number" step="0.01" className={errors.desconto && "is-invalid"} {...register("desconto", { required: "O desconto é obrigatório." })} />
                {errors.desconto && <Form.Text className="invalid-feedback">{errors.desconto.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data do Desconto</Form.Label>
                <Form.Control type="date"
                 className={errors.dataDesconto && "is-invalid"} {...register("dataDesconto", { required: "A data do desconto é obrigatória." })}
                 min={minDate} />
                {errors.dataDesconto && <Form.Text className="invalid-feedback">{errors.dataDesconto.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  as="select" className={errors.categoria && "is-invalid"}
                  {...register("categoria", {
                    required: "A categoria é obrigatória.",
                  })}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Higiene">Higiene</option>
                  <option value="Brinquedos">Brinquedos</option>
                  <option value="Conforto">Conforto</option>
                  <option value="Alimentação">Alimentação</option>
                </Form.Control>
                {errors.categoria && (
                  <Form.Text className="invalid-feedback">
                    {errors.categoria.message}
                  </Form.Text>
                )}
              </Form.Group>



                <Button   type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}
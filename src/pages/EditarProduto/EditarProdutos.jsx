import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditarProdutos() {

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    function onSubmit(data) {
        axios.put(`http://localhost:3001/produtos/${id}`, data)
            .then(response => {
                toast.success("Produto editado.", { position: "bottom-right", duration: 2000 });
                navigate("/produtos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos/${id}`)
            .then(response => {
                const { nome, preco, descricao, desconto, dataDesconto, categoria } = response.data;
                setValue("nome", nome);
                setValue("preco", preco);
                setValue("descricao", descricao);
                setValue("desconto", desconto);
                setValue("dataDesconto", dataDesconto);
                setValue("categoria", categoria);
            })
            .catch(error => {
                toast.error("Erro ao carregar o produto.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }, [id, setValue]);
    

    // useEffect(() => {
    //     axios.get(`http://localhost:3001/produtos/${id}`)
    //         .then(response => {
    //             const { nome, preco, descricao, desconto, dataDesconto, categoria } = response.data;
    //             reset({  nome, preco, descricao, desconto, dataDesconto, categoria });
    //         })
    //         .catch(error => {
    //             toast.error("Erro ao carregar o produto.", { position: "bottom-right", duration: 2000 });
    //             console.log(error);
    //         }, [id, reset]);
    //     });

    return (
        <div className="container">
            <h1>Editar Produtos</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."} })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" step="0.01" className={errors.preco && "is-invalid"} {...register("preco", { required: "O preço é obrigatório.", min: { value: 0, message: "Valor mínimo é 0."} })} />
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control as="textarea" rows={3} className={errors.descricao && "is-invalid"} {...register("descricao", { required: "A descrição é obrigatória." })} />
                    {errors.descricao && <Form.Text className="invalid-feedback">{errors.descricao.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Desconto (R$)</Form.Label>
                    <Form.Control type="number" step="0.01" className={errors.desconto && "is-invalid"} {...register("desconto", { min: { value: 0, message: "Valor mínimo é 0." }, max: { value: 100, message: "Valor máximo é 100." } })} />
                    {errors.desconto && <Form.Text className="invalid-feedback">{errors.desconto.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data do Desconto</Form.Label>
                    <Form.Control type="date" className={errors.dataDesconto && "is-invalid"} {...register("dataDesconto", { validate: value => new Date(value) > new Date() || "A data deve ser futura." })} 
                     min={minDate}/>
                    {errors.dataDesconto && <Form.Text className="invalid-feedback">{errors.dataDesconto.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select className={errors.categoria && "is-invalid"} {...register("categoria", { required: "A categoria é obrigatória.", validate: value => ["Higiene", "Brinquedos", "Conforto", "Alimentação"].includes(value) || "Categoria inválida." })}>
                        <option value="">Selecione uma categoria</option>
                        <option value="Higiene">Higiene</option>
                        <option value="Brinquedos">Brinquedos</option>
                        <option value="Conforto">Conforto</option>
                        <option value="Alimentação">Alimentação</option>
                    </Form.Select>
                    {errors.categoria && <Form.Text className="invalid-feedback">{errors.categoria.message}</Form.Text>}
                </Form.Group>
                
                <Button   type="submit">
                    Editar
                </Button>
                <Button className="ms-2" onClick={() => navigate("/produtos")}>
                    Cancelar
                </Button>

            </Form>
        </div>
    );
}
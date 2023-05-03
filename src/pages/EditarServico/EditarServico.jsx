import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditarServico() {

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/servicos/${id}`, data)
            .then(response => {
                toast.success("Serviço editado.", { position: "bottom-right", duration: 2000 });
                navigate("/servicos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/servicos/${id}`)
            .then(response => {
                const { nome, preco } = response.data;
                setValue("nome", nome);
                setValue("preco", preco);
            })
            .catch(error => {
                toast.error("Erro ao carregar o Serviço.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }, [id, setValue]);
    
    return (
        <div className="container">
            <h1>Editar Serviços</h1>
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
                
                <Button type="submit">
                    Editar
                </Button>
                <Button className="ms-2" onClick={() => navigate("/servicos")}>
                    Cancelar
                </Button>

            </Form>
        </div>
    );
}
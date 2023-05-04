import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditarAgendamento() {

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    function onSubmit(data) {
        axios.put(`http://localhost:3001/agendamentos/${id}`, data)
            .then(response => {
                toast.success("Agendamento editado.", { position: "bottom-right", duration: 2000 });
                navigate("/agendamentos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Editar Agendamentos</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="mb-3">
            <Form.Group className="mb-3">
                    <Form.Label>Realizado?</Form.Label>
                    <Form.Select className={errors.realizada && "is-invalid"} {...register("realizada", 
                    { required: "A realizada é obrigatória.", validate: value => [ true, false ].includes(value === "true" ? true : value === "false" ? false : null) || "realizada inválida." })}>
                        <option value="">Selecione uma Opção</option>
                        <option value={true}>Realizado</option>
                        <option value={false}>Pendente</option>
                    </Form.Select>
                    {errors.realizada && <Form.Text className="invalid-feedback">{errors.realizada.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data Agendada</Form.Label>
                    <Form.Control type="date" className={errors.dataAgendamento && "is-invalid"} {...register("dataAgendamento", { validate: value => new Date(value) > new Date() || "A data deve ser futura." })} 
                     min={minDate}/>
                    {errors.dataAgendamento && <Form.Text className="invalid-feedback">{errors.dataAgendamento.message}</Form.Text>}
                </Form.Group>

                
                <Button   type="submit">
                    Editar
                </Button>
                <Button className="ms-2" onClick={() => navigate("/agendamentos")}>
                    Cancelar
                </Button>

            </Form>
        </div>
    );
}
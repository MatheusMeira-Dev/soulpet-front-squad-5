import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoAgendamento() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

  function onSubmit(data) {
    axios.post("http://localhost:3001/agendamentos", data)
      .then((response) => {
        toast.success("Agendamento adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/agendamentos");
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }
  return (
    <div className="container">
      <h1>Novo Agendamento</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Group className="mb-3">
          <Form.Label>Realizado?</Form.Label>
          <Form.Select
            className={errors.realizada && "is-invalid"}
            {...register("realizada", {
              required: "A realizada é obrigatória.",
              validate: (value) =>
                [true, false].includes(
                  value === "true" ? true : value === "false" ? false : null
                ) || "realizada inválida.",
            })}
          >
            <option value="">Selecione uma Opção</option>
            <option value={true}>Realizado</option>
            <option value={false}>Pendente</option>
          </Form.Select>
          {errors.realizada && (
            <Form.Text className="invalid-feedback">
              {errors.realizada.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data Agendada</Form.Label>
          <Form.Control
            type="date"
            className={errors.dataAgendada && "is-invalid"}
            {...register("dataAgendada", {
              validate: (value) =>
                new Date(value) > new Date() || "A data deve ser futura.",
            })}
            min={minDate}
          />
          {errors.dataAgendada && (
            <Form.Text className="invalid-feedback">
              {errors.dataAgendada.message}
            </Form.Text>
          )}
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Id do Pet</Form.Label>
          <Form.Control
            type="number"
            className={errors.petId && "is-invalid"}
            {...register("petId", {
              required: "O Id do pet é obrigatório.",
            })}
          />
          {errors.petId && (
            <Form.Text className="invalid-feedback">
              {errors.petId.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Id do Serviço</Form.Label>
          <Form.Control
            type="number"
            className={errors.servicoId && "is-invalid"}
            {...register("servicoId", {
              required: "O Id do Serviço é obrigatório.",
            })}
          />
          {errors.servicoId && (
            <Form.Text className="invalid-feedback">
              {errors.servicoId.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </div>
  );
}

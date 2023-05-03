import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoServico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/servicos", data)
      .then((response) => {
        toast.success("Serviço adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/servicos");
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
      <h1>Novo Serviço</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="Nome"
            className={errors.nome && "is-invalid"}
            {...register("nome", {
              required: "O nome é obrigatório.",
              maxLength: { value: 130, message: "Limite de 130 caracteres." },
            })}
          />
          {errors.nome && (
            <Form.Text className="invalid-feedback">
              {" "}
              {errors.nome.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            className={errors.preco && "is-invalid"}
            {...register("preco", {
              required: "O preço é obrigatório.",
              maxLength: { value: 10, message: "Digite um valor valido" },
            })}
          />
          {errors.preco && (
            <Form.Text className="invalid-feedback">
              {errors.preco.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button type="submit">Cadastrar</Button>
      </Form>
    </div>
  );
}

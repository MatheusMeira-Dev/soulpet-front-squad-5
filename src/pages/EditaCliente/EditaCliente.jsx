import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditaCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCidade, setSelectedCidade] = useState("");

  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/clientes/${id}`, data)
      .then((response) => {
        toast.success("Cliente editado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/clientes");
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/clientes/${id}`).then((response) => {
      const {
        nome,
        email,
        telefone,
        endereco: { cidade, uf, cep, rua, numero },
      } = response.data;
      reset({
        nome,
        email,
        telefone,
        endereco: { cidade, uf, cep, rua, numero },
      });
    });
  }, [id, reset]);

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((response) => {
        setUfs(response.data);
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCidades(response.data);
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }, [selectedUf]);

  function handleSelectedUf(event) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }
  function isUFNull() {
    return selectedUf === null || selectedUf === "";
  }
  function handleSelectedCidade(event) {
    const Cidade = event.target.value;
    setSelectedCidade(Cidade);
  }

  return (
    <div className="container">
      <h1>Editar Cliente</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            className={errors.nome && "is-invalid"}
            {...register("nome", {
              required: "O nome é obrigatório.",
              maxLength: { value: 130, message: "Limite de 130 caracteres." },
            })}
          />
          {errors.nome && (
            <Form.Text className="invalid-feedback">
              {errors.nome.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            className={errors.email && "is-invalid"}
            {...register("email", {
              required: "O e-mail é obrigatório.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
            })}
          />
          {errors.email && (
            <Form.Text className="invalid-feedback">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="tel"
            className={errors.telefone && "is-invalid"}
            {...register("telefone", {
              required: "O telefone é obrigatório.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
            })}
          />
          {errors.telefone && (
            <Form.Text className="invalid-feedback">
              {errors.telefone.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>UF</Form.Label>
          <br />
          <select
            name="uf"
            id="uf"
            value={selectedUf}
            className={`form-select ${errors.endereco?.uf}`}
            {...register("endereco.uf", {
              required: "O UF é obrigatório.",
              maxLength: { value: 2, message: "Limite de 2 caracteres." },
              onChange: handleSelectedUf,
            })}
            aria-label="Default select example"
          >
            <option selected disabled value="">
              Selecione um Estado
            </option>
            {ufs.map((uf) => {
              return (
                <option key={uf.id} value={uf.sigla}>
                  {uf.nome}
                </option>
              );
            })}
          </select>
          {errors.endereco?.uf && (
            <Form.Text className="invalid-feedback">
              {errors.endereco?.uf.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cidade</Form.Label>
          <br />
          <select
            name="cidades"
            id="cidades"
            disabled={isUFNull()}
            value={selectedCidade}
            className={`form-select ${errors.endereco?.cidade}`}
            {...register("endereco.cidade", {
              required: "A cidade é obrigatória.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
              onChange: handleSelectedCidade,
            })}
            aria-label="Default select example"
          >
            <option selected disabled>
              Selecione Cidade
            </option>
            {cidades.map((cidade) => {
              return (
                <option key={cidade.id} value={cidade.nome}>
                  {cidade.nome}
                </option>
              );
            })}
          </select>
          {errors.endereco?.cidade && (
            <Form.Text className="invalid-feedback">
              {errors.endereco?.cidade.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            className={errors.endereco?.cep && "is-invalid"}
            {...register("endereco.cep", {
              required: "O CEP é obrigatório.",
              maxLength: { value: 9, message: "Limite de 9 caracteres." },
            })}
          />
          {errors.endereco?.cep && (
            <Form.Text className="invalid-feedback">
              {errors.endereco?.cep.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rua</Form.Label>
          <Form.Control
            type="text"
            className={errors.endereco?.rua && "is-invalid"}
            {...register("endereco.rua", {
              required: "A rua é obrigatória.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
            })}
          />
          {errors.endereco?.rua && (
            <Form.Text className="invalid-feedback">
              {errors.endereco?.rua.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Numero</Form.Label>
          <Form.Control
            type="text"
            className={errors.endereco?.numero && "is-invalid"}
            {...register("endereco.numero", {
              required: "O número é obrigatório.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
            })}
          />
          {errors.endereco?.numero && (
            <Form.Text className="invalid-feedback">
              {errors.endereco?.numero.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button type="submit">Editar</Button>
        <Button className="ms-2" onClick={() => navigate("/clientes")}>
          Cancelar
        </Button>
      </Form>
    </div>
  );
}

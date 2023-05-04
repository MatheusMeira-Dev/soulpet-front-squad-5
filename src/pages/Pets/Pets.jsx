import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export function AddPet() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [porte, setPorte] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [nomeDono, setNomeDono] = useState("");
  const [emailDono, setEmailDono] = useState("");
  const [telefoneDono, setTelefoneDono] = useState("");
  const [enderecoDono, setEnderecoDono] = useState("");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    // Validando os campos
    if (
      nome.trim() === "" ||
      tipo.trim() === "" ||
      porte.trim() === "" ||
      dataNasc.trim() === "" ||
      nomeDono.trim() === "" ||
      emailDono.trim() === "" ||
      telefoneDono.trim() === "" ||
      enderecoDono.trim() === ""
    ) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Salvando os dados do pet
    const newPet = {
      nome,
      tipo,
      porte,
      dataNasc,
      dono: {
        nome: nomeDono,
        email: emailDono,
        telefone: telefoneDono,
        endereco: enderecoDono,
      },
    };

    // Aqui você faria uma requisição para o backend para salvar os dados do novo pet

    alert("Pet adicionado com sucesso!");

    // Redirecionando para a tela de Pets após a inserção
    history.push("/pets");
  }

  return (
    <div className="container">
      <h1>Adicionar Pet</h1>
      <Form onSubmit ={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do pet"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o tipo do pet"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPorte">
          <Form.Label>Porte</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o porte do pet"
            value={porte}
            onChange={(e) => setPorte(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDataNasc">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Digite a data de nascimento do pet"
            value={dataNasc}
            onChange={(e) => setDataNasc(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNomeDono">
          <Form.Label>Nome do Dono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do dono"
            value={nomeDono}
            onChange={(e) => setNomeDono(e.target.value)}
            required
          />
        </Form.Group>    <Form.Group className="mb-3" controlId="formEmailDono">
      <Form.Label>Email do Dono</Form.Label>
      <Form.Control
        type="email"
        placeholder="Digite o email do dono"
        value={emailDono}
        onChange={(e) => setEmailDono(e.target.value)}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formTelefoneDono">
      <Form.Label>Telefone do Dono</Form.Label>
      <Form.Control
        type="text"
        placeholder="Digite o telefone do dono"
        value={telefoneDono}
        onChange={(e) => setTelefoneDono(e.target.value)}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formEnderecoDono">
      <Form.Label>Endereço do Dono</Form.Label>
      <Form.Control
        type="text"
        placeholder="Digite o endereço do dono"
        value={enderecoDono}
        onChange={(e) => setEnderecoDono(e.target.value)}
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Adicionar
    </Button>
  </Form>
</div>
);
}

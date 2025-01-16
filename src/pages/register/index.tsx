import styled from "styled-components";
import Logo from '../../../public/logo.svg'
import Image from 'next/image';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useState } from "react";
import { supabase } from "@/service/supabase";
import Toast from 'react-bootstrap/Toast';
import { useRouter } from 'next/router';


const BodyContainer = styled.div`
    width: 100%;
    height: 97vh;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`
const BoxImg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    margin-left: 20px;
`
const BoxForm = styled.div`
    width: 600px;
    height: 600px;
    background-color: #F8F9FA;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    gap: 5px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    `
const Title = styled.h1`
font-family: 'Open Sans', sans-serif;
color: #4E4E4E;
font-weight: 600;
margin: 0;
font-size: 24px;
`

const GoToLogin = styled.button`
background: none;
border: none;
color: #2D71D6;
text-align: start;
margin-bottom: 10px;
`

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const router = useRouter();

    async function signUp() {

        if (!name || !email || !cpf || !password || !confirmPassword) {
            showNotification("Preencha todos os campos", 3000, "error");
            return;
        }

        if (!validateEmail(email)) {
            showNotification("Email inválido", 3000, "error");
            return;
        }

        if (!validateCPF(cpf)) {
            showNotification("CPF inválido", 3000, "error");
            return;
        }

        if (password !== confirmPassword) {
            showNotification("As senhas não são iguais", 3000, "error");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name, cpf }
            }
        })

        if (error) {
            showNotification(error.message, 3000, "error");
            return
        }


        if (data?.user) {
            const { data: dataProfile, error: errorProfile } = await supabase.from('aluno').insert([
                { id: data.user.id, nome: name, email, cpf }
            ])

            if (errorProfile) {
                showNotification(errorProfile.message, 3000, "error");
                return
            }


            showNotification("Usuário cadastrado com sucesso", 3000, "success");
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        }

    }

    function validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false; // Verifica se o CPF tem 11 dígitos ou se todos os dígitos são iguais
        }

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        sum = 0;

        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    }



    function showNotification(message: string, duration: number, type: "error" | "success") {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, duration);
    }

    return (
        <BodyContainer>
            <>
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 9999,
                    }}
                    bg={toastType === "success" ? "success" : "danger"}
                >
                    <Toast.Header>
                        <strong className="me-auto">{toastType === "success" ? "Success" : "Error"}</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </>
            <BoxImg>
                <Image src={Logo} alt="logo" width={200} />
            </BoxImg>
            <BoxForm>
                <Title>Cadastre-se:</Title>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome completo:</Form.Label>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} type="email" placeholder="Digite seu nome completo" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Digite seu email" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control value={cpf} onChange={e => setCpf(e.target.value)} type="text" placeholder="Digite seu CPF" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Digite sua senha" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Confirme sua senha:</Form.Label>
                    <Form.Control value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirme sua senha" />
                </Form.Group>

                <GoToLogin onClick={() => router.push('/login')}>Já tem uma conta? Faça login</GoToLogin>

                <Button variant="danger" type="submit" onClick={signUp}>
                    Cadastrar
                </Button>

            </BoxForm>
        </BodyContainer>
    );
}
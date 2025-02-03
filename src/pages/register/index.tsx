import Logo from '../../../public/logo.svg'
import Image from 'next/image';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';
import { useRouter } from 'next/router';
import { BodyContainer, BoxImg, BoxForm, Title, GoToLogin } from "../../components/register/style";
import useRegister from "@/components/register/hooks";

export default function Register() {

    const {
        name,
        setName,
        email,
        setEmail,
        cpf,
        setCpf,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showToast,
        toastMessage,
        toastType,
        signUp,
        setShowToast
    } = useRegister();

    const router = useRouter();

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
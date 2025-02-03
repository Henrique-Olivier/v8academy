import { supabase } from "@/service/supabase";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useRegister () {

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
            const { data: dataProfile, error: errorProfile } = await supabase.from('usuario').insert([
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


    return {
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
        validateEmail,
        validateCPF,
        showNotification,
        setShowToast
    };
}
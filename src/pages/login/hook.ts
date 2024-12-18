import { supabase } from "../../service/supabase";
import { useState } from "react";


export default function useLogin() {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    function showNotification(message: string, duration: number, type: "error" | "success") {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, duration);
    }
    
    async function handleLogin() {
        if(inputEmail === "" || inputPassword === "") {
            showNotification("Preencha todos os campos", 3000, "error");
        } else {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email: inputEmail, password: inputPassword});

                if(data.user) {
                    console.log(data)
                    showNotification("Login realizado com sucesso", 3000, "success");
                    return;
                }

                if(error) {
                    showNotification(error.message, 3000, "error");
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return {
        inputEmail: {
            value: inputEmail,
            handle: setInputEmail
        },
        inputPassword: {
            value: inputPassword,
            handle: setInputPassword
        },
        handleLogin: handleLogin,
        toast: {
            show: {
                value: showToast,
                set: setShowToast
            },
            message: toastMessage,
            type: toastType
        }
    };
}
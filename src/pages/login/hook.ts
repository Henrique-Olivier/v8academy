import { supabase } from "../../config/supabase";
import { useState } from "react";


export default function useLogin() {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    
    async function handleLogin() {
        if(inputEmail === "" || inputPassword === "") {
            alert("Preencha todos os campos");
        } else {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email: inputEmail, password: inputPassword});

                if(data) {
                    alert("login feito com sucesso!");
                    return;
                }

                if(error) {
                    alert("login não efetuado!")
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
        handleLogin: handleLogin
    };
}
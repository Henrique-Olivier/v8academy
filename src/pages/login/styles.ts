import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const LoginContainer = styled.div`
    width: 450px;
    height: min-content;
    background-color: #F8F9FA;
    padding: 50px 30px;

    h1{
        font-size: 36px;
        font-weight: 600;
        color: #4E4E4E;
    }

    h2,
    label{
        font-size: 20px;
        font-weight: 600;
        color: #7E7E7E;
    }

    h2{
        margin: 15px 0 15px 0;
    }

    label{
        width: 100%;
        margin-top: 15px;
    }

    div.forgotPassword{
        margin-top: 20px;
    }

    div.btn-login{
        display: flex;
        justify-content: center;
        margin-top: 40px;

        button{
            width: 80%;
        }
    }
`;
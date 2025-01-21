import styled from "styled-components";

export const MainLayout = styled.div`
    margin: 50px;

    div.manageTrail{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        width: 100%;
        border-bottom: 1px solid #000000;
        padding: 5px;
    }

    div.manageTrail h1{
        font-size: 24px;
    }
`;

export const FormContainer = styled.div`
    margin: 20px;

    div.header{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-top: 20px;
        padding: 5px;
        border-bottom: 1px solid #000000;

        h1{
            font-size: 18px;
        }
    }
`;
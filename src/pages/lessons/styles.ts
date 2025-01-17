import styled from "styled-components";

export const MainContainer = styled.div`
    padding: 40px 20px;

    p{
        margin-bottom: 0;
    }

    h1{
        font-size: 34px;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid #4E4E4E;
    }
`;

export const AccordionContainer = styled.div`
    width: 100%;
    margin-top: 30px;

    div.infos{
        padding: 16px 20px;
        border: 1px solid #DEE2E6;
        border-radius: 8px;
        margin-bottom: 5px;
    }

    h4{
        font-size: 20px;
    }

    h5{
        font-size: 16px;
    }

    div.lesson{
        display: flex;
        flex-direction: column;
        align-items: baseline;
        gap: 15px;

        div{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
    }

`;
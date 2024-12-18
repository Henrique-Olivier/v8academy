import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 75px 25px;

    h1{
        font-size: 44px;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid #4E4E4E;
    }

    div.search{
        width: 60%;

        div > span{
            background-color: blue;
        }
    }

    div.cards{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        row-gap: 35px;
    }

    div.card{
        width: 18rem;
    }
`;
import styled from "styled-components";

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
gap: 40px;
padding: 55px 25px;
overflow-x: auto;
max-height: 100%;

    h1{
        font-size: 34px;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid #4E4E4E;
    }

    div.search{
        display: flex;
        justify-content: space-between;

        >div{
            width: 60%;
        }

        div > span{
            background-color: #2D71D6;
        }
    }

    div.cards{
        display: flex;
        flex-wrap: wrap;
        gap: 5%;
        row-gap: 20px;
    }

    div.card{
        width: min-content;

        div.card-body{
            display: flex;
            flex-direction: column;

            button.btn{
                white-space: nowrap;
            }
        }
    }

    div.action-admin{
        display: flex;
        gap: 20px;
        margin-top: auto;
    }
`;
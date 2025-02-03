import styled from "styled-components"

export const BodyContainer = styled.div`
    width: 100%;
    height: 97vh;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const BoxImg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    margin-left: 20px;
`
export const BoxForm = styled.div`
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
export const Title = styled.h1`
font-family: 'Open Sans', sans-serif;
color: #4E4E4E;
font-weight: 600;
margin: 0;
font-size: 24px;
`

export const GoToLogin = styled.button`
background: none;
border: none;
color: #2D71D6;
text-align: start;
margin-bottom: 10px;
`
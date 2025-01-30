import styled from "styled-components"

export const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;    
`
export const Content = styled.div`
width: 100%;
height: 100vh;
overflow-y: auto;
`

export const SidebarContainer = styled.div`
    width: 18%;
    height: 100vh;
    background-color: #F8F9FA;
    display: flex;
    flex-direction: column; 
    justify-content: start;
    align-items: center;
    gap: 20px;
`

export const List = styled.ul`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 50px;
    padding: 0;
    `


export const ListItem = styled.li`
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 18px;
    margin-left: 50px;
`

export const DivLine = styled.div<{$hasTopBorder?: boolean}>`
    width: 100%;
    height: 50px;
    border-top: ${({ $hasTopBorder }) => $hasTopBorder ? '1px solid #D9D9D9' : 'none'};  
    border-bottom: 1px solid #D9D9D9;
    display: flex;  
    align-items: center;
    cursor: pointer;      
`

export const LogoutButton = styled.button`
    border: 1px solid red;
    padding: 5px 20px;
    border-radius: 2px;
    margin-top: auto;
    margin-bottom: 35px;
    color: red;
    text-align: start;
`

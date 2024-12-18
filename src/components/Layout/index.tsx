import Image from "next/image"
import styled from "styled-components"
import Logo from '../../../public/logo.svg'
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;    
`
const Content = styled.div`
width: 78%;
height: 100vh;
`

const SidebarContainer = styled.div`
    width: 22%;
    height: 100vh;
    background-color: #F8F9FA;
    display: flex;
    flex-direction: column; 
    justify-content: start;
    align-items: center;
    gap: 20px;
`

const List = styled.ul`
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 50px;
    padding: 0;
    `


const ListItem = styled.li`
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 18px;
    margin-left: 50px;
`

const DivLine = styled.div<{$hasTopBorder?: boolean}>`
    width: 100%;
    height: 50px;
    border-top: ${({ $hasTopBorder }) => $hasTopBorder ? '1px solid #D9D9D9' : 'none'};  
    border-bottom: 1px solid #D9D9D9;
    display: flex;  
    align-items: center;
    cursor: pointer;      
`


export default function Layout({ children }: LayoutProps) {
    return (
        <Container>
            <SidebarContainer>
                <Image src={Logo} alt="logo" width={200} />
                <List>
                    <DivLine $hasTopBorder={true}>
                        <ListItem>Trilhas</ListItem>
                    </DivLine>

                    <DivLine $hasTopBorder={false}>
                        <ListItem>Cursos</ListItem>
                    </DivLine>
                </List>
            </SidebarContainer>
            <Content>
                {children}
            </Content>
        </Container>
    )
}
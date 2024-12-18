import Image from "next/image"
import styled from "styled-components"
import Logo from '../../../public/logo.svg'
import { ReactNode } from 'react';
import { Container, Content, DivLine, List, ListItem, SidebarContainer } from './style'
interface LayoutProps {
    children: ReactNode;
}

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
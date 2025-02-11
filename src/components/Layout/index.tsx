import Image from "next/image"
import styled from "styled-components"
import Logo from '../../../public/logo.svg'
import { ReactNode } from 'react';
import { Container, Content, DivLine, List, ListItem, SidebarContainer, LogoutButton } from './style'
import { useRouter } from "next/router";
import { CourseProvider } from "@/context/ProviderCourses";
interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();

    return (
        <Container>
            <SidebarContainer>
                <Image src={Logo} alt="logo" width={200} />
                <List>
                    <DivLine $hasTopBorder={true} onClick={() => { router.push('/trails') }}>
                        <ListItem>Trilhas</ListItem>
                    </DivLine>

                    <DivLine $hasTopBorder={false} onClick={() => { router.push('/courses/0') }}>
                        <ListItem>Cursos</ListItem>
                    </DivLine>
                </List>
                <LogoutButton>
                    Logout
                </LogoutButton>
            </SidebarContainer>
            <Content>
                {children}
            </Content>
        </Container>
    )
}
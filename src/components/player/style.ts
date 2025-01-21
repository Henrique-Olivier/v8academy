import styled from "styled-components"

export const ContainerContent = styled.div`
width: 100%;
height: 100%;
`
export const VideoFrame = styled.div`
width: 100%;
background-color: #3A3A3A;
height: 450px;
display: flex;
align-items: center;
justify-content: center;
`

export const Iframe = styled.iframe`
height: 100%;   
width: 75%;
`

export const Header = styled.div`
width: 100%;

border-bottom: 1px solid #4E4E4E;
display: flex;
flex-direction: column;
margin-bottom: 24px;
padding: 50px 100px 5px 80px;
gap: 5px;

p {
margin: 0;
}

 h1 {
 margin: 0;
 font-size: 26px;
 }
`

export const ButtonDiv = styled.div`
width: 100%;
padding: 25px 50px;
text-align: end;
`
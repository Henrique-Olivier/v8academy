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
padding: 25px 150px;
display: flex;
align-items: center;
justify-content: space-between;
`

export const ForumHeader = styled.h1`
margin-left: 80px;
`

export const ForumContainer = styled.div`
width: 100%;
padding-left: 230px;
`

export const CommentContainer = styled.div`
width: 60%;
display: flex;
flex-direction: column;
align-items: end;
gap: 15px;
`
export const CommentText = styled.div`
gap: 15px;
width: 100%;
display: flex;
align-items: start;

`

export const LineComements = styled.div`
width: 60%;
height: 1px;
background-color: #4E4E4E;
margin-top: 20px;
margin-bottom: 20px;
`

export const Comment = styled.div`
width: 60%;
display: flex;
flex-direction: column;
gap: 15px;
margin-bottom: 50px;
`

export const CommentHeader = styled.div`
display: flex;
gap: 15px;
align-items: center;
h1 {
margin: 0;
font-size: 20px;
}
`

export const EmptyMessage = styled.p`
font-size: 30px;
padding: 50px 0;
`
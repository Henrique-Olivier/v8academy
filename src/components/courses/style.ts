import styled from "styled-components"

export const ContainerContent = styled.div`
width: 100%;
height: 100%;
max-height: 100%;
overflow-y: auto;
display: flex;
flex-direction: column;

.input-group-text{
background-color: #2D71D6;
}
`
export const Header = styled.div`
width: 100%;
height: 120px;
border-bottom: 1px solid #4E4E4E;
display: flex;
flex-direction: column;
margin-bottom: 24px;
padding: 50px 0px 5px 80px;
gap: 5px;

p {
margin: 0;
}

 h1 {
 margin: 0;
 font-size: 26px;
 }
`

export const InputBox = styled.div`
width: 100%;
padding: 10px 80px; 
display: flex;
flex direction: row;
gap: 5px;
justify-content: space-between;
`

export const DivBtn = styled.div`
width: 100%;
padding: 10px 10px;
display: flex;
justify-content: space-between; 
`
export const SearchBar = styled.div`
width: 70%;
`
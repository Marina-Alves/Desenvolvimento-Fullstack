import InputMask from "react-input-mask";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export default function DadosPessoaisForm(props) {
    let {nome,setNome,cpf,setCPF,email,setEmail,startDate, setStartDate} = props;
    return (
	    <>
            <Input>
                <label htmlFor="nome" >Nome:</label>
                <input required name="nome" value={nome} onChange={(e)=>{setNome(e.target.value)}} type="text"></input>
            </Input>
            <Input>
                <label htmlFor="cpf" >CPF:</label>
                <InputMask required name="cpf" mask="999.999.999-99" value={cpf} onChange={(e)=>{setCPF(e.target.value)}} type="text"></InputMask>
            </Input>
            <Input>
                <label htmlFor="email" >E-mail:</label>
                <input required name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"></input>
            </Input>
            <Input>
                <label htmlFor="date">Data de nascimento:</label>
                <input required name="date" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} type="date"></input>
            </Input>
        </>
    )
}

const Input = styled.div`
    display:flex;
    justify-content: space-between;
    input: {
        width: 100%;
    }
`
import styled from "styled-components";
import { useEffect, useState } from "react";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import InputMask from "react-input-mask";
import ReactLoading from 'react-loading';
import "react-datepicker/dist/react-datepicker.css";
import DadosPessoaisForm from "../components/DadosPessoaisForm.js";
import { listPessoas, getPessoa, createPessoa, updatePessoa, deletePessoa as removePessoa, deleteTelefone } from "../services/api.js";
import {
    UFS,
    novoFormulario,
    telefoneVazio,
    telefonesParaExcluir,
    montarPayloadCriacao,
    montarPayloadAtualizacao,
    formularioDaPessoa,
} from "../services/pessoaMapper.js";

export default function App() {
    const [form, setForm] = useState(novoFormulario());
    const [dadosGravados, setDadosGravados] = useState([]);
    const [change, setChange] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const ui = { setChange, setIsLoading };

    const setField = (campo) => (e) => setForm((atual) => ({ ...atual, [campo]: e.target.value }));
    const setTelefone = (indice, campo) => (e) => {
        const valor = e.target.value;
        setForm((atual) => ({
            ...atual,
            telefones: atual.telefones.map((t, i) => (i === indice ? { ...t, [campo]: valor } : t)),
        }));
    };
    const adicionarTelefone = () => setForm((atual) => ({ ...atual, telefones: [...atual.telefones, telefoneVazio()] }));
    const removerTelefone = () => setForm((atual) => (
        atual.telefones.length > 5 ? { ...atual, telefones: atual.telefones.slice(0, -1) } : atual
    ));

    useEffect(()=>{
        setForm(novoFormulario());
        setChange(false);
    },[change])

    useEffect(()=>{
        async function getDados(){
            setIsLoading(true);
            const response = await listPessoas();
            setIsLoading(false);
            setDadosGravados(response.data.map((res) => ({
                id: res.id,
                nome: res.nome,
                cpf: res.cpf_cnpj,
                email: res.email,
                telefones: res.Phone
            })));
        }
        getDados();
    },[change])

    return (
    <Container>
        <>
            <Titulo> <h1> Cadastro de pessoa </h1> </Titulo>
        </>
        <ContainerTop>
            <ContainerForm>
                <form method="POST" onSubmit={(e)=>handleSubmit(e,form,ui)}>
                    <DadosPessoaisForm
                        nome={form.nome} setNome={(v)=>setForm((a)=>({...a,nome:v}))}
                        cpf={form.cpf} setCPF={(v)=>setForm((a)=>({...a,cpf:v}))}
                        email={form.email} setEmail={(v)=>setForm((a)=>({...a,email:v}))}
                        startDate={form.startDate} setStartDate={(v)=>setForm((a)=>({...a,startDate:v}))}
                    />

                    <Subtitulo>
                        <h3> Endereço </h3>
                    </Subtitulo>
                    <Input>
                        <label htmlFor="cep" >CEP:</label>
                        <InputMask required mask="99999-999" name="cep" value={form.cep} onChange={setField('cep')} type="text"></InputMask>
                    </Input>
                    <Input>
                        <label htmlFor="logradouro" >Logradouro:</label>
                        <input required name="logradouro" value={form.logradouro} onChange={setField('logradouro')} type="text"></input>
                    </Input>
                    <Input>
                        <label htmlFor="houseNumber" >Numero:</label>
                        <input required name="houseNumber" value={form.houseNumber} onChange={setField('houseNumber')} type="text"></input>
                    </Input>
                    <Input>
                        <label htmlFor="complemento" >Complemento:</label>
                        <input required name="complemento" value={form.complemento} onChange={setField('complemento')} type="text"></input>
                    </Input>
                    <Input>
                        <label htmlFor="setor">Setor:</label>
                        <input required name="setor" value={form.setor} onChange={setField('setor')} type="text"></input>
                    </Input>

                    <Input>
                        <label htmlFor="cidade">Cidade:</label>
                        <input required name="cidade" value={form.cidade} onChange={setField('cidade')} type="text"></input>
                    </Input>

                    <Input>
                        <label htmlFor="uf">UF:</label>
                        <select required value={form.selectedUF} onChange={setField('selectedUF')}>
                            {
                                UFS.map((uf) => {
                                    return(
                                        <option key = {uf} value={uf}>{uf}</option>
                                    )
                                })
                            }
                        </select>
                    </Input>

                    <ContainerBotoesForm>
                        <ButtonCadastro type="submit">Cadastrar</ButtonCadastro>
                        <ButtonDeletar disabled={form.id===0 ? true : false} onClick={(e)=>{deletePessoa(e,form.id,ui)}}>Deletar</ButtonDeletar>
                    </ContainerBotoesForm>
                </form>
            </ContainerForm>
            <ContainerTelefones>
                <table>
                <thead>
                    <tr>
                    <th> Telefone </th>
                    <th> Descrição </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        form.telefones.map((telefone,i)=>{
                        return (
                            <tr key={i}>
                            <td>
                                <InputMask
                                mask="(99) 99999-9999"
                                name="numero"
                                value={telefone.numero}
                                onChange={setTelefone(i,'numero')}
                                type="text"/>
                            </td>
                            <td>
                                <input
                                name="tipo_telefone"
                                value={telefone.tipo_telefone}
                                onChange={setTelefone(i,'tipo_telefone')}
                                type="text"/>
                            </td>
                            </tr>
                        )
                        })
                    }
                </tbody>
                </table>
                <ContainerBotoesTelefones>
                <button onClick={removerTelefone}>
                    <FcDeleteRow/>
                </button>
                <button onClick={adicionarTelefone}>
                    <FcAddRow/>
                </button>
                </ContainerBotoesTelefones>
            </ContainerTelefones>
        </ContainerTop>
        <ContainerBottom>
        {
            loading === true ?
            <ReactLoading type="spin" color="#274472" height={150} width={150} />
            :
            dadosGravados.length === 0 ?
                <p>Não há dados cadastrados</p>
            :
                <table>
                <thead>
                    <tr>
                    <th> Nome </th>
                    <th> CPF </th>
                    <th> E-mail </th>
                    <th> Telefone/Descrição </th>
                    <th> <p></p> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                    dadosGravados.map((dadoGravado)=>{
                        return (
                        <tr key={dadoGravado.id}>
                            <td> {dadoGravado.nome} </td>
                            <td> {dadoGravado.cpf} </td>
                            <td> {dadoGravado.email} </td>
                            <td> {
                                dadoGravado.telefones.map((telefone,i)=>{
                                return(
                                    <>
                                    {telefone.numero + " / " +  telefone.tipo_telefone}
                                    <br></br>
                                    </>
                                )
                                })
                            }
                            </td>
                            <td>
                            <ContainerBotaoEditar>
                                <button onClick={()=>{ handleClick(dadoGravado.id,setForm,setIsLoading); }}>
                                <AiOutlineEdit/>
                                </button>
                            </ContainerBotaoEditar>
                            </td>
                        </tr>
                        )
                    })
                    }
                </tbody>
                </table>
        }
        </ContainerBottom>
    </Container>
    )
}

async function handleSubmit(e,form,{setChange,setIsLoading}){
    e.preventDefault();
    const criando = form.id === 0;
    try{
        setIsLoading(true);
        if(criando){
            await createPessoa(montarPayloadCriacao(form));
        }
        else{
            telefonesParaExcluir(form.telefones).map(async (telefone)=>{
                await deleteTelefone(telefone.id);
            })
            await updatePessoa(form.id, montarPayloadAtualizacao(form));
        }
        setIsLoading(false);
        setChange(true);
    }
    catch(e){
        if(criando){
            alert('CPF já cadastrado por favor informe um novo CPF');
            setIsLoading(false);
        }
        else{
            alert(e);
        }
    }
}

async function deletePessoa(e,id,{setChange,setIsLoading}){
    e.preventDefault();
    if(id === 0 ){
        alert("Não foi possivel deletar!");
    }
    else{
        try{
            setIsLoading(true);
            await removePessoa(id);
            setIsLoading(false);
            setChange(true);
        }
        catch(e){
            alert(e);
        }
    }
}

async function handleClick(userId,setForm,setIsLoading){
    setIsLoading(true);
    const response = await getPessoa(userId);
    setIsLoading(false);
    setForm(formularioDaPessoa(response.data));
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #274472;
`

const Titulo = styled.div`
    font-size: 42px;
    margin-top: 25px;
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`
const Subtitulo= styled.div`
    font-size: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: bold;
`
const Input = styled.div`
    display:flex;
    justify-content: space-between;
`

const ContainerTelefones = styled.div`
    width: 50vw;
    margin-top: 25px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    flex-direction: column;
    table{
		width: 75%;
		tr:nth-child(1){
			td{
				input{
					margin-top: 5px;
				}
			}
		}
	tr{
        width: 100%;
        td{
			width: 50%;
			input{
				margin-top: 5px;
				width: 92%;
				border-radius: 10px ;
				border: 1px solid black;
				
				padding-left: 10px;
				font-size: 22px;
			}
        }
        th {
			width: 50%;
			font-size: 26px;
			font-weight: bold;
			border-radius: 10px ;
			color: white;
			background-color: #5885AF ;
        }
	}
    }
`

const ContainerBotoesTelefones = styled.div`
    width: 75%;
    display:flex;
    justify-content: space-around;
    button{
	background-color: transparent;
	border: none;
	font-size: 50px;
	cursor: pointer; 
    }
`

const ContainerTop = styled.div`
    display: flex;
`

const ContainerBottom = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
    table{
	width: 90%;
	margin-bottom: 25px;
	tr{
        width: 100%;
        td{
		min-height: 100px;
		text-align: center;
		font-size: 22px;
		div{
            height: 100%;
            display:flex;
            align-items: center;
            justify-content: center;
            
		}
		border: 1px solid black;
        }
        th{
		font-size: 26px;
		font-weight: bold;
		border: 1px solid black;
        }
	}
    }
`


const ContainerForm = styled.div`
    display: flex;
    width: 50vw;
    margin-top: 25px;
    justify-content: center;
    form{
	display: flex;
	flex-direction: column;
	width: 85%;
	input{
        font-size: 22px;
        border-radius: 10px;
        border: 1px solid black;
        margin-top: 10px;
        padding-left: 10px;
	}
	select{
        margin-top: 10px;
        font-size: 22px;
        width: 60%;
	}
	label{
        font-size: 22px;
        margin-top: 10px;
	}
    }
`

const ContainerBotoesForm = styled.div`
    display:flex;
    justify-content: flex-end;
    margin-top: 35px;
    margin-bottom: 35px;  
    button{
	cursor: pointer; 
    }  
    
`

const ButtonCadastro = styled.button`
    border-radius: 10px;
    border: none;
    background-color: #41729F;
    padding: 15px;
    text-align: center;
    color: white;
    cursor: pointer; 
`

const ButtonDeletar = styled.button`
    display: ${props => props.disabled ? "none" : "block"};
    margin-left: 20px;
    padding: 15px;
    border-radius: 10px;
    border: none;
    background-color: rgba(255,0,0,0.8);
    color:white;
    cursor: pointer; 

`

const ContainerBotaoEditar = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    button{
	font-size: 22px;
	cursor: pointer; 
	background-color: transparent;
	border: none; 
    }
`
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import InputMask from "react-input-mask";
import ReactLoading from 'react-loading'; 
import "react-datepicker/dist/react-datepicker.css";
import DadosPessoaisForm from "../components/DadosPessoaisForm.js";

export default function App() {
    const [nome,setNome] = useState("");
    const [cpf,setCPF] = useState("");
    const [email,setEmail] = useState("");
    const [cep,setCEP] = useState("");
    const [logradouro,setLogradouro] = useState("");
    const [complemento,setComplemento] = useState("");
    const [setor,setSetor] = useState("");
    const [cidade,setCidade] = useState("");
    const [telefones,setTelefones] = useState([]);
    const [selectedUF,setSelectedUF] = useState('AC');
    const [houseNumber,setHouseNumber] = useState('');
    const [dadosGravados,setDadosGravados] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
    const [id,setId] = useState(0);
	const [idAdress,setIdAdress] = useState(0);
    const [change,setChange] = useState(false);
    const [loading,setIsLoading] = useState(false);
	const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    useEffect(()=>{
		const arr = [];
		for(let i=0; i<5;i++){
			arr.push({
			id:0,
			numero:"",
			tipo_telefone:""
			})
		}
		setId(0);
		setNome('');
		setCPF('');
		setEmail('');
		setCEP('');
		setLogradouro('');
		setComplemento('');
		setSetor('');
		setCidade('');
		setChange(false);
		setStartDate('');
		setIdAdress(0);
		setTelefones(arr);
		setSelectedUF('AC');
		setHouseNumber('');
    },[change])

    useEffect(()=>{
		async function getDados(){
			setIsLoading(true);
			const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/people`);
			setIsLoading(false);
			const arr = []
			response.data.forEach(res => {
				const obj = {
				id: res.id,
				nome: res.nome,
				cpf: res.cpf_cnpj,
				email: res.email,
				telefones: res.Phone
			}
			arr.push(obj);
			});
			setDadosGravados(arr);
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
				<form method="POST" onSubmit={(e)=>handleSubmit(e,nome,cpf,email,cep,logradouro,complemento,setor,cidade,telefones,selectedUF,startDate,houseNumber,id,idAdress,setChange,setIsLoading)}>
					<DadosPessoaisForm nome={nome} setNome={setNome} cpf={cpf} setCPF={setCPF} email={email} setEmail={setEmail} startDate={startDate} setStartDate={setStartDate}/>
					
					<Subtitulo>
						<h3> Endereço </h3>
					</Subtitulo>
					<Input>
						<label htmlFor="cep" >CEP:</label>
						<InputMask required mask="99999-999" name="cep" value={cep} onChange={(e)=>{setCEP(e.target.value)}} type="text"></InputMask>
					</Input>
					<Input>
						<label htmlFor="logradouro" >Logradouro:</label>
						<input required name="logradouro" value={logradouro} onChange={(e)=>{setLogradouro(e.target.value)}} type="text"></input>
					</Input>
					<Input>
						<label htmlFor="houseNumber" >Numero:</label>
						<input required name="houseNumber" value={houseNumber} onChange={(e)=>{setHouseNumber(e.target.value)}} type="text"></input>
					</Input>
					<Input>
						<label htmlFor="complemento" >Complemento:</label>
						<input required name="complemento" value={complemento} onChange={(e)=>{setComplemento(e.target.value)}} type="text"></input>
					</Input>
					<Input>
						<label htmlFor="setor">Setor:</label>
						<input required name="setor" value={setor} onChange={(e)=>{setSetor(e.target.value)}} type="text"></input>
					</Input>
					
					<Input>
						<label htmlFor="cidade">Cidade:</label>
						<input required name="cidade" value={cidade} onChange={(e)=>{setCidade(e.target.value)}} type="text"></input>
					</Input>

					<Input>
						<label htmlFor="uf">UF:</label>
						<select required value={selectedUF} onChange={(e)=>{setSelectedUF(e.target.value)}}>
							{
								ufs.map((uf) => {
									return(
										<option key = {uf} value={uf}>{uf}</option>
									)
								})
							}
						</select>
					</Input>
					
					<ContainerBotoesForm>
						<ButtonCadastro type="submit">Cadastrar</ButtonCadastro>
						<ButtonDeletar disabled={id===0 ? true : false} onClick={(e)=>{deletePessoa(e,id,setChange,setIsLoading)}}>Deletar</ButtonDeletar>
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
						telefones.map((telefone,i)=>{
						return (
							<tr key={i}>
							<td>
								<InputMask
								
								mask="(99) 99999-9999"
								name="numero" 
								value={telefone.numero} 
								onChange={(e)=>{
									const arr = [...telefones];
									arr[i].numero = e.target.value;
									setTelefones(arr);
								}} 
								type="text"/>
							</td>
							<td>
								<input 
								name="tipo_telefone" 
								value={telefone.tipo_telefone} 
								onChange={(e)=>{
									const arr = [...telefones];
									arr[i].tipo_telefone = e.target.value;
									setTelefones(arr);
								}} 
								type="text"/>
							</td>
							</tr>
						)
						})
					}
				</tbody>
				</table>
				<ContainerBotoesTelefones>
				<button onClick={()=>{
					
					if(telefones.length > 5){
					const arr = [...telefones];
					arr.pop();
					setTelefones(arr);
					
					}
					
				}
				}>
					<FcDeleteRow/>
				</button>
				<button onClick={()=>{
					
					const arr = [...telefones];
					
					arr.push({
					id:0,
					numero:"",
					tipo_telefone:""
					});
					setTelefones(arr);
				}}>
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
                                <button 
								onClick={()=>{
                                    handleClick(
										dadoGravado.id,
										setNome,
										setCPF,
										setEmail,
										setCEP,
										setLogradouro,
										setComplemento,
										setSetor,
										setCidade,
										setStartDate,
										setTelefones,
										setId,
										setIdAdress,
										setIsLoading,
										setSelectedUF,
										setHouseNumber
                                    );
								}}
                                >
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

async function handleSubmit(e,nome,cpf,email,cep,logradouro,complemento,setor,cidade,telefones,selectedUF,startDate,houseNumber,id,idAdress,setChange,setIsLoading){
    e.preventDefault();
    if(id === 0 ){
		try{
			setIsLoading(true);
			const phones = telefones.filter((telefone)=>{
			if(telefone.id === 0){
				delete telefone.id;
			}
			return (telefone.numero !== '' && telefone.tipo_telefone !== '')
			})
			const addresses = [{
				'cep':cep, 
				'street':logradouro,
				'number':houseNumber,
				'neighborhood':setor,
				'city':cidade,
				'state':selectedUF,
				'addressDetail':complemento,
			}];
			const cpfCnpj = cpf.replace(/[.-]/g, '');
			let dtNascimento = new Date(startDate);
			dtNascimento = dtNascimento.toISOString().split('T')[0];
			await axios.post(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/people`,{name:nome,cpfCnpj,email,dtNascimento,pessoaJuridica:false,phones,addresses});
			setIsLoading(false);
			setChange(true);
		}
		catch(e){
			alert('CPF já cadastrado por favor informe um novo CPF');
			setIsLoading(false);
		}
    }
    else{
		try{
			setIsLoading(true);
			telefones.map(async (telefone)=>{
				if(telefone.id !== 0 && (telefone.numero === '' || telefone.tipo_telefone === '')){
					await axios.delete(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/phone/`+telefone.id);
				}
			})

			let phones = telefones.filter((telefone)=>{
				return (telefone.numero !== '' && telefone.tipo_telefone !== '')
			})
			const addresses = [{
				'cep':cep, 
				'street':logradouro,
				'number':houseNumber,
				'neighborhood':setor,
				'city':cidade,
				'state':selectedUF,
				'addressDetail':complemento,
			}];
			if(phones.length === 0){
				phones = null;
			}
			addresses[0].id = idAdress;
			const cpfCnpj = cpf.replace(/[.-]/g, '');
			let dtNascimento = new Date(startDate);
			dtNascimento = dtNascimento.toISOString().split('T')[0];
			await axios.put(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/people/`+id,{name:nome,cpfCnpj,email,dtNascimento,pessoaJuridica:false,phones,addresses});
			setIsLoading(false);
			setChange(true);
		}
		catch(e){
			alert(e);
		}
    }

}

async function deletePessoa(e,id,setChange,setIsLoading){
    e.preventDefault();
    if(id === 0 ){
		alert("Não foi possivel deletar!");
    }
    else{
		try{
			setIsLoading(true);
			await axios.delete(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/people/`+id);
			setIsLoading(false);
			setChange(true);
		}
		catch(e){
			alert(e);
		}
    }

}

async function handleClick(userId,setNome,setCPF,setEmail,setCEP,setLogradouro,setComplemento,setSetor,setCidade,setStartDate,setTelefones,setId,setIdAdress,setIsLoading,setSelectedUF,setHouseNumber){
    setIsLoading(true);
    const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/people/`+userId);
    setIsLoading(false);
    const res = response.data;
    const telefones = res.Phone;
    const telefonesDescricao = [];
    let tam = 5;
    if(telefones.length > tam){
		tam = telefones.length;
    }

    for(let i=0;i<tam;i++){
	telefonesDescricao.push({
        id: (telefones[i]?.id === undefined ? 0 : telefones[i].id),
        idPessoa: (telefones[i]?.peopleId === undefined ? '' : telefones[i].peopleId),
        numero: (telefones[i]?.numero === undefined ? '' : telefones[i].numero),
        tipo_telefone: (telefones[i]?.tipo_telefone === undefined ? '' : telefones[i].tipo_telefone)
	})
    }
    
    setId(Number(res.id));
    setNome(res.nome);
    setCPF(res.cpf_cnpj);
    setEmail(res.email);
	let dtNascimento = new Date(res.dtnascimento);
	dtNascimento = dtNascimento.toISOString().split('T')[0];

    setStartDate(dtNascimento);

	setIdAdress(res.Address[0]?.id);
    setCEP(res.Address[0]?.cep);
    setLogradouro(res.Address[0]?.street);
    setComplemento(res.Address[0]?.addressDetail);
    setSelectedUF(res.Address[0]?.state);
    setSetor(res.Address[0]?.neighborhood);
    setCidade(res.Address[0]?.city);
    setTelefones(telefonesDescricao);
    setHouseNumber(res.Address[0]?.number);
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
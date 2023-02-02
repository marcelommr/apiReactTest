import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import Swal from "sweetalert2";
    
const TodoList = () => {
    const versionGoRest = "v2";
    const urlGoRest = "https://gorest.co.in/public/"+versionGoRest;
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [todos, setTodos] = useState([]);
    
    const navigate = useNavigate();
    const {userId} = useParams();    

    useEffect (() => {
        fetchData();
    }, []);


    function renderProfileOner() {
        if (userId === undefined){
            return <div>
                <h3 className="title is-5">Todas as tarefas</h3>
            </div>;
        }else{
            return <div>
                <h3 className="title is-5">Tarefas do {name} - {email}</h3>
            </div>;
        }
    }

    const deleteTodo = (id) => {
        Swal.fire({
            title: 'Certeza?',
            text: "Essa ação é irreversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(urlGoRest+'/todos/'+id+'?access-token='+apiKeyGorest)
                .then(() => {
                    fetchData();
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Seu cadastro foi salvo corretamente.",
                        type: "success",
                        timer: 2000,
                    });
                });
            }
        })
    }

    const fetchData = async() => {
        if (userId === undefined){
            axios.get(urlGoRest+'/todos?access-token='+apiKeyGorest)
                .then(response => {
                setTodos(response.data);
            });
        }else {
            axios.get(urlGoRest+'/users/'+userId+'/todos?access-token='+apiKeyGorest)
                .then(response => {
                setTodos(response.data);
            });
            axios.get(urlGoRest+'/users/'+userId+'?access-token='+apiKeyGorest).then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
            });
        }
    }


    function renderDate(date) {
        return (moment(date).format('L LTS'));
    }

    return (
        <div>
            { renderProfileOner()}
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tarefa</th>
                        <th>Concluir Até</th>
                        <th className="has-text-centered">Nome</th>
                        <th className="has-text-centered">Status</th>
                        <th className="has-text-centered">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                    <tr key={todo.id}>
                        <td>{ index+1 }</td>
                        <td>{ todo.title }</td>
                        <td>{ renderDate(todo.due_on) }</td>
                        <td className="has-text-centered">{ todo.name === undefined ? '(Não terminei)' : todo.name }</td>
                        <td className="has-text-centered">{ todo.status === 'completed' ? 'Completed' : 'Pending' }</td>
                        <td className="has-text-centered">
                            <Link to={"/todos/edit/" + todo.id} className="button is-small is-info">Editar</Link>
                            <button onClick={() => deleteTodo(todo.id)} className="button is-small is-danger">Excluir</button>
                        </td>
                    </tr>
                    ))}                    
                </tbody>
            </table>
        </div>
    )
}

export default TodoList

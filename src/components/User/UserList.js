import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const UserList = () => {
    const versionGoRest = "v2";
    const urlGoRest = "https://gorest.co.in/public/"+versionGoRest;
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const {userId} = useParams();

    useEffect (() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(urlGoRest+'/users?access-token='+apiKeyGorest).then((response) => {
            setUsers(response.data);
        });
    }

    const deleteUser = (userId) => {
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
                axios.delete(urlGoRest+'/users/'+userId+'?access-token='+apiKeyGorest)
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

    function renderUserStatus(status) {
        if (status == "active"){
            return "Ativo";
        }else {
            return "In-Ativo";
        }
    }

    function renderGender(gender) {
        if (gender == "male" || gender == "Masculino" || gender == "Homem"){
            return "Masculino";
        }else {
            return "Feminino";
        }
    }

    return (
        <div>
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th className="has-text-centered">Gênero</th>
                        <th className="has-text-centered">Status</th>
                        <th className="has-text-centered">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{ index+1 }</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="has-text-centered">{renderGender(user.gender)}</td>
                        <td className="has-text-centered">{renderUserStatus(user.status)}</td>
                        <td className="has-text-centered">
                            <Link to={"/users/edit/" + user.id} className="button is-small is-info">Editar</Link>
                            <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Excluir</button>
                            <Link to={"/users/"+user.id+"/todos/"} className="button is-small is-link">Tarefas</Link>
                        </td>
                    </tr>
                    ))}                    
                </tbody>
            </table>
        </div>
    )
}
export default UserList

import axios from 'axios';
import { useFormik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toDoFormValidationSchema } from '../../schemas';


const AddTodo = () => {
    const versionGoRest = "v2";
    const urlGoRest = "https://gorest.co.in/public/"+versionGoRest;
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const [startDate, setStartDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const status_option  = [
        { id: "pending", label: "Pendente" },    
        { id: "completed", label: "Concluído" }    
    ]

    useEffect (() => {
        fetchUserData();          
    }, []);    

    const saveTodo = async(values) => {
        axios.post(urlGoRest+"/users/"+values.user_id+"/todos?access-token="+apiKeyGorest, {
                user_id : values.user_id,
                title : values.title,
                due_on: moment(startDate).format(),
                status: values.status
            })
            .then((response) => {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Seu cadastro foi salvo corretamente.",
                    type: "success",
                    timer: 3000,
                });
                navigate("/todos");
        });
    }

    const fetchUserData = async() => {
        axios.get(urlGoRest+'/users/?access-token='+apiKeyGorest)
            .then(response => {
                setUsers(response.data);
        });
    }

    const formik = useFormik({
        'initialValues':{
            'user_id': "",
            'title': "",
            'due_on': "",
            'status': "",
        },
        validationSchema: toDoFormValidationSchema,
        onSubmit: saveTodo
    })

    const renderDateTime = () => {
        return (
            <DatePicker
            name="due_on"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
          />
        );
    };

    return (
        <div className="columns">
            <div className="column is-two-fifths">
                <form onSubmit={formik.handleSubmit}>
                    <div className="field">
                        <label className="label">Atribuir para</label>
                        <div className="control select is-primary">
                            <select id="user_id" onChange={formik.handleChange}>
                                <option selected disabled>Selecionar Usuário</option>
                                {users.map((user) => (
                                <option value={user.id}>
                                    {user.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        {formik.errors.user_id  ? <p className="help is-danger">{formik.errors.user_id}</p> : ""} 
                    </div>     

                    <div className="field">
                        <label className="label">Tarefa</label>
                        <div className="control">
                            <input className={formik.errors.name ? 'input is-danger' : 'input'} id="title" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" placeholder="Tarefa" />
                        </div>
                        {formik.errors.status  ? <p className="help is-danger">{formik.errors.status}</p> : ""} 
                    </div>  

                    <div className="field">
                        <label className="label">Fazer até</label>
                        <div className="control">
                          {renderDateTime()}
                        </div>
                    </div>     

                    <div className="field">
                        <label className="label">Status</label>
                        <div className="control select is-primary">
                            <select id="status" onChange={formik.handleChange}>
                            <option selected disabled>Selecionar Status</option>
                                {status_option.map((status) => (
                                <option value={status.id}>
                                    {status.label}
                                </option>
                                ))}
                            </select>
                        </div>
                        {formik.errors.status  ? <p className="help is-danger">{formik.errors.status}</p> : ""} 
                    </div>     
                    
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary">Salvar</button>
                            <Link to="/todos" className="button is-info">Cancelar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTodo

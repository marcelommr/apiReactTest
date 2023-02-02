import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userFormValidationSchema } from '../../schemas';

const EditUser = () => {
    const versionGoRest = "v2";
    const urlGoRest = "https://gorest.co.in/public/"+versionGoRest;
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const [FormValues, setValues] = useState({});
    const gender_option  = [
        { id: "male", label: "Masculino" },    
        { id: "female", label: "Feminino" }    
    ]

    const status_option  = [
        { id: "active", label: "Ativo" },    
        { id: "inactive", label: "In-Ativo" }    
    ]
    const navigate = useNavigate();
    let {userId} = useParams();
    
    useEffect (() => {
        getUserById();
    }, []);

    const updateUser = async(values) => {
        axios.put(urlGoRest+"/users/"+userId+"?access-token="+apiKeyGorest, values)
            .then((response) => {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Seu cadastro foi salvo corretamente.",
                    type: "success",
                    timer: 3000,
            });
            navigate("/users");
        });
    }

    const getUserById = async () => {
        axios.get(urlGoRest+'/users/'+userId+'?access-token='+apiKeyGorest).then((response) => {
            setValues({
                'name': response.data.name,
                'email': response.data.email,
                'gender': response.data.gender,
                'status': response.data.status,
            });
        });
    }

    const formik = useFormik({
        'initialValues': FormValues,
        enableReinitialize: true,
        validationSchema: userFormValidationSchema,
        onSubmit: updateUser
    })

    return (
        <div className="columns">
            <div className="column is-two-fifths">
                <form onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label className="label">Nome</label>
                    <div className="control">
                        <input className={formik.errors.name ? 'input is-danger' : 'input'} id="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" placeholder="Nome" />
                    </div>
                    {formik.errors.name  ? <p className="help is-danger">{formik.errors.name}</p> : ""} 
                </div>     
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className={formik.errors.email ? 'input is-danger' : 'input'} id="email" value={formik.values.email} onChange={formik.handleChange} type="text" placeholder="Email" />
                    </div>
                    {formik.errors.email ? <p className="help is-danger">{formik.errors.email}</p> : ""} 
                </div>     
                <div className="field">
                    <label className="label">Gender</label>
                    <div className="control select is-primary">
                        <select id="gender" onChange={formik.handleChange}>
                            <option selected disabled>Selecionar Gênero</option>
                            {gender_option.map((option) => (
                            <option key={option.id} value={option.id} selected={FormValues.gender === option.id}>
                                {option.label}
                            </option>
                            ))}
                        </select>
                    </div>
                    {formik.errors.gender   ? <p className="help is-danger">{formik.errors.gender}</p> : ""} 
                </div>     
                <div className="field">
                    <label className="label">Status</label>
                    <div className="control select is-primary">
                        <select id="status" onChange={formik.handleChange}>
                            <option selected disabled>Selecionar Status</option>
                            {status_option.map((option) => (
                            <option value={option.id} selected={FormValues.status === option.id}>
                                {option.label}
                            </option>
                            ))}
                        </select>
                    </div>
                    {formik.errors.status ? <p className="help is-danger">{formik.errors.status}</p> : ""} 
                </div>     
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary">Salvar</button>
                        <Link to="/users" className="button is-info">Cancelar</Link>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default EditUser

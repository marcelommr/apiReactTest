import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userFormValidationSchema } from '../../schemas';

const AddUser = () => {
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const navigate = useNavigate();
    const gender_option  = [
        { id: "male", label: "Masculino" },    
        { id: "female", label: "Feminino" }    
    ]
    const status_option  = [
        { id: "active", label: "Ativo" },    
        { id: "inactive", label: "In-Ativo" }    
    ]

    const doregister = async(values) => {
        
        axios.post("https://gorest.co.in/public/v2/users?access-token="+apiKeyGorest, {
                email : values.email,
                name: values.name,
                gender: values.gender,
                status: values.status
            })
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

    const formik = useFormik({
        'initialValues':{
            'name': "",
            'email': "",
            'gender': "",
            'status': "",
        },
        validationSchema: userFormValidationSchema,
        onSubmit: doregister
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
                    <label className="label">Gênero</label>
                    <div className="control select is-primary">
                        <select id="gender" onChange={formik.handleChange}>
                            <option selected disabled>Selecionar Gênero</option>
                            {gender_option.map((option) => (
                            <option key={option.id} value={option.id}>
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
                            <option value={option.id}>
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

export default AddUser

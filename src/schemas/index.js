import * as yup from "yup";

export const userFormValidationSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Obrigatório"),
    name: yup.string().required("Obrigatório"),
    status: yup.string().required("Obrigatório"),
    gender: yup.string().required("Obrigatório"),
});

export const toDoFormValidationSchema = yup.object().shape({
    user_id: yup.string().required("Obrigatório"),
    title: yup.string().required("Obrigatório"),
    status: yup.string().required("Obrigatório"),
});
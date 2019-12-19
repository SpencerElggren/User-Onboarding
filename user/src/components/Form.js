import React, { useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Card } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

const UserForm = ({
    values,
    errors,
    touched,
    status
}) => {
    const [users, setUser] = useState([]);
    useEffect(() => {
        status &&
            setUser(users => [...users, status]);
    }, [status]);

    return (
        <div className={'user-form'}>
            <Form>
                <label htmlFor={'name'}>Name:</label>
                <Field id={'name'} type={'text'} name={'name'}/>
                {touched.name && errors.name && (
                    <p className={'errors'}>{errors.name}</p>
                )}
                <label htmlFor={'email'}>E-mail:</label>
                <Field id={'email'} type={'text'} name={'email'}/>
                {touched.email && errors.email && (
                    <p className={'errors'}>{errors.email}</p>
                )}
                <label htmlFor={'password'}>Password:</label>
                <Field id={'password'} type={'text'} name={'password'}/>
                {touched.password && errors.password && (
                    <p className={'errors'}>{errors.password}</p>
                )}
                <label htmlFor={'terms'} className={'terms-box'}>I accept the Terms and Conditions
                    <Field id={'terms'} type={'checkbox'} name={'terms'} checked={values.terms}/>
                    <span className={'checkmark'} />
                </label>
                <button type={'submit'}>Submit User</button>
            </Form>
            <Card.Group>
                {users.map(user => (
                    <Card key={user.id}>
                        <Card.Content>
                            <Card.Header>{user.name}</Card.Header>
                            <Card.Meta>*******</Card.Meta>
                            <Card.Description>{user.email}</Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    )
};


const FormikUserForm = withFormik({
    mapPropsToValues({
        name,
        email,
        password,
        terms
                     }) {
        return {
            name: name || "",
            email: email || "",
            password: "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name required'),
        password: Yup.string().required('Password required')
    }),
    handleSubmit(
        values,
        {setStatus, resetForm}
    ) {
        axios
            .post(" https://reqres.in/api/users", values)
            .then(res => {
                setStatus(res.data);
                resetForm();
            })
            .catch( err => console.log(err.response));
    }
})(UserForm);

export default FormikUserForm;
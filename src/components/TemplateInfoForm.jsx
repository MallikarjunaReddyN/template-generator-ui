import React, { useState } from 'react';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const yesOrNoOptions = [
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' },
];

const dbTypeOptions = [
    { value: 'MySQL', label: 'MySQL' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
];

const scaOptions = [
    { value: 'SonarCloud', label: 'SonarCloud' },
    { value: 'SonarQube', label: 'SonarQube' },
];

const registeryOptions = [
    { value: 'DockerHub', label: 'DockerHub' },
    { value: 'ACR', label: 'ACR' },
];

const ciOptions = [
    { value: 'Github Actions', label: 'Github Actions' },
    { value: 'Azure Pipelines', label: 'Azure Pipelines' },
];

const initialData = {
    group_id: '',
    project_name: '',
    //project_package: '',
    server_port: '',
    version: '',
    project_description: '',
    is_db_required: '',
    db: '',
    db_name: '',
    sca: '',
    sca_type: '',
    docker: '',
    container_registery: '',
    CI: '',
    CI_type: '',
    aks: '',
    created_by: ''
};

const TemplateInfoForm = () => {
    const [formData, setFormData] = useState(initialData);

    const [errors, setErrors] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'is_db_required' && value === 'No') {
            setFormData({
                ...formData,
                [db]: '',
            });
        }
        if (name === 'sca' && value === 'No') {
            setFormData({
                ...formData,
                [sca_type]: '',
            });
        }
        if (name === 'docker' && value === 'No') {
            setFormData({
                ...formData,
                [container_registery]: '',
            });
        }
        if (name === 'CI' && value === 'No') {
            setFormData({
                ...formData,
                [CI_type]: '',
            });
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const projectGeneratedSuccess = () => toast.info(`Your project ${formData.project_name} created successfully!`);
    const projectGeneratedError = (errorMsg) => toast.error(errorMsg);

    const generteProject = () => {
        axios.post("https://template-generator.onrender.com/template-generator/v1/templategenerator/generate-project",
            formData,
            {responseType: 'blob'}
        ).then((response) => {
            console.log(response);
            if (response.status === 200) {
                const disposition = response.headers['content-disposition'];
                let filename = disposition.split(/;(.+)/)[1].split(/=(.+)/)[1];
                if (filename.toLowerCase().startsWith("utf-8''"))
                    filename = decodeURIComponent(filename.replace("utf-8''", ''));
                else
                    filename = filename.replace(/['"]/g, '');
                const url = window.URL.createObjectURL(response.data);
                var a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a); // append the element to the dom
                a.click();
                a.remove();
                projectGeneratedSuccess()
            } else {
                console.log(response.data);
                projectGeneratedError(response.data)
            }
            setFormData(initialData);
            setErrors(initialData);
        }).catch((error) => {
            console.log(error);
            console.log(error.response.data);
            projectGeneratedError(error.response.data);
            setFormData(initialData);
            setErrors(initialData);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields
        const validationErrors = validateForm();
        setErrors(validationErrors);

        // If there are no errors, submit the form or perform other actions
        if (Object.values(validationErrors).every((error) => !error)) {
            // Perform form submission or other actions here
            console.log('Form submitted successfully!');
            console.log(formData);
            generteProject();

        }
    };

    const validateForm = () => {
        let validationErrors = {};
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.project_name.trim()) {
            validationErrors.project_name = 'Project name is required.';
        }
        if (!formData.is_db_required.trim()) {
            validationErrors.is_db_required = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }
        if (!formData.group_id.trim()) {
            validationErrors.group_id = 'Group Id is required.';
        }

        return validationErrors;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2'>
                <div>
                    <TextInput label="Group ID" name="group_id" value={formData.group_id} placeholder="org.springframework.boot" error={errors.group_id} handleChange={handleChange} />

                    <TextInput label="Project name" name="project_name" value={formData.project_name} placeholder="Example Service" error={errors.project_name} handleChange={handleChange} />

                    <TextInput label="Server port" name="server_port" value={formData.server_port} placeholder="Optional. Ex: 8080" error={errors.server_port} handleChange={handleChange} />

                    <TextInput label="Version" name="version" value={formData.version} placeholder="Optional. Ex: 0.0.1 or 1.0.0" error={errors.version} handleChange={handleChange} />

                    <TextInput label="Project description" name="project_description" value={formData.project_description} placeholder="Optional. This is a Spring Boot Example project" error={errors.project_description} handleChange={handleChange} />

                    <Dropdown options={yesOrNoOptions} disable={false} label="Do you want database for your project" name="is_db_required" value={formData.is_db_required} error={errors.is_db_required} handleChange={handleChange} />

                    <Dropdown options={dbTypeOptions} disable={formData.is_db_required == '' || formData.is_db_required == 'No'} label="Which database do you want?" name="db" value={formData.db} error={errors.db} handleChange={handleChange} />

                    <TextInput label="Database name" disable={formData.is_db_required == '' || formData.is_db_required == 'No'} name="db_name" value={formData.db_name} placeholder="Optional. Ex: example" error={errors.db_name} handleChange={handleChange} />
                </div>
                <div>
                    <Dropdown options={yesOrNoOptions} disable={false} label="Do you want static code analysis for you project?" name="sca" value={formData.sca} error={errors.sca} handleChange={handleChange} />

                    <Dropdown options={scaOptions} disable={formData.sca == '' || formData.sca == 'No'} label="What static code analysis service do you want to use?" name="sca_type" value={formData.sca_type} error={errors.sca_type} handleChange={handleChange} />

                    <Dropdown options={yesOrNoOptions} disable={false} label="Do you want dockerize you project?" name="docker" value={formData.docker} error={errors.docker} handleChange={handleChange} />

                    <Dropdown options={registeryOptions} disable={formData.docker == '' || formData.docker == 'No'} label="which container registery do you want to use?" name="container_registery" value={formData.container_registery} error={errors.container_registery} handleChange={handleChange} />

                    <Dropdown options={yesOrNoOptions} disable={false} label="Do you want Continuous Integration for your project?" name="CI" value={formData.CI} error={errors.CI} handleChange={handleChange} />

                    <Dropdown options={ciOptions} disable={formData.CI == '' || formData.CI == 'No'} label="What Continuous Integration service do you want to use?" name="CI_type" value={formData.CI_type} error={errors.CI_type} handleChange={handleChange} />

                    <Dropdown options={yesOrNoOptions} disable={formData.docker == '' || formData.docker == 'No'} label="Do you want AKS deployment for your project?" name="aks" value={formData.aks} error={errors.aks} handleChange={handleChange} />

                    <TextInput label="Project creator name" name="created_by" value={formData.created_by} placeholder="Enter the project creator name" error={errors.created_by} handleChange={handleChange} />
                </div>
            </div>
            <div className='ml-[515px] mt-[15px]'>
                <button className='btn-primary' type="submit">Generate Project</button>
            </div>
        </form>
    );
};

export default TemplateInfoForm;
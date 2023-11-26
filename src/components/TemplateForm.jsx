import React, { useState } from 'react';
import InputField from './InputField';
import RadioInput from './RadioInput';
import axios from 'axios';
import { toast } from 'react-toastify';

const yesOrNoOptions = [
    { value: 'No', label: 'No', checked: true },
    { value: 'Yes', label: 'Yes', checked: false },
];

const dbTypeOptions = [
    { value: 'MySQL', label: 'MySQL', checked: true },
    { value: 'PostgreSQL', label: 'PostgreSQL', checked: false },
];

const scaOptions = [
    { value: 'SonarCloud', label: 'SonarCloud', checked: true },
    { value: 'SonarQube', label: 'SonarQube', checked: false },
];

const registeryOptions = [
    { value: 'DockerHub', label: 'DockerHub', checked: true },
    { value: 'ACR', label: 'ACR', checked: false },
];

const ciOptions = [
    { value: 'Github Actions', label: 'Github Actions', checked: true },
    { value: 'Azure Pipelines', label: 'Azure Pipelines', checked: false },
];


const TemplateForm = () => {
    const [groupId, setGroupId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [serverPort, setServerPort] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [isDbRequired, setIsDbRequired] = useState(yesOrNoOptions[0].value);
    const [dbType, setDbType] = useState('');
    const [dbName, setDbName] = useState('');
    const [sca, setSca] = useState(yesOrNoOptions[0].value);
    const [scaType, setScaType] = useState('');
    const [docker, setDocker] = useState(yesOrNoOptions[0].value);
    const [registry, setRegistry] = useState('');
    const [ci, setCi] = useState(yesOrNoOptions[0].value);
    const [ciType, setCiType] = useState('');
    const [aks, setAks] = useState('');
    const [createdBy, setCreatedBy] = useState('');

    const [isLoading, setIsLoading ] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'group_id') {
            delete errors.group_id;
            setGroupId(value);
        }
        if (name === 'project_name') {
            delete errors.project_name;
            setProjectName(value);
        }
        if (name === 'server_port') {
            delete errors.server_port;
            setServerPort(value);
        }
        if (name === 'project_description') {
            delete errors.project_description;
            setProjectDesc(value);
        }
        if (name === 'is_db_required') {
            setIsDbRequired(value);
            if (value === 'Yes') {
                setDbType(dbTypeOptions[0].value);
            }
            else {
                setDbType('');
                setDbName('');
            }
        }
        if (name === 'db_name') {
            delete errors.db_name;
            setDbName(value);
        }
        if (name === 'sca') {
            setSca(value);
            if (value === 'Yes') {
                setScaType(scaOptions[0].value);
            } else {
                setScaType('');
            }
        }
        if (name === 'docker') {
            setDocker(value);
            if (value === 'Yes') {
                setRegistry(registeryOptions[0].value);
                setAks(yesOrNoOptions[0].value);
            } else {
                setRegistry('');
                setAks('');
            }
        }
        if (name === 'container_registery') {
            setRegistry(value);
        }
        if (name === 'CI') {
            setCi(value);
            if (value === 'Yes') {
                setCiType(ciOptions[0].value);
            } else {
                setCiType('');
            }
        }
        if (name === 'CI_type') {
            setCiType(value);
        }
        if (name === 'created_by') {
            delete errors.created_by;
            setCreatedBy(value);
        }
    };

    const projectGeneratedSuccess = () => toast.success(`Your project "${projectName}" created successfully!`);
    const projectGeneratedError = (errorMsg) => toast.error(errorMsg);

    const clearData = () => {
        setGroupId(''); setProjectName(''); setServerPort(''); setProjectDesc(''); setIsDbRequired(yesOrNoOptions[0].value);
        setDbType(''); setDbName(''); setSca(yesOrNoOptions[0].value); setScaType(''); setDocker(yesOrNoOptions[0].value); setRegistry('');
        setCi(yesOrNoOptions[0].value); setCiType(''); setAks(''); setCreatedBy();
    }
    const generteProject = (formData) => {
        setIsLoading(true);
        axios.post("https://template-generator.onrender.com/template-generator/v1/templategenerator/generate-project",
            formData,
            { responseType: 'blob' }
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
                document.body.appendChild(a);
                a.click();
                a.remove();
                projectGeneratedSuccess();
            } else {
                console.log(response.data);
                projectGeneratedError(response.data)
            }
            clearData();
            setErrors({});
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            const blb = new Blob([error.response.data], { type: "text/plain" });
            const reader = new FileReader();
            reader.addEventListener('loadend', (e) => {
                const text = e.srcElement.result;
                projectGeneratedError(text);
            });
            reader.readAsText(blb);
            clearData();
            setErrors({});
            setIsLoading(false);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields
        const validationErrors = validateForm();
        setErrors(validationErrors);
        console.log(errors);
        // If there are no errors, submit the form or perform other actions
        if (JSON.stringify(validationErrors) === '{}') {
            console.log('Form submitted successfully!');
            const formData = {
                group_id: groupId,
                project_name: projectName,
                server_port: serverPort,
                project_description: projectDesc,
                is_db_required: isDbRequired,
                db: dbType,
                db_name: dbName,
                sca: sca,
                sca_type: scaType,
                docker: docker,
                container_registery: registry,
                CI: ci,
                CI_type: ciType,
                aks: aks,
                created_by: createdBy
            };
            console.log(formData);
            generteProject(formData);
        }
    };

    const validateForm = () => {
        let validationErrors = {};
        const groupIdRegex = /^[a-z]+(\\.[a-z][a-z0-9]*)*$/;
        const numberRegex = /^\d{4}$/;
        const projectNameRegex = /^[A-Za-z][A-Za-z\\s]*$/;
        const dbNameRegex = /^[a-z]+([a-z0-9\\_-]*)*$/;

        if (groupId === '' || groupIdRegex.test(groupId)) validationErrors.group_id = 'Group Id is required or invalid.';
        if (projectName === '' || projectNameRegex.test(projectName)) validationErrors.project_name = 'Project Name is required or invalid.';
        if (serverPort !== '' && !numberRegex.test(serverPort)) validationErrors.server_port = 'Invalid server port.';
        if (dbName !== '' && !dbNameRegex.test(dbName)) validationErrors.db_name = 'DB name is invalid.';
        if (createdBy == '') validationErrors.created_by = 'Creator name is required.';
        return validationErrors;
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2'>
                <div>
                    <InputField label="Group ID" name="group_id" value={groupId} placeholder="org.springframework.boot" error={errors?.group_id} handleChange={handleChange} disable={false} required={true} />
                    <InputField label="Project name" name="project_name" value={projectName} placeholder="Example Service" error={errors?.project_name} handleChange={handleChange} disable={false} required={true} />
                    <InputField label="Server port" name="server_port" value={serverPort} placeholder="Optional. Ex: 8080" error={errors?.server_port} handleChange={handleChange} disable={false} required={false} />
                    <InputField label="Project description" name="project_description" value={projectDesc} placeholder="Optional. This is a Spring Boot Example project" error={errors.project_description} handleChange={handleChange} disable={false} required={false} />
                    <RadioInput label="Do you want database for your project?" name='is_db_required' options={yesOrNoOptions} handleChange={handleChange} disable={false} />
                    <RadioInput label="Which database do you want?" name="db" options={dbTypeOptions} handleChange={handleChange} disable={isDbRequired == '' || isDbRequired == 'No'} />
                    <InputField label="Database name" name="db_name" value={dbName} placeholder="Optional. Ex: example" error={errors.db_name} handleChange={handleChange} disable={isDbRequired == '' || isDbRequired == 'No'} required={false} />
                </div>
                <div>
                    <RadioInput label="Do you want static code analysis for you project?" name="sca" options={yesOrNoOptions} handleChange={handleChange} disable={false} />
                    <RadioInput label="What static code analysis service do you want to use?" name="sca_type" options={scaOptions} handleChange={handleChange} disable={sca == '' || sca == 'No'} />
                    <RadioInput label="Do you want dockerize you project?" name="docker" options={yesOrNoOptions} handleChange={handleChange} disable={false} />
                    <RadioInput label="Which container registery do you want to use?" name="container_registery" options={registeryOptions} handleChange={handleChange} disable={docker == '' || docker == 'No'} />
                    <RadioInput label="Do you want Continuous Integration for your project?" name="CI" options={yesOrNoOptions} handleChange={handleChange} disable={false} />
                    <RadioInput label="What Continuous Integration service do you want to use?" name="CI_type" options={ciOptions} handleChange={handleChange} disable={ci == '' || ci == 'No'} />
                    <RadioInput label="Do you want AKS deployment for your project?" name="aks" options={yesOrNoOptions} handleChange={handleChange} disable={docker == '' || docker == 'No'} />
                    <InputField label="Enter the project creator name" name="created_by" value={createdBy} placeholder="Jhon" error={errors.created_by} handleChange={handleChange} disable={false} required={true} />
                </div>
            </div>
            <hr />
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" onClick={clearData} className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={isLoading}
                >
                    { isLoading && <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>} 
                    {isLoading ? 'Generating...' :'Generate Project' }
                </button>
            </div>
        </form>

    );
};

export default TemplateForm;
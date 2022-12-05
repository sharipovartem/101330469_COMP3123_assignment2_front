import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import {useState} from 'react';


const Signup = () => {
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })

    const [error, setError] = useState("")
    const navigate = useNavigate();
    
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]:input.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const url ="http://localhost:8080/api/users"
            const {data: res} = await axios.post(url, data);
            navigate("/login")
            console.log(res.message);

        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response <= 500){
                setError(error.data.message)
            }

        }

    }
    return(
        <div className={styles.signup_container}>
            <div className={styles.signup_from_container}>
                <div className={styles.left}>
                    <h1>Welcome</h1>
                    <Link to='/login'>
                        <button type='button' className={styles.white_btn}>Sign In</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create account</h1>
                        <input 
                            type="text" 
                            placeholder="First name" 
                            name='firstName' 
                            value={data.firstName} 
                            required 
                            className={styles.input}
                            onChange={handleChange}>
                        </input>
                        <input 
                            type="text" 
                            placeholder="Last name" 
                            name='lastName' 
                            value={data.lastName} 
                            required 
                            className={styles.input}
                            onChange={handleChange}>
                        </input>
                        <input 
                            type="text" 
                            placeholder="Email" 
                            name='email' 
                            value={data.email} 
                            required 
                            className={styles.input}
                            onChange={handleChange}>
                        </input>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name='password'
                            value={data.password} 
                            required 
                            className={styles.input}
                            onChange={handleChange}>
                        </input>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>Sign Up</button>
                    </form>
                </div>
            </div>

        </div>
    )

};

export default Signup;
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import {useState} from 'react';


const Login = () => {
    const [data, setData] = useState({
        email:"",
        password:""
    })

    const [error, setError] = useState("")
    
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]:input.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const url ="http://localhost:8080/api/auth"
            const {data: res} = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/"
            console.log(res.message);

        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response <= 500){
                setError(error.response.data.message)
            }

        }

    }
    return(
        <div className={styles.login_container}>
            <div className={styles.login_from_container}>
                <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
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
                        <button type='submit' className={styles.green_btn}>Sign In</button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Sign up</h1>
                    <Link to='/signup'>
                        <button type='button' className={styles.white_btn}>Sign Up</button>
                    </Link>
                </div>
            </div>

        </div>
    )

};

export default Login;
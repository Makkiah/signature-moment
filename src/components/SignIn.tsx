import {useState, FormEvent, ChangeEvent} from 'react';
import supabase from '../config/supabaseClient';

const SignIn = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isSignUp){
            const {error} = await supabase.auth.signUp({email, password}) 
            if(error){
                console.log("Error Signing Up: ");
                console.log(error.message);
                return;
            }
        } else {
           const {error} = await supabase.auth.signInWithPassword({email, password}) 
            if(error){
                console.log("Error Signing In: ");
                console.log(error.message);
                return;
            } 
        }
    }

  return (
    <div>   
        <h2 className="su-title">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
            <input 
                className='su-input'
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                }}
            />
            <input 
                className='su-input'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                }}
            />
            <button
                className='su-submit'
                type="submit"
            >
                {isSignUp ? "Sign Up" : "Sign In"}
            </button>
            <button 
                className="su-switch"
                onClick={() => {
                    setIsSignUp(!isSignUp)
                }}
            >
                {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
            </button>
        </form>
        
    </div>
  )
}

export default SignIn;
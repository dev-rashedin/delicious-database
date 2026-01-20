import { useState, type FormEvent, type ChangeEvent } from 'react';
import { supabase } from '../supabase-client';

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp) {
    const {error: signupError, data} = await supabase.auth.signUp({
        email,
        password,
    });
      
      if (signupError) {
      alert( signupError.message);
      console.error('Error signing up:', signupError.message);
      return;
      }
      console.log(data);
      
      alert('Sign-up successful! Please check your email to confirm your account.');
      
    } else {
     const {error: signInError} = await supabase.auth.signInWithPassword({
        email,
        password,
     });
      if (signInError) {
        alert( signInError.message);
        console.error('Error signing in:', signInError.message);
        return;
      }
    }

    alert('Sign-in successful!');

  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <button
          type='submit'
          style={{  margin: '0.5rem 0', width: '100%', border: '1px solid #3e3e3eff' }}
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <a
        onClick={() => {
          setIsSignUp(!isSignUp);
        }}
        style={{ padding: '0.5rem 1rem' }}
      >
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </a>
    </div>
  );
};

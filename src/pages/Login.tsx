import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthProviderType } from '../types';
import { LogIn, AlertCircle, Github, Facebook, Mail } from 'lucide-react';
import Popup from '../components/Popup';
import { supabase } from '../lib/supabase';

const Login = () => {
  const { signIn, signInWithEmail, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [showFbPopup, setShowFbPopup] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (provider: AuthProviderType) => {
    if (provider === 'facebook') {
      setShowFbPopup(true);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await signIn(provider);
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Email login error:', error);
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    navigate('/dashboard');
  };

  const handleSignUp = async () => {
    setError(null);
    setSignUpSuccess(null);
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/dashboard',
        },
      });
      if (error) throw error;
      setSignUpSuccess('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Popup open={showFbPopup} onClose={() => setShowFbPopup(false)}>
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#6366F1" />
              <path d="M25 13l2 2-8 8-2-2 8-8zM13 25l2 2 8-8-2-2-8 8z" fill="#fff" />
              <rect x="18" y="18" width="4" height="10" rx="2" fill="#fff" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Login Method not active</h2>
          <p className="text-gray-600 mb-4 text-sm">
            This login method is currently under development<br />
            <span className="block mt-1 font-bold">Choose some other method to login to the app</span>
          </p>
          <button
            onClick={() => setShowFbPopup(false)}
            className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded-md font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            OK
          </button>
        </div>
      </Popup>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to TaskMaster
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Manage your tasks efficiently and stay organized
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div className="mb-4 p-4 bg-red-50 rounded-md border border-red-200">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {isEmailLogin ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                {isSignUp ? (
                  <>
                    {signUpSuccess && (
                      <div className="mb-2 p-2 bg-green-50 rounded-md border border-green-200 text-green-700 text-sm text-center">
                        {signUpSuccess}
                      </div>
                    )}
                    <button
                      onClick={handleSignUp}
                      disabled={loading || !email || !password}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {loading ? 'Signing up...' : 'Sign up'}
                    </button>
                    <button
                      onClick={() => { setIsSignUp(false); setSignUpSuccess(null); setError(null); }}
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back to Login
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-sm text-center text-gray-600">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => { setIsSignUp(true); setSignUpSuccess(null); setError(null); }}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        Sign up
                      </button>
                    </div>
                    <button
                      onClick={handleEmailSignIn}
                      disabled={loading || !email || !password}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {loading ? 'Signing in...' : 'Sign in with Email'}
                    </button>
                    <button
                      onClick={() => setIsEmailLogin(false)}
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back to Social Login
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <button
                    onClick={() => handleSignIn('google')}
                    disabled={loading}
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="h-5 w-5 mr-2"
                    />
                    Sign in with Google
                  </button>
                  <button
                    onClick={() => handleSignIn('github')}
                    disabled={loading}
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    Sign in with GitHub
                  </button>
                  <button
                    onClick={() => handleSignIn('facebook')}
                    disabled={loading}
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    Sign in with Facebook
                  </button>
                </div>
                <div className="my-6 flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500 text-sm bg-white px-2">
                    {loading ? 'Loading...' : 'Or'}
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <button
                  onClick={() => setIsEmailLogin(true)}
                  disabled={loading}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Sign in with Email
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
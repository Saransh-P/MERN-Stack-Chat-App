import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import AuthImagePattern from '../components/AuthImagePattern';

const SignUpPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    });

    {/* auth store */}
   const {signup, isSigningUp} = useAuthStore();

   {/* validate form - the logic for validating the form will be here */}
   const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error('Full name is required'); {/* if full name is not provided, show error */}
        
    if (!formData.email.trim()) return toast.error('Email is required'); {/* if email is not provided, show error */}
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email address'); {/* if email is not valid, show error */}

    if (!formData.password.trim()) return toast.error('Password is required'); {/* if password is not provided, show error */}
    if (formData.password.length < 8) return toast.error('Password must be at least 8 characters'); {/* if password is less than 8 characters, show error */}

    return true;
   };

   {/* handle submit */}
   const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    {/* if form is valid, signup */}
    if(success===true) signup(formData);
   };

   
    return (

        <div className='min-h-screen grid lg:grid-cols-2'>

            {/* Left side - Form */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>

                    {/* LOGO - title */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-[#38EF7D]' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2 text-gradient'>Create an account</h1>
                            <p className='text-base-content/60 text-gradient'>Get started with your free account</p>
                        </div>
                    </div>

                    {/* form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>

                        {/* full name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gradient">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Your Full-Name"
                                    value={formData.fullname}
                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gradient">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Mail className="size-5 text-base-content/40" />    
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>    
                        </div>

                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gradient">Password</span> 
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                                    onClick={() => setShowPassword(!showPassword)} 
                                >
                                    {showPassword ? ( 
                                        <EyeOff className="size-5 text-base-content/40" /> 
                                    ) : ( 
                                        <Eye className="size-5 text-base-content/40" /> 
                                    )
                                    }
                                </button>
                            </div>
                        </div>

                        {/* submit button */}
                        <button type="submit" className="btn btn-gradient w-full" disabled={isSigningUp}> {/* disabled if signing up */}
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" /> 
                                    Loading...
                                </>
                            ) : ( 
                                "Create Account" 
                            )}
                        </button>

                    </form>

                    {/* link to login page, if already have an account */}
                    <div className="text-center">
                        <p className="text-base-content/60 text-gradient">
                            Already have an account?{" "}
                            <Link to="/login" className="link-gradient">
                                Sign in
                            </Link>
                        </p>
                    </div>   

                </div>
            </div>

            {/* Right side - Image */}
            <AuthImagePattern
                title="Join the vibe"
                subtitle="Laugh more, share memories, and stay in touch with your people."
            />


        </div>

    )
}

export default SignUpPage;
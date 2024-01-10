import React from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="max-w-md mx-auto my-10 w-5/6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            className="input-style peer"
            placeholder=" "
            id="name"
            {...register("name", { required: true })}
          />

          <label
            htmlFor="name"
            className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            className="input-style peer"
            placeholder=" "
            {...register("email", { required: true })}
            id="email"
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <textarea
            {...register("message", { required: true })}
            rows="4"
            className="input-style peer"
            placeholder=" "
            id="message"
          ></textarea>
          <label
            htmlFor="message"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Message
          </label>
        </div>

        <div className="flex flex-col">
          
            {errors.name && (
              <span className="text-red-400 mb-2">Name is required.</span>
            )}
            {errors.email && (
              <span className="text-red-400 mb-2">Email is required.</span>
            )}
            {errors.message && (
              <span className="text-red-400 mb-2">Message is required.</span>
            )}
         
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 px-6 py-1 transition ease-in duration-200 rounded-lg hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none "
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

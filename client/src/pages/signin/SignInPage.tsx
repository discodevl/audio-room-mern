import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  username: string;
  name: string;
}

function SignInPage() {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(/^[a-zA-Z0-9_.@S]+$/, "Invalid username"),
    name: yup.string().required("Name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  
  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    const {name, username} = data;

  }

  return (
    <div className="flex flex-col">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username:</label>
          <input type="text" {...register("username")} className="rounded-md outline-1 bg-slate-200 px-4 py-2 text-black"/>
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name:</label>
          <input type="text" {...register("name")} className="rounded-md outline-1 bg-slate-200 px-4 py-2 text-black"/>
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <button className="p-4 border rounded-md mt-4">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;

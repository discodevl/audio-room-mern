import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PEOPLES_IMAGES } from "../../util/imagesArr";
import Cookies from "universal-cookie";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { useUser } from "../../context/user-context";
import { useNavigate } from "react-router-dom";

interface FormValues {
  username: string;
  name: string;
}

function SignInPage() {
  const cookies = new Cookies();
  const { setClient, setUser } = useUser();
  const navigate = useNavigate();
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

  const onSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const { name, username } = data;
    const res = await fetch("http://localhost:3001/auth/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        name,
        image:
          PEOPLES_IMAGES[Math.floor(Math.random() * PEOPLES_IMAGES.length)],
      }),
    });
    if (!res.ok) {
      alert("Some error occured while signing in");
      return;
    }

    const user: User = {
      id: username,
      name,
    };

    const resData = await res.json();
    const myClient = new StreamVideoClient({
      apiKey: "3acane5uzwke",
      user,
      token: resData.token,
    });
    setClient(myClient);
    setUser({ username, name });
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    cookies.set("token", resData.token, { expires });
    cookies.set("username", resData.username, { expires });
    cookies.set("name", resData.name, { expires });

    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            {...register("username")}
            className="rounded-md outline-1 bg-slate-200 px-4 py-2 text-black"
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            {...register("name")}
            className="rounded-md outline-1 bg-slate-200 px-4 py-2 text-black"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <button className="p-4 border rounded-md mt-4">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;

import { StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "../../context/user-context";
import { Navigate } from "react-router-dom";

function HomePage() {
  const { client } = useUser();

  if(!client) return <Navigate to="/signin"/>

  //1:10:55
  return (
    <StreamVideo client={client}>
      <div>HomePage</div>
    </StreamVideo>
  );
}

export default HomePage;

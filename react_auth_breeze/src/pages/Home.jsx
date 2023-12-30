import { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext.jsx';
import instance from "../api/axios.jsx";

const Home = () => {
  const { user, getUser } = useContext(AuthContext);
  
  const [verificationStatus, setVerificationStatus] = useState(null);

  // const verifyEmail = async (id, hash) => {
  //   try {
  //     const response = await instance.get(`/verify-email/${id}/${hash}`);
  //     setStatus(response.data.message);
  //     console.log(response);
  //   } catch (error) {
  //     setStatus('Erreur lors de la vérification de l\'e-mail');
  //     console.error(error);
  //   }
  // };

  const sendVerificationEmail = async () => {
    try {
      const response = await instance.post('/email/verification-notification');
      setVerificationStatus(response.status);
      console.log(response)
    } catch (error) {
      setVerificationStatus('Erreur lors de l\'envoi de la notification d\'e-mail de vérification');
      console.error(error);
    }
  };

  return (
    <div>
      {user?.name}
      {verificationStatus && <h1>link sent verify your email</h1>}
      <h1>Vérification de-mail</h1>
      <br /><hr />
      <button onClick={sendVerificationEmail}>
        Envoyer la notification de-mail de vérification(pour verifier)
      </button>
    </div>
  )
}

export default Home
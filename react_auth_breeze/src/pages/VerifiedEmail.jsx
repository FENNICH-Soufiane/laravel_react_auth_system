import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerifiedEmail = () => {
  const { id, hash } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    // Effectuez ici la vérification d'e-mail en utilisant les paramètres (id, hash)
    // Vous pouvez effectuer une requête à votre backend pour vérifier l'e-mail
    // Mettez à jour l'état en fonction du résultat de la vérification

    // Exemple simplifié :
    if (id && hash) {
      // Mettez à jour l'état en fonction du résultat de la vérification
      setVerificationStatus('E-mail vérifié avec succès!');
    } else {
      setVerificationStatus('Erreur lors de la vérification de l\'e-mail');
    }
  }, [id, hash]);

  return (
    <div>
      <h1>Vérification de-mail</h1>
      <p>Statut de la vérification : {verificationStatus}</p>
    </div>
  );
};

export default VerifiedEmail;

// export default VerifiedEmail;
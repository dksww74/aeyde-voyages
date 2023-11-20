<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        // Gérer l'erreur ici
        exit;
    }

    $recipient = "mailsurvey012@gmail.com"; // Remplacez par votre email
    $subject = "Nouveau message de $name";

    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "<script>alert('Message envoyé');</script>";
        echo "<script>window.location.href = 'index.html';</script>"; // Redirige vers le formulaire
    } else {
        // Gérer l'échec de l'envoi de l'email
    }
} else {
    // Gérer l'accès direct au fichier PHP
}
?>

interface Resources {
  "web": {
    "login": {
      "header": {
        "title": "Inicia sesión en tu cuenta",
        "aside": "Empieza a hacer realidad tus sueños"
      },
      "inputs": {
        "email": {
          "placeholder": "Ingresa tu correo electrónico"
        },
        "password": {
          "placeholder": "Ingresa tu contraseña"
        }
      },
      "buttons": {
        "login": "Continuar con el correo",
        "google": "Continuar con Google",
        "facebook": "Continuar con Facebook"
      },
      "labels": {
        "not-account": "¿No tienes una cuenta shuk?",
        "register-account": "Regístrate aquí",
        "problems-login": "¿Tienes problemas?",
        "contact": "Contacta con nosotros",
        "or": "o"
      }
    },
    "register": {
      "header": {
        "title": "Regístrate en Shuk"
      },
      "inputs": {
        "full-name": {
          "label": "Nombres y apellidos",
          "placeholder": "Ejm: Juan Jose Moreno Peralta"
        },
        "email": {
          "label": "Correo electrónico",
          "placeholder": "Ejm: juan@mail.com"
        },
        "birthday": {
          "label": "Fecha de nacimiento",
          "placeholder": ""
        },
        "phone": {
          "label": "Numero de celular",
          "placeholder": "+593 912345678"
        },
        "username": {
          "label": "Username",
          "placeholder": "Ex: tito123"
        }
      },
      "buttons": {
        "save": "Continuar con el registro"
      },
      "labels": {
        "whit-account": "¿Tienes una cuenta?",
        "login": "Inicia sesión",
        "save-post": "Felicidades por tu publicación."
      }
    },
    "validations": {
      "messages": {
        "email-required": "Se requiere el campo correo electrónico",
        "password-required": "Se requiere el campo contraseña",
        "email-type": "El correo electrónico es invalido",
        "full-name-required": "El campo de nombre y apellido es obligatorio",
        "full-name-min": "Ingrese un mínimo de 3 caracteres",
        "birthday-required": "El campo de cumpleaños es obligatorio",
        "phone-required": "El campo numero de celular es obligatorio",
        "nan-type-post": "Error no se selecciono un tipo de publicación",
        "nan-img-post": "No se selecciono una imagen para la publicación",
        "nan-payload-post": "No se pude publicar un contenido vació",
        "min-length": "Ingresar un mínimo de {count} caracteres"
      }
    },
    "titles": {
      "create-post": "Crear nueva publicación"
    },
    "descriptions": {
      "post": "Publicar",
      "post-text": "Publicación de texto",
      "post-img": "Publicación de imagen",
      "post-video": "Publicación de video",
      "exit-post": "Esta página le pide que confirme que desea salir; puede que la información que haya introducido no se guarde.",
      "share-idea": "Comparte tus ideas...",
      "posts": "Publicaciones",
      "details": "Detalles",
      "statistics": "Estadística",
      "your-post": "Publicaciones",
      "account": "Cuenta",
      "profile": "Perfil",
      "privacy-safety": "Privacidad y seguridad",
      "password": "Contraseña",
      "save-changes": "Guardar cambios"
    },
    "helpers": {
      "email-not-show": "El correo electrónico no se mostrará públicamente.",
      "username-unique": "Debe ser un nombre único"
    }
  }
}

export default Resources;

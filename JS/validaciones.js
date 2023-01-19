export function valida (input){
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    console.log(input.parentElement)
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tiposDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
];

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacío'
    },
    email:{
        valueMissing: 'El campo email no puede estar vacío',
        typeMismatch: 'El correo no es valido'
    },
    password:{
        valueMissing: 'El campo contraseña no puede estar vacío',
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener al menos 1 letra minuscula,debe contener al menos 1 letra mayuscula,un numero y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: 'El campo nacimiento no puede estar vacío',
        customError:'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es xxxxxxxxxxxx 10 números'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La direccion debe contener de 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La ciudad debe contener de 4 a 30 caracteres'
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La estado debe contener de 4 a 30 caracteres'
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = '';
    tiposDeErrores.forEach(error=>{
        if(input.validity[error]){
            console.log(error)
            console.log(input.validity[error])
            console.log()
            console.log(tipoDeInput + ': ' +mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje;
}

const validarNacimiento = (input) =>{
   const fechaCliente = new Date(input.value);
    let mensaje = '';
    if(!mayorDeEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 años de edad'
    }
    input.setCustomValidity(mensaje)

   console.log(mensaje)
}

const mayorDeEdad = (fecha) =>{
    const fechaActual = new Date()

    const diferenciaFecha = 
    new Date(
        fecha.getUTCFullYear()
        + 18, 
        fecha.getUTCMonth(),
        fecha.getUTCDate());

    return fechaActual >= diferenciaFecha;
}
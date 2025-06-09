
let msj = document.querySelector("#msj")
let msj_box = document.querySelector("#msj_box")
let cerrar_msj = document.querySelector("#cerrar_msj")

let inputNombre = document.querySelector("#nombre")
let labNombre = document.querySelector("#labNombre")

let inputEmail = document.querySelector("#email")
let labEmail = document.querySelector("#labEmail")

let inputContra = document.querySelector("#contra")
let verContra = document.querySelector("#verContra")
let labContra = document.querySelector("#labContra")

let form_signup = document.querySelector("#form_signup")

let msj_nombre_valido = document.getElementById("msj_nombre_valido")
let msj_nv = document.getElementById("msj_nv")

let msj_pass_invalida = document.getElementById("msj_pass_invalida")
let msj_pi = document.getElementById("msj_pi")

verContra.addEventListener("click", (e) => 
    {

    e.preventDefault()

    let estado = inputContra.type === "password" ? "text" : "password"
    let icono = inputContra.type === "text" ? `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#737373"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>` : `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="#737373"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>`
    inputContra.type = estado
    verContra.innerHTML = icono
    }
)

inputNombre.addEventListener("focus", () => {

    labNombre.classList.add("peer-focus:-top-2", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:text-blue-400", "peer-focus:scale-90")
    labNombre.classList.remove("top-2")
})

inputNombre.addEventListener("blur", () => {

    let valorNombre = inputNombre.value

    if (valorNombre.length === 0) {

        labNombre.classList.add("top-2", "text-trece", "scale-100")
        labNombre.classList.remove("peer-focus:-top-2", "text-xs", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:text-blue-400", "peer-focus:scale-90", "scale-90")

    } else {
        
        labNombre.classList.remove("scale-100")
        labNombre.classList.add("-top-2", "left-2.5",  "text-xs", "text-slate-400", "scale-90")
    }

    
})


inputEmail.addEventListener("focus", () => {

    labEmail.classList.add("peer-focus:-top-2", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:scale-90")
    labEmail.classList.remove("top-2")
})

inputEmail.addEventListener("blur", () => {

    let valorEmail = inputEmail.value

    if (valorEmail.length === 0) {

        labEmail.classList.add("top-2", "text-trece", "scale-100")
        labEmail.classList.remove("peer-focus:-top-2", "text-xs", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:scale-90", "scale-90")

    } else {
        
        labEmail.classList.remove("scale-100")
        labEmail.classList.add("-top-2", "left-2.5",  "text-xs", "text-slate-400", "scale-90")
    }

    
})

inputContra.addEventListener("focus", () => {

 
    labContra.classList.add("peer-focus:-top-2", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:text-blue-400", "peer-focus:scale-90")
    labContra.classList.remove("top-2")
})

inputContra.addEventListener("blur", () => {

    let valorContra = inputContra.value

    if (valorContra.length === 0) {

        labContra.classList.add("top-2", "text-trece", "scale-100")
        labContra.classList.remove("peer-focus:-top-2", "text-xs", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:text-blue-400", "peer-focus:scale-90", "scale-90")

    } else {
        
        labContra.classList.remove("scale-100")
        labContra.classList.add("-top-2", "left-2.5",  "text-xs", "text-slate-400", "scale-90")
    }

    
})


form_signup.addEventListener("submit", (e) => {

    e.preventDefault()

    if (inputNombre.value.trim() === "" || inputContra.value.trim() === "" || inputEmail.value.trim() === "") return

    if (!ContieneCaracteresValidos())
    {
        msj_nombre_valido.classList.remove("opacity-0")
        msj_nv.textContent = `El nombre contiene caracteres inválidos`
        return
    }

    if (inputContra.value.trim().length <= 7)
    {
        msj_pass_invalida.classList.remove("opacity-0")
        msj_pi.textContent = `La contraseña debe contener al menos 8 caracteres`
        return 
    }

    try {
        fetch ("http://localhost:8080/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: inputNombre.value,
                    email: inputEmail.value,
                    password: inputContra.value,
                })
            }
        
        )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }
        
            return res.json()
        })
        .then((data) => {
    
           

           if (data.codigo !== 200) {

                msj.textContent = data.mensaje
                msj_box.classList.add("opacity-100")
                inputEmail.classList.add("border-red-500", "focus:border-red-500", "hover:border-red-500")
                labEmail.classList.add("text-red-500")

           } else {

                window.location.href = "./login.html"
           }
            
        })

    } catch(error) {

        throw new Error(error)

    } finally {
        
        inputEmail.value = ""
        inputContra.value = ""
        inputNombre.value = ""


        labNombre.classList.add("top-2", "text-trece", "scale-100")
        labNombre.classList.remove("peer-focus:-top-2", "text-xs", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:text-blue-400", "peer-focus:scale-90", "scale-90")
        labEmail.classList.add("top-2", "text-trece", "scale-100")
        labEmail.classList.remove("peer-focus:-top-2", "text-xs", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:text-blue-400", "peer-focus:scale-90", "scale-90")
        labContra.classList.add("top-2", "text-trece", "scale-100")
        labContra.classList.remove("peer-focus:-top-2", "text-xs", "peer-focus:left-2.5",  "peer-focus:text-xs", "peer-focus:text-blue-400", "peer-focus:scale-90", "scale-90")
    }
})  


let caracteresValidos = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
]

function ContieneCaracteresValidos()
{
    for (let i = 0; i < inputNombre.value.length; i++)
    {
        if (!caracteresValidos.includes(inputNombre.value[i])) {

            return false
        }
    }

    return true
}
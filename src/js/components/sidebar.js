const links_sidebar = [
    `Inicio`,
    `Historial`,
    `Marcados`,
    `Videos Guardados`,
    `Suscripciones`
]

const inicio_sidebar = document.getElementById("inicio")
const historial_sidebar = document.getElementById("historial")


const contenedor_suscripciones = document.getElementById("contenedor_suscripciones")


    // switch(window.location.pathname) {

    //     case "/" || "/index.html":
    //         inicio_sidebar.classList.add("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
    //         inicio_sidebar.classList.remove("hover:bg-[#f2f2f2]")
            
    
    //         historial_sidebar.classList.remove("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
    //         historial_sidebar.classList.add("hover:bg-[#f2f2f2]")
            
    //         break;
    
    //     case "/proyecto_final-main/src/pages/historial.html":
    //         inicio_sidebar.classList.remove("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
    //         inicio_sidebar.classList.add("hover:bg-[#f2f2f2]")
           
    
    //         historial_sidebar.classList.add("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
    //         historial_sidebar.classList.remove("hover:bg-[#f2f2f2]")
          
    //         break;
    
    //     default: 
    //         inicio_sidebar.classList.add("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
    //         inicio_sidebar.classList.remove("hover:bg-[#f2f2f2]")
    //         break;
        
    // }



const loader_suscripciones_sidebar = document.getElementById("loader_suscripciones_sidebar")
function SidebarSuscripciones()
{   
    if (localStorage.getItem("logged")) {
        const timeout = setTimeout(() => {
            loader_suscripciones_sidebar.classList.remove("hidden")
        }, 200)
    
        fetch(`https://proyectofinalapi-production-0ce0.up.railway.app/suscripciones/sidebar`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("logged")}`,
                }
            }
        )
        .then((res) => {
            
            if (!res.ok) {
    
                throw new Error("ERROR")
            }
            return res.json()
        })
        .then((datos) => {
    
            
            try {
                let suscripciones = datos.mensaje.suscripciones.listar
    
                if (suscripciones.length > 0)
                {
                    contenedor_suscripciones.classList.remove("hidden")

                    for (let u = 0; u < 4; u++)
                        {
                            let nuevoA = document.createElement("a")
            
                            nuevoA.classList.add("sidebar_nav", "rounded-md", "px-1.5", "w-full", "h-[34px]", "flex", "items-center", "gap-2", "cursor-pointer", "transition-colors", "duration-150", "hover:bg-[#f2f2f2]")
                            nuevoA.title = suscripciones[u].usuario.nombre
                            nuevoA.href = "https://newtube-tp1f.onrender.com/pages/canal.html?ref=" + suscripciones[u].usuario.canal.nombre_canal
                            nuevoA.innerHTML = `
                            
                            <div class='min-w-[20px] min-h-[20px]'>
                                <img src="${suscripciones[u].usuario.media.avatar}" width="20" height="20" class='rounded-full bg-center bg-cover bg-no-repeat'>
                            </div>
                            <div class="txt text-[13.2px] font-Roboto line-clamp-1">
                                ${suscripciones[u].usuario.nombre}
                            </div>
                            
                            `
                            
                            contenedor_suscripciones.appendChild(nuevoA)
                        }
            
                }

            }
            catch(error) {
                console.error(error)
            }
            finally{
                clearTimeout(timeout)
                loader_suscripciones_sidebar.classList.add("hidden")
            }
            
        })
    }
}

SidebarSuscripciones()

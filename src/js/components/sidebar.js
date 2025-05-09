const links_sidebar = [
    `Inicio`,
    `Explorar`,
    `Historial`,
    `Me Gusta`,
    `Videos Guardados`,
    `Reportes`,
    `Suscripciones`
]

const inicio_sidebar = document.getElementById("inicio")
const historial_sidebar = document.getElementById("historial")


const contenedor_suscripciones = document.getElementById("contenedor_suscripciones")


    switch(window.location.pathname) {

        case "/" || "/index.php":
            inicio_sidebar.classList.add("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
            inicio_sidebar.classList.remove("hover:bg-[#f2f2f2]")
            
    
            historial_sidebar.classList.remove("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
            historial_sidebar.classList.add("hover:bg-[#f2f2f2]")
            
            break;
    
        case "/proyecto_final-main/src/pages/historial.php":
            inicio_sidebar.classList.remove("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
            inicio_sidebar.classList.add("hover:bg-[#f2f2f2]")
           
    
            historial_sidebar.classList.add("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
            historial_sidebar.classList.remove("hover:bg-[#f2f2f2]")
          
            break;
    
        default: 
            inicio_sidebar.classList.add("bg-[#e6e6e6]", "hover:bg-[#d9d9d9]")
            inicio_sidebar.classList.remove("hover:bg-[#f2f2f2]")
            break;
        
    }



const loader_suscripciones_sidebar = document.getElementById("loader_suscripciones_sidebar")
function SidebarSuscripciones()
{   
    if (localStorage.getItem("logged")) {
        const timeout = setTimeout(() => {
            loader_suscripciones_sidebar.classList.remove("hidden")
        }, 200)
    
        fetch(`http://localhost:8080/suscripciones/sidebar`,
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
                            nuevoA.innerHTML = `
                            
                            <div class='min-w-[20px] min-h-[20px]'>
                                <img src="${suscripciones[u].usuario.media.avatar}" width="20" height="20">
                            </div>
                            <div class="txt text-[13.2px] font-Roboto line-clamp-1">
                                ${suscripciones[u].usuario.nombre}
                            </div>
                            
                            `
                            
                            contenedor_suscripciones.appendChild(nuevoA)
                        }
            
                        if (datos.mensaje.suscripciones.mostrar)
                        {
                            let nuevoB = document.createElement("a")
            
                            nuevoB.classList.add("sidebar_nav", "rounded-md", "px-2", "w-full", "h-[34px]", "flex", "items-center", "gap-2", "cursor-pointer", "transition-colors", "duration-150", "hover:bg-[#f2f2f2]")
                            nuevoB.innerHTML = `
                        
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide min-w-[16px] lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                            <div id="suscripciones_mm" class="text-[13.2px] font-Roboto line-clamp-1">
                                Mostrar Más
                            </div>
                            
                            `
                            contenedor_suscripciones.appendChild(nuevoB)
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
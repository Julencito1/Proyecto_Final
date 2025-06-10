

const posicion_mostrar_header = document.getElementById("posicion_mostrar_header")
const btn_crear_nuevo = document.getElementById("btn_crear_nuevo")
const contenedor_notificaciones = document.getElementById("contenedor_notificaciones")

var IMAGEN_USUARIO = ""

function EstaLogeado() {

    if (localStorage.getItem("logged")) 
    {
        let contendor_usuario = document.createElement("div")

        contendor_usuario.classList.add("relative")
        contendor_usuario.setAttribute("id", "contenedor_menu_usuario")

        contendor_usuario.innerHTML = `
            
            <button aria-label='Botón Menu Usuario' id="btn_menuusuario" class="w-8 h-8 flex items-center justify-center overflow-hidden rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#262626]">
              <img src="" class="avatar_usuario w-8 h-8 rounded-full bg-no-repeat bg-cover bg-center">
            </button>
            <div id="menu_usuario" class="hidden origin-top-right absolute border right-0 z-50 bg-white py-2 rounded-md shadow-md w-60">
              <div class="flex flex-col gap-3">
                <div class="flex px-2 gap-2">
                    <div class="min-w-7 min-h-7 flex items-center justify-center overflow-hidden rounded-full">
                      <img src="" class="avatar_usuario w-7 h-7 rounded-full bg-no-repeat bg-cover bg-center">
                    </div>
                    <div>
                      <div id="usuario_nombre" class="font-Inter text-[13px] line-clamp-1">
                        
                      </div>
                      <div id="usuario_nombre_canal" class="font-Inter text-[11px] text-gray-700 line-clamp-1">

                      </div>
                    </div>
                </div>
                <hr class="border-[#e6e6e6]" />
                <div>
                    <div>
                    <a href="#" class="w-full flex items-center gap-2 text-left px-4 py-2 font-Inter text-xs transition-colors duration-150 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tv-icon lucide-tv"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
                        Tu Canal
                    </a>
                    </div>
                    <div>
                    <button id="usuario_cerrar_sesion" class="w-full flex items-center gap-2 text-left px-4 py-2 font-Inter text-xs transition-colors duration-150 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22.5 22.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="M8.438 19.688h-3.75a1.875 1.875 0 0 1 -1.875 -1.875V4.688a1.875 1.875 0 0 1 1.875 -1.875h3.75"/><path points="16 17 21 12 16 7" d="m15 15.938 4.688 -4.688L15 6.563"/><path x1="21" x2="9" y1="12" y2="12" d="M19.688 11.25h-11.25"/></svg>
                        Cerrar Sesión
                    </button>
                    </div>
                </div>
              </div>
            </div>
          
        `

        posicion_mostrar_header.appendChild(contendor_usuario)
    } else {

        let contenedor_iniciar_sesion = document.createElement("a")

        contenedor_iniciar_sesion.classList.add("border", "rounded-full", "px-3", "py-1", "font-Inter", "text-[13px]", "transition-colors", "duration-150" ,"hover:bg-gray-100")
        contenedor_iniciar_sesion.href = "./login.html"

        contenedor_iniciar_sesion.innerHTML = `
    
            Iniciar Sesión
            
        `

        posicion_mostrar_header.appendChild(contenedor_iniciar_sesion)
    }
}

EstaLogeado()



const btn_sidebar = document.getElementById("btn_sidebar")
const btn_notificaciones = document.getElementById("btn_notificaciones")
const notificaciones = document.getElementById("notificaciones")

const plantilla = document.getElementById("plantilla")

const inicio_texto = document.querySelectorAll(".sidebar_nav > .txt")
const suscripcionesSidebar = document.getElementById("#suscripciones_mm")
const limpiar_buscador = document.getElementById("limpiar_buscador")
const buscador = document.getElementById("buscador")
const recomendaciones = document.getElementById("recomendaciones")


var ESTADO_SIDEBAR = true
var ESTADO_NOTIFICACIONES = false
var ESTADO_MENU = false
var ESTADO_CREAR_NUEVO = false
var TOTAL_NOTIS = 0

window.addEventListener("resize", () => {

    if (window.innerWidth <= 767)
    {
        inicio_texto.forEach((m) => {
            m.textContent = ""
        })
        ESTADO_SIDEBAR = false
        plantilla.style.gridTemplateColumns = `65px 1fr 1fr`
    } else {

        inicio_texto.forEach((m, e) => {
            m.textContent = links_sidebar[e]
        })
        plantilla.style.gridTemplateColumns = `240px 1fr 1fr`

        ESTADO_SIDEBAR = true
    }

})

function ResponsiveInicial()
{
    if (window.innerWidth <= 767)
        {
            inicio_texto.forEach((m) => {
                m.textContent = ""
            })
            ESTADO_SIDEBAR = false
            plantilla.style.gridTemplateColumns = `65px 1fr 1fr`
        }
}
ResponsiveInicial()

btn_sidebar.addEventListener("click", () => {

    if (ESTADO_SIDEBAR) {
        inicio_texto.forEach((m) => {
            m.textContent = ""
        })
        
        plantilla.style.gridTemplateColumns = `65px 1fr 1fr`

        ESTADO_SIDEBAR = false
    } else {
        inicio_texto.forEach((m, e) => {
            m.textContent = links_sidebar[e]
        })
        plantilla.style.gridTemplateColumns = `240px 1fr 1fr`

        ESTADO_SIDEBAR = true
    }
})  

btn_notificaciones.addEventListener("click", () => {

    if (ESTADO_NOTIFICACIONES) {
        NotificacionesOut()
    } else {
        NotificacionesIn()
        contenedor_notificaciones.scroll(0, 0)
        
        if (TOTAL_NOTIS > 0)
        {
            MarcarLeidas()
        }
    }

})


buscador.addEventListener("input", () => {

    if (buscador.value !== "") {
        limpiar_buscador.classList.remove("hidden")
    } else {
        limpiar_buscador.classList.add("hidden")
    }

})

buscador.addEventListener("keydown", (e) => {

    if (e.key === "Enter")
    {
        window.location.href = `./buscar.html?q=` + buscador.value
    }

})

const desplegable_crear = document.getElementById("desplegable_crear")
btn_crear_nuevo.addEventListener("click", () => {   
    
    if (ESTADO_CREAR_NUEVO) {
        MenuCrearNuevoOut()
    } else {
        MenuCrearNuevoIn()
    }
})

limpiar_buscador.addEventListener("click", () => {
    buscador.value = ""
    limpiar_buscador.classList.add("hidden")
})

buscador.addEventListener("focus", () => {

    if (recomendaciones.childElementCount > 0)
    {
        RecomendacionesIn()
    }
})


ConteoNotificacionesUsuario()
NotificacionesUsuario() 


function ConteoNotificacionesUsuario()
{

    if (localStorage.getItem("logged") !== null)
    {
        fetch(`https://proyectofinalapi-production-0ce0.up.railway.app/notificaciones/conteo`,
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
    
            
            if (datos.codigo === 200)
            {
                total_notis.textContent = datos.mensaje.notificaciones.total
                TOTAL_NOTIS = datos.mensaje.notificaciones.total
            
                if (datos.mensaje.notificaciones.total === 0) {
    
                    total_notis.classList.add("hidden")
    
                }
            }
            
        })
    } 
}

function MarcarLeidas()
{
    if (localStorage.getItem("logged") !== null)
        {
            fetch(`https://proyectofinalapi-production-0ce0.up.railway.app/notificaciones/marcarleidas`,
                {
                    method: 'PUT',
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
        
                
                if (datos.codigo === 200)
                {
                    total_notis.textContent = 0
                    total_notis.classList.add("hidden")
                    TOTAL_NOTIS = 0
                }
                
            })
        }
}

function NotificacionesUsuario(limit = 20, offset = 0)
{
    if (localStorage.getItem("logged"))
    {
        fetch(`https://proyectofinalapi-production-0ce0.up.railway.app/notificaciones/usuario`,
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        limit: limit,
                        offset: offset,
                    }
                ),
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
    
            if (datos.mensaje.length === 0)
            {
                let imgVacio = document.createElement("div")
                        imgVacio.innerHTML = `
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="160" viewBox="0 0 200 160" fill="none"><path d="M0 0h200v160H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M90.495 89.846A10 10 0 0 0 90.4 91.2c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6q0-.69-.095-1.354H132.8V111.2a2.4 2.4 0 0 1-2.4 2.4H69.6a2.4 2.4 0 0 1-2.4-2.4V89.846z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M110.4 89.6c0 5.744-4.656 10.4-10.4 10.4s-10.4-4.656-10.4-10.4q0-.28.014-.554H67.2l7.648-22.614a2.4 2.4 0 0 1 2.274-1.632h45.757c1.029 0 1.943.656 2.274 1.631l7.648 22.614h-22.414q.014.274.014.554" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M108.878 90.364c0 4.438-3.975 8.836-8.878 8.836s-8.878-4.398-8.878-8.836c0-.144.005-1.087.013-1.229H74.4l6.529-15.874C81.211 72.507 81.991 72 82.87 72h34.261c.878 0 1.659.507 1.941 1.261l6.528 15.874h-16.734c.008.142.013 1.085.013 1.229" fill="#E8F0FE"/><path clip-rule="evenodd" d="M68.2 89.21v21.19a1.4 1.4 0 0 0 1.4 1.4h60.8a1.4 1.4 0 0 0 1.4-1.4V89.21l-7.596-22.458a1.4 1.4 0 0 0-1.326-.951H77.122a1.4 1.4 0 0 0-1.326.952z" stroke="#1F64E7" stroke-width="2"/><path d="M78.4 88.8h10.196c1.501 0 1.501 1.055 1.501 1.6 0 5.302 4.397 9.6 9.821 9.6s9.821-4.298 9.821-9.6c0-.545 0-1.6 1.502-1.6H131.2m-58.741 0H74.4z" stroke="#1F64E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m120.08 46.642-8.88 9.963M99.28 43.2v13.405zM78.4 46.642l8.88 9.962z" stroke="#75A4FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <div class='font-Roboto text-xs text-center select-none'>
                            No hay notificaciones
                        </div>
                        ` 
        
                        contenedor_notificaciones.appendChild(imgVacio)
                        contenedor_notificaciones.classList.add("flex", "items-center", "justify-center", "flex-col", "py-5")
            } else {
    
    
                for(let i = 0; i < datos.mensaje.length; i++)
                    {
                        let nuevoContenedor = document.createElement("a")
                        
                        nuevoContenedor.href = "videos.html?ref=" + datos.mensaje[i].notificaciones.info.link.enlace
                        nuevoContenedor.classList.add("cursor-pointer")
            
                        let html = `
                        
                        <div id='noti_${i + limit}' class="flex px-2 py-4 flex-col transition-colors duration-150 hover:bg-slate-50">
                            <div class="flex gap-3">
                                <div class="w-[26px] h-[26px] min-w-[26px] min-h-[26px] rounded-full overflow-hidden">
                                    <img src="${datos.mensaje[i].notificaciones.contenido.video.usuario.media.avatar}" class="w-full h-full rounded-full" />
                                </div>
                                
                                <div class="flex flex-col w-full">
                                    <div class="flex w-full gap-2">
                                        <div class="line-clamp-3 w-[calc(100%-110px)] block">
                                        <p class="font-NotoSans text-xs text-gray-600 line-clamp-3">
                                            ${datos.mensaje[i].notificaciones.contenido.video.extra.titulo}
                                        </p>
                                        </div>
                                        <div class="w-[110px] h-[64px]">
                                            <img src="${datos.mensaje[i].notificaciones.contenido.video.media.miniatura}" class="object-cover w-full h-full rounded" />
                                        </div>
                                    </div>
                                    <div class="font-Inter text-[10px] text-gray-600">
                                        ${datos.mensaje[i].notificaciones.info.fecha}
                                    </div>
                                </div>
                            
                            </div>
            
                        </div>            
                        
                        `
            
                        if (i+1 < datos.mensaje.length) 
                        {
                            html += `
                            
                                <hr class="border-[#e6e6e6]" />
                            
                            `
                        }
            
                        nuevoContenedor.innerHTML = html
                       
                        contenedor_notificaciones.appendChild(nuevoContenedor)
            
                        if (contenedor_notificaciones.childElementCount === offset+20)
                        {
                            let ultimaNoti = document.getElementById("noti_" + String(i + limit))
                            
                            if (ultimaNoti)
                            {
                                ObservarElemento(ultimaNoti, contenedor_notificaciones, false, true, () => NotificacionesUsuario(limit, offset + 20))  
                            }
                        }
                       
                    }
    
            }
    
            
            
        })
    } else {

        let imgVacio = document.createElement("div")
                imgVacio.innerHTML = `
                
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="160" viewBox="0 0 200 160" fill="none"><path d="M0 0h200v160H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M90.495 89.846A10 10 0 0 0 90.4 91.2c0 5.302 4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6q0-.69-.095-1.354H132.8V111.2a2.4 2.4 0 0 1-2.4 2.4H69.6a2.4 2.4 0 0 1-2.4-2.4V89.846z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M110.4 89.6c0 5.744-4.656 10.4-10.4 10.4s-10.4-4.656-10.4-10.4q0-.28.014-.554H67.2l7.648-22.614a2.4 2.4 0 0 1 2.274-1.632h45.757c1.029 0 1.943.656 2.274 1.631l7.648 22.614h-22.414q.014.274.014.554" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M108.878 90.364c0 4.438-3.975 8.836-8.878 8.836s-8.878-4.398-8.878-8.836c0-.144.005-1.087.013-1.229H74.4l6.529-15.874C81.211 72.507 81.991 72 82.87 72h34.261c.878 0 1.659.507 1.941 1.261l6.528 15.874h-16.734c.008.142.013 1.085.013 1.229" fill="#E8F0FE"/><path clip-rule="evenodd" d="M68.2 89.21v21.19a1.4 1.4 0 0 0 1.4 1.4h60.8a1.4 1.4 0 0 0 1.4-1.4V89.21l-7.596-22.458a1.4 1.4 0 0 0-1.326-.951H77.122a1.4 1.4 0 0 0-1.326.952z" stroke="#1F64E7" stroke-width="2"/><path d="M78.4 88.8h10.196c1.501 0 1.501 1.055 1.501 1.6 0 5.302 4.397 9.6 9.821 9.6s9.821-4.298 9.821-9.6c0-.545 0-1.6 1.502-1.6H131.2m-58.741 0H74.4z" stroke="#1F64E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m120.08 46.642-8.88 9.963M99.28 43.2v13.405zM78.4 46.642l8.88 9.962z" stroke="#75A4FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <div class='font-Roboto text-xs text-center select-none'>
                    No hay notificaciones
                </div>
                ` 

                contenedor_notificaciones.appendChild(imgVacio)
                contenedor_notificaciones.classList.add("flex", "items-center", "justify-center", "flex-col", "py-5")
    }
}


const btn_menuusuario = document.getElementById("btn_menuusuario")
const menu_usuario = document.getElementById("menu_usuario")
btn_menuusuario?.addEventListener("click", () => {

    if (ESTADO_MENU) 
    {
        MenuUsuarioOut()
    } else {
        MenuUsuarioIn()
    }

})

const usuario_cerrar_sesion = document.getElementById("usuario_cerrar_sesion")

usuario_cerrar_sesion?.addEventListener("click", () => {

    localStorage.removeItem("logged")
    window.location.href = "./login.html";

})

const avatar_usuario = document.querySelectorAll(".avatar_usuario")

function DatosUsuario()
{

    if (!localStorage.getItem("logged")) return 

    avatar_usuario.forEach((e) => {
        e.classList.add("animate-pulse")
    })

    fetch(`https://proyectofinalapi-production-0ce0.up.railway.app/usuario/datos`,
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

        avatar_usuario.forEach(e => {
            e.src = `${datos.mensaje.usuario.imagen.avatar}`
            e.classList.remove("animate-pulse")    
        })
        IMAGEN_USUARIO = datos.mensaje.usuario.imagen.avatar
        usuario_nombre.textContent = `${datos.mensaje.usuario.nombre}` 
        usuario_nombre.title = `${datos.mensaje.usuario.nombre}` 
        usuario_nombre_canal.textContent = `${datos.mensaje.usuario.canal.nombre_canal}`
        usuario_nombre_canal.title = `${datos.mensaje.usuario.canal.nombre_canal}`
    })
}

DatosUsuario()  

function MostrarRecomendaciones()
{
    let array = localStorage.getItem("busquedas_recientes")
    if (array)
    {
        let arrayRecientes = JSON.parse(array)

        for (let v = 0; v < arrayRecientes.length; v++)
        {
            let nuevaRecomendacion = document.createElement("a")

            nuevaRecomendacion.setAttribute("class", "flex items-center gap-4 py-1.5 px-3 transition-colors duration-150 hover:bg-gray-100")
            nuevaRecomendacion.href =  "/buscar.html?q=" + arrayRecientes[v].contenido

            nuevaRecomendacion.innerHTML = `
            
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22.5 22.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history-icon lucide-history"><path d="M2.813 11.25A8.438 8.438 0 1 0 11.25 2.813a9.139 9.139 0 0 0 -6.318 2.568L2.813 7.5"/><path d="M2.813 2.813V7.5H7.5"/><path d="M11.25 6.563V11.25l3.75 1.875"/></svg>
                </div>
                <div class='font-Geist text-[13px] line-clamp-1 block truncate'>
                    ${arrayRecientes[v].contenido}
                </div>
            `

            recomendaciones.appendChild(nuevaRecomendacion)
        }
    }
    
}

MostrarRecomendaciones()
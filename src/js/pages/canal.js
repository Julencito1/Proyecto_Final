let parametros = new URLSearchParams(document.location.search)

let canal = parametros.get("ref")
let tab = parametros.get("tab") || "inicio"

let info_canal = document.getElementById("info_canal")
let contenedor_info_canal = document.getElementById("contenedor_info_canal")

let portada_canal = document.getElementById("portada_canal")
let nombre_usuario = document.getElementById("nombre_usuario")
let total_suscriptores = document.getElementById("total_suscriptores")
let total_videos = document.getElementById("total_videos")
let nombre_canal = document.getElementById("nombre_canal")

let avatar_usuario_canal = document.getElementById("avatar_usuario_canal")
let navegacion_tabs = document.getElementById("navegacion_tabs")
let contenedor_contenido_tabs = document.getElementById("contenedor_contenido_tabs")
let contenedor_ref = document.querySelector(".contenedor_ref")


var ESTADO_SUSCRIPCION = null
var ESTADO_ACTUAL = null
var ESTADO_SUBMENU_PRIVADO = false
var NOMBRE_USUARIO_CANAL = ""

if (!canal)
{
    window.location.href = '../404.php'
}


function CrearBotonSuscripcion()
{
    let containerBtnSus = document.createElement("div")
    let btnSus = document.createElement("button")
    btnSus.setAttribute("id", "btn_actual_status")
    btnSus.setAttribute("class", `rounded-full cursor-pointer px-4 py-1.5 font-Inter text-[13px] transition-opacity duration-150 ${ESTADO_SUSCRIPCION ? "bg-slate-100 text-black" : "text-white bg-black"} hover:opacity-80`)

    btnSus.textContent = `
        
            ${ESTADO_SUSCRIPCION ? "Suscrito" : "Suscribirme"}
     
    `
    containerBtnSus.appendChild(btnSus)
    contenedor_info_canal.appendChild(containerBtnSus)
    btnSus.addEventListener("click", () => {
        ESTADO_SUSCRIPCION ? QuitarSuscripcion() : Suscribirse()
    })  
}

function CrearTabPrivado()
{
    let privado = document.createElement("div")
    let privados_tab_btn = document.createElement("button")

    privados_tab_btn.setAttribute("id", "privados_tab")
    privados_tab_btn.setAttribute("class", "flex items-center gap-2 font-Inter text-trece")

    privados_tab_btn.innerHTML = `

    
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
        </div>
        <span class="line-clamp-1">Mis Videos Privados</span>
    
    `
    privado.appendChild(privados_tab_btn)
    navegacion_tabs.appendChild(privado)

    privados_tab_btn.addEventListener("click", () => {

        parametros.set("tab", "videos-privados")
        window.location.search = parametros
    })
    
    if (tab === "videos-privados")
    {
        sobre_mi_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        inicio_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        videos_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        privados_tab_btn.classList.add("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")

        VideosPrivadosCanal()
    }
       
}

function DatosCanal() {
    

    fetch(`http://localhost:8080/canales/datos`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                canal: canal,
            })
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

            let canal = datos.mensaje.canal
            document.title = `${canal.apodos.nombre_usuario} - NewTube`

            portada_canal.src = canal.media.portada
            avatar_usuario_canal.src = canal.media.usuario.avatar
            nombre_usuario.textContent = canal.apodos.nombre_usuario
            nombre_canal.textContent = canal.apodos.nombre_canal
            total_suscriptores.textContent = canal.info.estadisticas.suscriptores
            total_videos.textContent = canal.info.estadisticas.videos
            
            
            canal.suscriptor ? ESTADO_SUSCRIPCION = true : false
            NOMBRE_USUARIO_CANAL = canal.apodos.nombre_usuario

            if (!canal.actual)
            {
                CrearBotonSuscripcion()
                if (tab === "videos-privados")
                {
                    parametros.set("tab", "inicio")
                    window.location.search = parametros
                }
                ESTADO_ACTUAL = false
            } else {
                CrearTabPrivado()
                ESTADO_ACTUAL = true
            }
            
            
        } else if (datos.codigo === 404)
        {
            window.location.href = '../404.php'
        }

    })
    
}

DatosCanal()

function Suscribirse() {

    fetch(`http://localhost:8080/canal/agregar/suscribirse`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                canal: canal,
            })
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
            ESTADO_SUSCRIPCION = true
            EstilosBtnSuscripcion()
            let previo = total_suscriptores.textContent
            total_suscriptores.textContent = Number(previo) + 1
        }
    })
}

function QuitarSuscripcion()
{
   

        fetch(`http://localhost:8080/canal/quitar/suscribirse`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("logged")}`,
                },
                body: JSON.stringify({
                    canal: canal,
                })
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
                ESTADO_SUSCRIPCION = false
                EstilosBtnSuscripcion()
                let previo = total_suscriptores.textContent
                total_suscriptores.textContent = Number(previo) - 1
            }
        })
    
}





function EstilosBtnSuscripcion() 
{
    
    if (btn_actual_status)
    {
        if (ESTADO_SUSCRIPCION) { 
            btn_actual_status?.classList.add("bg-slate-100", "text-black") 
            btn_actual_status?.classList.remove("bg-black", "text-white")
        } 
        else { 
            btn_actual_status?.classList.add("bg-black", "text-white")
            btn_actual_status?.classList.remove("bg-slate-100", "text-black")
        }
    
        btn_actual_status.textContent = ESTADO_SUSCRIPCION ? "Suscrito" : "Suscribirme"
    }
    
}


let inicio_tab = document.getElementById("inicio_tab")
let videos_tab = document.getElementById("videos_tab")
let sobre_mi_tab = document.getElementById("sobre_mi_tab")


switch (tab)
{
    case "inicio":
        inicio_tab.classList.add("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        videos_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        sobre_mi_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        InicioCanal()
        break;

    case "videos":
        videos_tab.classList.add("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        inicio_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        sobre_mi_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        VideosCanal();
        break;

    case "sobre-mi":
        sobre_mi_tab.classList.add("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        inicio_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        videos_tab.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "font-medium")
        SobreMi()
        break;
}

inicio_tab.addEventListener("click", () => {

    parametros.set("tab", "inicio")
    window.location.search = parametros
})

videos_tab.addEventListener("click", () => {

    parametros.set("tab", "videos")
    window.location.search = parametros

})

sobre_mi_tab.addEventListener("click", () => {

    parametros.set("tab", "sobre-mi")
    window.location.search = parametros
})



function VideosCanal(limit = 20, offset = 0)
{
    contenedor_contenido_tabs.removeAttribute("id")
    const timeout = setTimeout(() => {

        let contenedorLoader = document.createElement("div")
        let loader = document.createElement("div")

    
        contenedorLoader.classList.add("flex", "flex-col", "gap-2", "items-center", "justify-center", "pt-20")
        contenedorLoader.setAttribute("id", "contenedor_loader")
        loader.classList.add("loader")
        contenedorLoader.appendChild(loader)
        contenedor_contenido_tabs.appendChild(contenedorLoader)
    }, 200)

    fetch(`http://localhost:8080/canal/videos`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                canal: canal,
                limit: limit,
                offset: offset,
            })
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
            if (datos.codigo === 200)
                {
                    if (datos.mensaje.respuesta.length === 0) {
                        let img_vacio = document.createElement("div")
                        img_vacio.classList.add("flex", "items-center", "justify-center", "pt-20")
        
                        img_vacio.innerHTML = `
                        
                        <div class='flex flex-col gap-2 items-center justify-center'>
                            <div>
                                <svg width="170" height="136" viewBox="0 0 170 136" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h170v136H0z"/><path clip-rule="evenodd" d="m58.669 94.603-2.768.389a2.72 2.72 0 0 1-3.072-2.315l-7.57-53.871a2.72 2.72 0 0 1 2.315-3.072l53.197-7.476a2.72 2.72 0 0 1 3.072 2.315l.651 4.629"/><path clip-rule="evenodd" d="m60.387 91.604-2.513.358a2.46 2.46 0 0 1-2.785-2.098l-6.797-48.909a2.48 2.48 0 0 1 2.106-2.793l48.305-6.865a2.46 2.46 0 0 1 2.786 2.098l.584 4.202 6.259 45.287c.208 1.504-.83 2.895-2.317 3.105l-.048.006z"/><path d="m58.669 94.603-2.768.389a2.72 2.72 0 0 1-3.072-2.315l-7.57-53.871a2.72 2.72 0 0 1 2.315-3.072l53.197-7.476a2.72 2.72 0 0 1 3.072 2.315l.651 4.629m.566 3.136.34 2.122" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path d="m69.934 39.467 53.426 5.616a1.87 1.87 0 0 1 1.664 2.055l-5.687 54.102a1.87 1.87 0 0 1-2.055 1.664l-53.426-5.615a1.87 1.87 0 0 1-1.664-2.055l5.687-54.102a1.87 1.87 0 0 1 2.055-1.664Z" stroke="#1F64E7" stroke-width="1.7"/><path clip-rule="evenodd" d="M72.551 47.093a2.04 2.04 0 0 1 2.242-1.816l42.605 4.478a2.04 2.04 0 0 1 1.816 2.242l-3.767 35.843a2.04 2.04 0 0 1-2.242 1.816L70.6 85.177a2.04 2.04 0 0 1-1.816-2.242z"/><path clip-rule="evenodd" d="m74.624 74.717 6.662-4.493a2.72 2.72 0 0 1 3.514.404l4.877 5.251a.68.68 0 0 0 .926.065l10.43-8.452a2.72 2.72 0 0 1 3.997.637l6.787 10.497.974 1.627-.467 5.524a.68.68 0 0 1-.753.619l-38.734-4.304a.68.68 0 0 1-.602-.738l.513-5.575z"/><path d="m74.705 46.123 42.605 4.478a1.19 1.19 0 0 1 1.059 1.307l-3.767 35.843a1.19 1.19 0 0 1-1.307 1.059L70.69 84.331a1.19 1.19 0 0 1-1.059-1.307l3.767-35.843a1.19 1.19 0 0 1 1.308-1.059Z" stroke="#1F64E7" stroke-width="1.7"/><path fill="#F3F7FF" stroke="#1F64E7" stroke-width="1.7" d="M88.68 56.783a4.08 4.08 0 0 1-4.484 3.631 4.08 4.08 0 0 1-3.631-4.485 4.08 4.08 0 0 1 8.115.853z"/><path d="m73.256 75.769 8.03-5.545a2.72 2.72 0 0 1 3.514.404l4.877 5.251a.68.68 0 0 0 .926.065l10.43-8.452a2.72 2.72 0 0 1 3.997.637l7.523 11.938" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/></svg>
                            </div>
                            <div class='font-Inter text-trece'>
                                Este canal no tiene videos publicados
                            </div>
                        </div>
                        `
        
                        contenedor_contenido_tabs.appendChild(img_vacio)
                    } else {
        
                        
                        contenedor_contenido_tabs.setAttribute("id", "contenedor_videos")
                        contenedor_contenido_tabs.classList.add("pt-5")
        
                        datos.mensaje.respuesta.forEach((e, m) => {
                            
                            let nuevoVideo = document.createElement("div")
                            nuevoVideo.innerHTML = `
                            
                            <a href="./videos.php?ref=${e.canal.videos.link.ruta}" id="video_${offset + (m+1)}" class='flex flex-col gap-3'>
                            <div class='relative w-full overflow-hidden'>
                                <img class='rounded-md object-cover w-full h-[130px]' src="${e.canal.videos.media.miniatura}" />
                                <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-0 mb-1 bottom-0 mr-1'>
                                <div class='text-white select-none font-Inter text-[10px]'>${e.canal.videos.estadisticas.duracion}</div>
                                </div>
                            </div>
                            <div class='flex gap-6'>
                                <div class='flex flex-col gap-2'>
                                <div title="${e.canal.videos.contenido.titulo}" class='font-Roboto  text-[13px] line-clamp-2'>
                                ${e.canal.videos.contenido.titulo}
                                </div>
                                <div class='flex flex-col gap-1'>
                                    <div class='font-Roboto text-[#666] text-[11px] line-clamp-1'>
                                    ${e.canal.videos.estadisticas.visitas} visualizaciones · ${e.canal.videos.estadisticas.fecha.fecha_creacion}
                                    </div>
                                </div>
                                </div>
                                <div class='relative ml-auto' id='contenedor_sp_${m + offset}'>
                                    <button onclick="MostrarMenuSeleccionadoVideosPrivados(${m + offset}); event.stopPropagation(); event.preventDefault();" id='btn_privado_${m + offset}' class="p-2 z-40 rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#e6e6e6]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                    </button>
                                    <div id='submenu_${m + offset}' class='absolute flex flex-col w-44 p-1 rounded-md bg-white z-20 max-xs:right-0 shadow-md border hidden origin-top-left max-xs:origin-top-right'>
                                        
                                        ${ESTADO_ACTUAL ? `
                                            
                                            <button onclick="OcultarVideo('${e.canal.videos.link.ruta}'); event.stopPropagation(); event.preventDefault();" class='flex items-center gap-2 font-Inter text-xs w-full text-left rounded-md transition-colors duration-150 p-1.5 hover:bg-gray-100'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M9.391 4.441a9.4 9.4 0 0 1 9.804 5.753.88.88 0 0 1 0 .609 9.5 9.5 0 0 1-1.264 2.179m-5.608-.594a2.625 2.625 0 0 1-3.712-3.712"/><path d="M15.294 15.312a9.406 9.406 0 0 1-13.49-4.507.88.88 0 0 1 0-.609 9.4 9.4 0 0 1 3.89-4.5M1.75 1.75l17.5 17.5"/></svg>
                                            </div>
                                            Ocultar video
                                        </button>
                                            
                                            ` : `
                                            
                                        `}
                                        ${e.canal.videos.estadisticas.guardado ? 
                                            `
                                            <button onclick="QuitarVideoGuardados('${e.canal.videos.link.ruta}'); event.stopPropagation(); event.preventDefault();" class='flex items-center gap-2 font-Inter text-xs w-full text-left rounded-md transition-colors duration-150 p-1.5 hover:bg-gray-100'>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-minus-icon lucide-bookmark-minus"><path d="m16.625 18.375 -6.125 -3.5 -6.125 3.5V4.375a1.75 1.75 0 0 1 1.75 -1.75h8.75a1.75 1.75 0 0 1 1.75 1.75z"/><path x1="15" x2="9" y1="10" y2="10" d="M13.125 8.75L7.875 8.75"/></svg>
                                                </div>
                                                Quitar de guardados
                                            </button>
                                            ` 
                                            : `
                                            <button onclick="GuardarVideo('${e.canal.videos.link.ruta}'); event.stopPropagation(); event.preventDefault();" class='flex items-center gap-2 font-Inter text-xs w-full text-left rounded-md transition-colors duration-150 p-1.5 hover:bg-gray-100'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-icon lucide-bookmark"><path d="m16.625 18.375-6.125-3.5-6.125 3.5v-14a1.75 1.75 0 0 1 1.75-1.75h8.75a1.75 1.75 0 0 1 1.75 1.75z"/></svg>
                                            </div>
                                            Guardar video
                                        </button>
                                        `}
                                        <button onclick="navigator.clipboard.writeText('hola'); event.stopPropagation(); event.preventDefault();" class='flex items-center gap-2 font-Inter text-xs w-full text-left rounded-md transition-colors duration-150 p-1.5 hover:bg-gray-100'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2-icon lucide-share-2"><path cx="18" cy="5" r="3" d="M18.375 4.375A2.625 2.625 0 0 1 15.75 7A2.625 2.625 0 0 1 13.125 4.375A2.625 2.625 0 0 1 18.375 4.375z"/><path cx="6" cy="12" r="3" d="M7.875 10.5A2.625 2.625 0 0 1 5.25 13.125A2.625 2.625 0 0 1 2.625 10.5A2.625 2.625 0 0 1 7.875 10.5z"/><path cx="18" cy="19" r="3" d="M18.375 16.625A2.625 2.625 0 0 1 15.75 19.25A2.625 2.625 0 0 1 13.125 16.625A2.625 2.625 0 0 1 18.375 16.625z"/><path x1="8.59" x2="15.42" y1="13.51" y2="17.49" d="M7.516 11.821L13.492 15.304"/><path x1="15.41" x2="8.59" y1="6.51" y2="10.49" d="M13.484 5.696L7.516 9.179"/></svg>
                                            </div>
                                            Compartir
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </a>
                            `

                            contenedor_contenido_tabs.appendChild(nuevoVideo)
                            
                            if (contenedor_contenido_tabs.childElementCount === offset+20 && datos.mensaje.datos.pag)
                                {
                                    
                                    let ultimoVideo = document.getElementById("video_" + String(offset + (m+1)))
                                    
                                    if (ultimoVideo)
                                    {
                                        ObservarElemento(ultimoVideo, contenedor_ref, false, true, () => VideosCanal(limit, offset + 20))  
                                    }
                                }
                        })
        
                        

                        
                    }
                }
                
        }
        catch(error)
            {
                console.error(error)
            }
        finally 
            {
                clearTimeout(timeout)
                if (document.getElementById("contenedor_loader")) {
                    contenedor_contenido_tabs.removeChild(document.getElementById("contenedor_loader")) 
                }    
            }
    })
}

function SobreMi()
{

    const timeout = setTimeout(() => {

        let contenedorLoader = document.createElement("div")
        let loader = document.createElement("div")

    
        contenedorLoader.classList.add("flex", "flex-col", "gap-2", "items-center", "justify-center", "pt-20")
        contenedorLoader.setAttribute("id", "contenedor_loader")
        loader.classList.add("loader")
        contenedorLoader.appendChild(loader)
        contenedor_contenido_tabs.appendChild(contenedorLoader)
    }, 200)

    fetch(`http://localhost:8080/canal/sobremi`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                canal: canal,
            })
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
            if (datos.codigo === 200)
                {
                    contenedor_contenido_tabs.innerHTML = ''
                    let infoSobreMi = document.createElement("div")
        
                    infoSobreMi.classList.add("flex", "flex-col", "gap-10", "pt-5")
        
                    infoSobreMi.innerHTML = `
                    
                    
                     <div class='flex flex-col gap-2'>
                        <div class='font-Inter font-medium text-trece flex items-center gap-2'>
                            Breve Descripción ${ESTADO_ACTUAL ? (
                                `<div>·</div> 
                                <div>
                                    <button id='btn_editar_descripcion' class='rounded-full p-1.5 transition-colors duration-150 hover:bg-gray-100'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M18.527 5.961a.875.875 0 0 0-3.488-3.489L3.362 14.152a1.75 1.75 0 0 0-.438.726l-1.156 3.808a.438.438 0 0 0 .545.544l3.809-1.155a1.75 1.75 0 0 0 .726-.435zm-5.402-1.586 3.5 3.5"/></svg>
                                    </button>
                                </div>
                                `
                            ) : (
                                ``
                            )}
                        </div>
                        <div id='descripcion_canal_s' class='font-Inter text-xs'>
                        ${datos.mensaje.canal.info.descripcion === null || datos.mensaje.canal.info.descripcion.trim().length === 0 ? "<i>Este canal no tiene ninguna descripción.</i>" : datos.mensaje.canal.info.descripcion}
                        </div>
                    </div>
                    <div class='flex flex-col gap-2'>
                        <div class='flex items-center gap-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><path d="M7 1.75v3.5m7-3.5v3.5M4.375 3.5h12.25a1.75 1.75 0 0 1 1.75 1.75V17.5a1.75 1.75 0 0 1-1.75 1.75H4.375a1.75 1.75 0 0 1-1.75-1.75V5.25a1.75 1.75 0 0 1 1.75-1.75m-1.75 5.25h15.75"/></svg>
                        </div>
                        <div class='font-Inter text-xs'>
                        Se unió en ${datos.mensaje.canal.info.fechas.fecha_registro}
                        </div>
                        </div>
                        <div class='flex items-center gap-2'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth-icon lucide-earth"><path d="M18.848 13.125h-3.973a1.75 1.75 0 0 0-1.75 1.75v3.973m-7-15.926v1.453A2.625 2.625 0 0 0 8.75 7a1.75 1.75 0 0 1 1.75 1.75c0 .963.787 1.75 1.75 1.75A1.75 1.75 0 0 0 14 8.75c0-.963.787-1.75 1.75-1.75h2.774M9.625 19.206V15.75A1.75 1.75 0 0 0 7.875 14a1.75 1.75 0 0 1-1.75-1.75v-.875a1.75 1.75 0 0 0-1.75-1.75H1.794"/><path d="M19.25 10.5a8.75 8.75 0 0 1-8.75 8.75 8.75 8.75 0 0 1-8.75-8.75 8.75 8.75 0 0 1 17.5 0"/></svg>
                            </div>
                            <div class='font-Inter text-xs'>
                            ${datos.mensaje.canal.info.localizacion.pais === null ? "No establecido" : datos.mensaje.canal.info.localizacion.pais}
                            </div>
                        </div>
                    </div>
                    `
        
                    contenedor_contenido_tabs.appendChild(infoSobreMi)

                    let btn_editar_descripcion = document.getElementById("btn_editar_descripcion")
                    let descripcion_canal_s = document.getElementById("descripcion_canal_s")

                    btn_editar_descripcion.addEventListener("click", () => {
                        
                        descripcion_canal_s.innerHTML = `
                        
                            <div class='flex flex-col gap-3'>
                                <div>
                                    <input autocomplete='off' spellcheck='false' placeholder="Descripción..." id="actualiza_descripcion_canal" type="text" class='w-full min-h-[30px] p-2 outline-none border rounded-md text-left' maxlength="255" value="${datos.mensaje.canal.info.descripcion === null ? "" : datos.mensaje.canal.info.descripcion.trim()}" />
                                </div>
                                <div class='ml-auto flex items-center gap-2'>
                                    <div>
                                        <button onclick='CancelarEditarDescripcion("${datos.mensaje.canal.info.descripcion}")' class='rounded-full px-3 py-1.5 font-Geist text-xs transition-colors duration-150 hover:bg-gray-100'>
                                            Cancelar
                                        </button>
                                    </div>

                                    <div>
                                        <button onclick='ActualizarDescripcionCanal()' class='rounded-full px-3 py-1.5 bg-[#065FD4] text-white font-Geist text-xs transition-colors duration-150 hover:bg-[#0659c6]'>
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        
                        `

                    })
        }
        }
        catch(error) {

            console.error(error)
        }
        finally {
            clearTimeout(timeout)
                if (document.getElementById("contenedor_loader")) {
                    contenedor_contenido_tabs.removeChild(document.getElementById("contenedor_loader")) 
                }    
        }
    })
}

function CancelarEditarDescripcion(datos)
{
    let descripcion_canal_s = document.getElementById("descripcion_canal_s")

    descripcion_canal_s.innerHTML = `
    
    ${datos === null || datos.trim().length === 0 ? "<i>Este canal no tiene ninguna descripción.</i>" : datos}
    `
}

function ActualizarDescripcionCanal()
{
    let actualiza_descripcion_canal = document.getElementById("actualiza_descripcion_canal")

    fetch("http://localhost:8080/canal/actualizar/descripcion",
        {
            method: 'PUT',
            body: JSON.stringify({
                canal: canal,
                descripcion: actualiza_descripcion_canal.value.trim()
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        if (datos.codigo === 200)
        {
            SobreMi()
        }

    })


}

function VideosPrivadosCanal(limit = 20, offset = 0)
{
    contenedor_contenido_tabs.removeAttribute("id")
    const timeout = setTimeout(() => {

        let contenedorLoader = document.createElement("div")
        let loader = document.createElement("div")

    
        contenedorLoader.classList.add("flex", "flex-col", "gap-2", "items-center", "justify-center", "pt-20")
        contenedorLoader.setAttribute("id", "contenedor_loader")
        loader.classList.add("loader")
        contenedorLoader.appendChild(loader)
        contenedor_contenido_tabs.appendChild(contenedorLoader)
    }, 200)

    fetch(`http://localhost:8080/canal/videos/privados`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                canal: canal,
                limit: limit,
                offset: offset,
            })
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
            if (datos.codigo === 200)
                {
                    let privados_tab_btn = document.getElementById("privados_tab")
                    
                    privados_tab_btn.innerHTML = ` <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                    </div>
                    
                    <span class="line-clamp-1">Mis Videos Privados (${datos.mensaje.datos.total})</span>`

                    if (datos.mensaje.respuesta.length === 0) {
                        let img_vacio = document.createElement("div")
                        img_vacio.classList.add("flex", "items-center", "justify-center", "pt-20")
        
                        img_vacio.innerHTML = `
                        
                        <div class='flex flex-col gap-2 items-center justify-center'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path clip-rule="evenodd" d="M42.84 91.12h61.88q.526-.001 1.02-.109.494.109 1.02.109h35.36a4.76 4.76 0 1 0 0-9.52h-4.08a4.76 4.76 0 1 1 0-9.52h12.92a4.76 4.76 0 1 0 0-9.52H136a4.76 4.76 0 1 0 0-9.52H92.48a4.76 4.76 0 1 0 0-9.52H53.72a4.76 4.76 0 1 0 0 9.52h-27.2a4.76 4.76 0 1 0 0 9.52h17a4.76 4.76 0 1 1 0 9.52h-27.2a4.76 4.76 0 1 0 0 9.52h26.52a4.76 4.76 0 1 0 0 9.52m110.84 0a4.76 4.76 0 1 0 0-9.52 4.76 4.76 0 0 0 0 9.52"/><path clip-rule="evenodd" d="M62.56 95.2c-8.262 0-14.96-6.546-14.96-14.62s6.698-14.62 14.96-14.62q.528 0 1.045.035a23 23 0 0 1-.365-4.115c0-12.769 10.351-23.12 23.12-23.12 10.194 0 18.847 6.597 21.923 15.756a21 21 0 0 1 2.217-.116c11.455 0 20.74 9.134 20.74 20.4 0 10.704-8.381 19.534-19.04 20.385v.015H73.785m-3.068 0h-4.736z"/><path d="M62.56 96.05a.85.85 0 0 0 0-1.7zm1.045-30.055-.057.848 1.086.073-.192-1.072zm44.677-11.48-.806.271.216.646.678-.071zm3.918 40.671-.067-.847-.783.063v.785zm0 .015v.85h.85V95.2zm-38.415-.85a.85.85 0 1 0 0 1.7zM62.56 95.2v-.85c-7.811 0-14.11-6.183-14.11-13.77h-1.7c0 8.562 7.097 15.47 15.81 15.47zM47.6 80.58h.85c0-7.587 6.299-13.77 14.11-13.77v-1.7c-8.713 0-15.81 6.908-15.81 15.47zm14.96-14.62v.85q.498 0 .988.033l.057-.848.057-.849a16 16 0 0 0-1.102-.036zm1.045.035.836-.15a22.4 22.4 0 0 1-.351-3.965h-1.7c0 1.455.129 2.88.379 4.266zm-.365-4.115h.85c0-12.299 9.971-22.27 22.27-22.27v-1.7c-13.238 0-23.97 10.732-23.97 23.97zm23.12-23.12v.85c9.818 0 18.154 6.354 21.117 15.176l.806-.27.806-.271C105.9 44.751 96.93 37.91 86.36 37.91zm21.923 15.756.088.845a20 20 0 0 1 2.129-.111v-1.7q-1.169.001-2.306.12zm2.217-.116v.85c10.998 0 19.89 8.766 19.89 19.55h1.7c0-11.749-9.68-21.25-21.59-21.25zm20.74 20.4h-.85c0 10.248-8.027 18.722-18.257 19.538l.067.847.067.847c11.089-.885 19.823-10.073 19.823-21.232zM112.2 95.185h-.85v.015h1.7v-.015zm0 .015v-.85H73.785v1.7H112.2zm-41.483 0v-.85h-4.736v1.7h4.736zm-4.736 0v.85h4.736v-1.7h-4.736z" fill="#1F64E7"/><path clip-rule="evenodd" d="M79.296 43.753c0 21.912 19.734 39.967 45.144 42.405-3.184 3.915-8.102 6.572-13.704 6.989v.013H65.105c-5.536 0-14.785-2.332-14.785-12.547s7.19-12.547 14.785-12.547q.485 0 .961.03c-.22-1.146-.259-2.328-.336-3.532-.515-8.135 3.033-18.387 13.578-21.724q-.012.456-.012.913"/><path d="M93.16 46.92a12.95 12.95 0 0 1 9.139 9.039" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/><path d="M73.44 69.02c0 2.441 2.131 4.42 4.76 4.42s4.76-1.979 4.76-4.42m10.2 0c0 2.441 2.131 4.42 4.76 4.42s4.76-1.979 4.76-4.42M82.96 81.6h9.86" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M47.026 40.999h-8.123v1.616h5.745l-6.223 7.54v1.525h8.752v-1.616h-6.373l6.223-7.645zm9.12 10.393h-5.908v1.175h4.178l-4.526 5.484v1.109h6.365v-1.175H51.62l4.526-5.56z" fill="#75A4FE"/></svg>
                            </div>
                            <div class='font-Inter text-trece'>
                                No tienes videos privados.
                            </div>
                        </div>
                        `
        
                        contenedor_contenido_tabs.appendChild(img_vacio)
                    } else {
        
                        
                        contenedor_contenido_tabs.setAttribute("id", "contenedor_videos")
                        contenedor_contenido_tabs.classList.add("pt-5")
        
                        datos.mensaje.respuesta.forEach((e, m) => {
                          
                            let nuevoVideo = document.createElement("div")
                            nuevoVideo.innerHTML = `
                            
                            <div  id="video_${offset + (m+1)}" class='flex flex-col gap-3'>
                            <div class='relative w-full overflow-hidden'>
                                <img class='rounded-md object-cover w-full h-[130px]' src="${e.canal.videos.media.miniatura}" />
                                <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-0 mb-1 bottom-0 mr-1'>
                                <div class='text-white select-none font-Inter text-[10px]'>${e.canal.videos.estadisticas.duracion}</div>
                                </div>
                            </div>
                            <div class='flex gap-6'>
                                <div class='flex flex-col gap-2'>
                                <div title="${e.canal.videos.contenido.titulo}" class='font-Roboto  text-[13px] line-clamp-2'>
                                ${e.canal.videos.contenido.titulo}
                                </div>
                                <div class='flex flex-col gap-1'>
                                    <div class='font-Roboto text-[#666] text-[11px] line-clamp-1'>
                                    ${e.canal.videos.estadisticas.visitas} visualizaciones · ${e.canal.videos.estadisticas.fecha.fecha_creacion}
                                    </div>
                                </div>
                                </div>
                                <div class='relative ml-auto' id='contenedor_sp_${m + offset}'>
                                    <button onclick='MostrarMenuSeleccionadoVideosPrivados(${m + offset})' id='btn_privado_${m + offset}' class="p-2 rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#e6e6e6]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                    </button>
                                    <div id='submenu_${m + offset}' class='absolute flex flex-col w-36 p-1 rounded-md bg-white z-20 shadow-md border hidden max-xs:right-0 origin-top-left max-xs:origin-top-right'>
                                        <button onclick='HacerPublicoVideo("${e.canal.videos.link.ruta}")' class='flex items-center gap-2 font-Inter text-xs w-full text-left rounded-md transition-colors duration-150 p-1.5 hover:bg-gray-100'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share-icon lucide-share"><path d="M3.5 10.5v7a1.75 1.75 0 0 0 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75 -1.75v-7"/><path points="16 6 12 2 8 6" d="M14 5.25L10.5 1.75L7 5.25"/><path x1="12" x2="12" y1="2" y2="15" d="M10.5 1.75L10.5 13.125"/></svg>
                                        </div>
                                        Publicar video
                                        </button>

                                        <button onclick='BorrarVideo("${e.canal.videos.link.ruta}")' class='flex items-center gap-2 font-Inter text-xs w-full text-left rounded-md transition-colors duration-150 p-1.5 hover:bg-gray-100'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M2.625 5.25h15.75"/><path d="M16.625 5.25v12.25c0 0.875 -0.875 1.75 -1.75 1.75H6.125c-0.875 0 -1.75 -0.875 -1.75 -1.75V5.25"/><path d="M7 5.25V3.5c0 -0.875 0.875 -1.75 1.75 -1.75h3.5c0.875 0 1.75 0.875 1.75 1.75v1.75"/><path x1="10" x2="10" y1="11" y2="17" d="M8.75 9.625L8.75 14.875"/><path x1="14" x2="14" y1="11" y2="17" d="M12.25 9.625L12.25 14.875"/></svg>
                                        </div>
                                        Borrar video
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                            `

                            contenedor_contenido_tabs.appendChild(nuevoVideo)
                            
                            if (contenedor_contenido_tabs.childElementCount === offset+20 && datos.mensaje.datos.pag)
                                {
                                    
                                    let ultimoVideo = document.getElementById("video_" + String(offset + (m+1)))
                                    
                                    if (ultimoVideo)
                                    {
                                        ObservarElemento(ultimoVideo, contenedor_ref, false, true, () => VideosPrivadosCanal(limit, offset + 20))  
                                    }
                                }
                            })
    
                    }
                }
                
        }
        catch(error)
            {
                console.error(error)
            }
        finally 
            {
                clearTimeout(timeout)
                if (document.getElementById("contenedor_loader")) {
                    contenedor_contenido_tabs.removeChild(document.getElementById("contenedor_loader")) 
                }    
            }
    })
}


let menuActivadoPrevio = ""

function MostrarMenuSeleccionadoVideosPrivados(posicion)
{
    let submenu = document.getElementById("submenu_" + String(posicion))
    
    if (menuActivadoPrevio !== "" && ESTADO_SUBMENU_PRIVADO)
    {
        SubMenuPrivadoOut(menuActivadoPrevio)
    } else {
        if (ESTADO_SUBMENU_PRIVADO)
            {   
               
                SubMenuPrivadoOut(submenu)
            } else {
        
                SubMenuPrivadoIn(submenu)
                
                menuActivadoPrevio = submenu
            }
    }
    
}

function HacerPublicoVideo(identificador)
{
    if (!localStorage.getItem("logged") || !identificador || identificador === "") return

    fetch("http://localhost:8080/canal/videos/publicar",
        {
            method: 'PUT',
            body: JSON.stringify({
                canal: canal,
                identificador: identificador
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        if (datos.codigo === 200)
        {
            contenedor_contenido_tabs.innerHTML = ''
            ESTADO_SUBMENU_PRIVADO = false
            VideosPrivadosCanal()
        }

    })

}

function OcultarVideo(identificador)
{
    if (!localStorage.getItem("logged") || !identificador || identificador === "") return

    fetch("http://localhost:8080/canal/videos/ocultar",
        {
            method: 'PUT',
            body: JSON.stringify({
                canal: canal,
                identificador: identificador
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        if (datos.codigo === 200)
        {
            contenedor_contenido_tabs.innerHTML = ''
            ESTADO_SUBMENU_PRIVADO = false
            VideosCanal()
        }

    })

}

function BorrarVideo(identificador)
{
    if (!localStorage.getItem("logged") || !identificador || identificador === "") return

    fetch("http://localhost:8080/canal/videos/borrar",
        {
            method: 'DELETE',
            body: JSON.stringify({
                canal: canal,
                identificador: identificador
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        if (datos.codigo === 200)
        {
            contenedor_contenido_tabs.innerHTML = ''
            ESTADO_SUBMENU_PRIVADO = false
            VideosPrivadosCanal()
        }

    })
}

function GuardarVideo(identificador)
{
    if (!localStorage.getItem("logged") || !identificador || identificador === "") return

    fetch("http://localhost:8080/canal/videos/guardar",
        {
            method: 'POST',
            body: JSON.stringify({
                canal: canal,
                identificador: identificador
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        if (datos.codigo === 200)
        {
            contenedor_contenido_tabs.innerHTML = ''
            ESTADO_SUBMENU_PRIVADO = false
            VideosCanal()
        }

    })
}

function QuitarVideoGuardados(identificador)
{
    if (!localStorage.getItem("logged") || !identificador || identificador === "") return

    fetch("http://localhost:8080/canal/videos/quitar",
        {
            method: 'POST',
            body: JSON.stringify({
                canal: canal,
                identificador: identificador
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        if (datos.codigo === 200)
        {
            contenedor_contenido_tabs.innerHTML = ''
            ESTADO_SUBMENU_PRIVADO = false
            VideosCanal()
        }

    })
}

function InicioCanal()
{
    if (!localStorage.getItem("logged")) return

    contenedor_contenido_tabs.removeAttribute("id")
    const timeout = setTimeout(() => {

        let contenedorLoader = document.createElement("div")
        let loader = document.createElement("div")

    
        contenedorLoader.classList.add("flex", "flex-col", "gap-2", "items-center", "justify-center", "pt-20")
        contenedorLoader.setAttribute("id", "contenedor_loader")
        loader.classList.add("loader")
        contenedorLoader.appendChild(loader)
        contenedor_contenido_tabs.appendChild(contenedorLoader)
    }, 200)

    fetch("http://localhost:8080/canal/videos/inicio",
        {
            method: 'POST',
            body: JSON.stringify({
                canal: canal,
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        try {
            if (datos.codigo === 200)
                {
                    if (datos.mensaje.respuesta.contenido.length === 0 && datos.mensaje.respuesta.suscripciones.length === 0) {
                        let img_vacio = document.createElement("div")
                        img_vacio.classList.add("flex", "items-center", "justify-center", "pt-20")
        
                        img_vacio.innerHTML = `
                        
                        <div class='flex flex-col gap-2 items-center justify-center'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M62.56 95.2c-8.262 0-14.96-6.546-14.96-14.62s6.698-14.62 14.96-14.62q.528 0 1.045.035a23 23 0 0 1-.365-4.115c0-12.769 10.351-23.12 23.12-23.12 10.194 0 18.847 6.597 21.923 15.756a21 21 0 0 1 2.217-.116c11.455 0 20.74 9.134 20.74 20.4 0 10.704-8.381 19.534-19.04 20.385v.015zm8.157 0h-4.736z" fill="#fff"/><path d="M70.717 95.2h-4.736m-3.421 0c-8.262 0-14.96-6.546-14.96-14.62s6.698-14.62 14.96-14.62q.528 0 1.045.035a23 23 0 0 1-.365-4.115c0-12.769 10.351-23.12 23.12-23.12 10.194 0 18.847 6.597 21.923 15.756a21 21 0 0 1 2.217-.116c11.455 0 20.74 9.134 20.74 20.4 0 10.704-8.381 19.534-19.04 20.385v.015z" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M79.296 43.753c0 21.912 19.734 39.967 45.144 42.405-3.184 3.915-8.102 6.572-13.704 6.989v.013H65.105c-5.536 0-14.785-2.332-14.785-12.547s7.19-12.547 14.785-12.547q.485 0 .961.03c-.22-1.146-.259-2.328-.336-3.532-.515-8.135 3.033-18.387 13.578-21.724q-.012.456-.012.913m7.143 34.282c-2.066 0-3.741 1.655-3.741 3.697s1.676 3.697 3.741 3.697c2.067 0 3.741-1.655 3.741-3.697s-1.675-3.697-3.741-3.697" fill="#E8F0FE"/><path d="M86.7 85.68a3.74 3.74 0 1 0 0-7.48 3.74 3.74 0 1 0 0 7.48Z" stroke="#1F64E7" stroke-width="1.7"/><path d="m76.16 74.12 4.76-3.735-4.76-3.556m21.08 7.291-4.76-3.735 4.76-3.556" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M93.16 45.56a12.95 12.95 0 0 1 9.139 9.039" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/><path d="M107.44 34a2.04 2.04 0 1 0 0-4.08 2.04 2.04 0 0 0 0 4.08Z" stroke="#75A4FE" stroke-width="1.36"/><path d="M128.52 44.88a2.04 2.04 0 1 0 0-4.08 2.04 2.04 0 0 0 0 4.08" fill="#75A4FE"/><path d="m112.715 39.275 5.684 5.684m.086-5.684-5.684 5.684zm-69.93 12.13 4.08 4.08m0-4.08-4.08 4.08z" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M57.8 46.92a2.04 2.04 0 1 0 0-4.08 2.04 2.04 0 0 0 0 4.08" fill="#75A4FE"/></svg>
                            </div>
                            <div class='font-Inter text-trece'>
                                ${ESTADO_ACTUAL ? "Publica videos o suscribete a canales para modificar esta sección" : "Este canal está descubriendo NewTube"}
                            </div>
                        </div>
                        `
        
                        contenedor_contenido_tabs.appendChild(img_vacio)
                    } else {
                        
                        let contenedorTopVideos = document.createElement("div")
                        let topvideos = document.createElement("div")
                        let cabeceraInicio = document.createElement("div")

                        let separador = document.createElement("hr")

                        let suscripcionesCanal = document.createElement("div")
                        let cabeceraSuscripciones = document.createElement("div")
                        let infoCanales = document.createElement("div")

                        topvideos.setAttribute("id", "contenedor_videos")
                        contenedor_contenido_tabs.classList.add("pt-5", "flex", "flex-col", "gap-5")
                        contenedorTopVideos.classList.add("flex", "flex-col", "gap-5")
                        suscripcionesCanal.classList.add("flex", "flex-col", "gap-5")
                        infoCanales.classList.add("flex", "items-center", "gap-5")
                        

                        cabeceraInicio.innerHTML = `
                        
                            <h2 class='font-Inter font-semibold'>${ESTADO_ACTUAL !== null && ESTADO_ACTUAL ? "Tus vídeos más vistos" : "Videos que podrían gustarte"}</h2> 
                        `

                        cabeceraSuscripciones.innerHTML = `

                            <h2 class='font-Inter font-semibold'>${ESTADO_ACTUAL !== null && ESTADO_ACTUAL ? "Canales que sigues" : `Canales que ${NOMBRE_USUARIO_CANAL} sigue`}</h2> 
                        `

                        contenedorTopVideos.appendChild(cabeceraInicio)
                        suscripcionesCanal.appendChild(cabeceraSuscripciones)
        
                        datos.mensaje.respuesta.contenido.forEach((e, m) => {
                            
                            let nuevoVideo = document.createElement("div")
                            nuevoVideo.innerHTML = `
                            
                            <a href="./videos.php?ref=${e.canal.videos.link.ruta}" aria-label="Link Video" id="video_${m+1}" class='flex flex-col gap-3'>
                            <div class='relative w-full overflow-hidden'>
                                <img class='rounded-md object-cover w-full h-[130px]' src="${e.canal.videos.media.miniatura}" />
                                <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-0 mb-1 bottom-0 mr-1'>
                                <div class='text-white select-none font-Inter text-[10px]'>${e.canal.videos.estadisticas.duracion}</div>
                                </div>
                            </div>
                            <div class='flex gap-6'>
                                <div class='flex flex-col gap-2'>
                                <div title="${e.canal.videos.contenido.titulo}" class='font-Roboto  text-[13px] line-clamp-2'>
                                ${e.canal.videos.contenido.titulo}
                                </div>
                                <div class='flex flex-col gap-1'>
                                    <div class='font-Roboto text-[#666] text-[11px] line-clamp-1'>
                                    ${e.canal.videos.estadisticas.visitas} visualizaciones · ${e.canal.videos.estadisticas.fecha.fecha_creacion}
                                    </div>
                                </div>
                                </div>
                            </div>
                            </a>
                            `

                            topvideos.appendChild(nuevoVideo)
                            
                            
                        })
                        contenedorTopVideos.appendChild(topvideos)

                        datos.mensaje.respuesta.suscripciones.forEach((e, m) => {
                            
                            let nuevoCanalSiguiendo = document.createElement("div")
                            nuevoCanalSiguiendo.innerHTML = `
                            
                            <a href='./canal.php?ref=${e.canal.nombre_canal}' class='flex flex-col gap-5'>
                                <div>
                                    <img src='${e.media.avatar}' class='h-[70px] w-[70px] rounded-full overflow-hidden'>
                                </div>
                            </a>
                            `

                            infoCanales.appendChild(nuevoCanalSiguiendo)
                            
                            
                        })

                        suscripcionesCanal.appendChild(infoCanales)

                        if (datos.mensaje.respuesta.contenido.length > 0)
                        {
                            contenedor_contenido_tabs.appendChild(contenedorTopVideos)
                            
                        }
                        if (datos.mensaje.respuesta.contenido.length > 0 && datos.mensaje.respuesta.suscripciones.length > 0)
                            {
                                contenedor_contenido_tabs.appendChild(separador)
                            }

                        if (datos.mensaje.respuesta.suscripciones.length > 0) {
                            contenedor_contenido_tabs.appendChild(suscripcionesCanal)
                        }

                        

                        
                    }
                }
                
        }
        catch(error)
            {
                console.error(error)
            }
        finally 
            {
                clearTimeout(timeout)
                if (document.getElementById("contenedor_loader")) {
                    contenedor_contenido_tabs.removeChild(document.getElementById("contenedor_loader")) 
                }    
            }

    })
}


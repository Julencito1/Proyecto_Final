let parametros = new URLSearchParams(document.location.search)

let canal = parametros.get("ref") || "Canal"
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

    
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
        Tus Videos Privados
    
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

            if (!canal.actual)
            {
                CrearBotonSuscripcion()
                if (tab === "videos-privados")
                {
                    parametros.set("tab", "inicio")
                    window.location.search = parametros
                }
            } else {
                CrearTabPrivado()
            }
            
            
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
                    if (datos.mensaje.length === 0) {
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
        
                        datos.mensaje.forEach((e, m) => {
                            
                            let nuevoVideo = document.createElement("div")
                            nuevoVideo.innerHTML = `
                            
                            <a href="#" id="video_${m+1}" class='flex flex-col overflow-hidden gap-3'>
                            <div class='relative w-full overflow-hidden'>
                                <img class='rounded-md w-full' src="${e.canal.videos.media.miniatura}" />
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
                                    ${e.canal.videos.estadisticas.visitas} views · ${e.canal.videos.estadisticas.fecha.fecha_creacion}
                                    </div>
                                </div>
                                </div>
                                <div>
                                    <button class="p-2 rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#e6e6e6]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                    </button>
                                </div>
                            </div>
                            </a>
                            `

                            contenedor_contenido_tabs.appendChild(nuevoVideo)
                            
                            if (contenedor_contenido_tabs.childElementCount === limit)
                                {
                                    
                                    let ultimoVideo = document.getElementById("video_" + String(m+1))
                                    
                                    if (ultimoVideo)
                                    {
                                        ObservarElemento(ultimoVideo, contenedor_ref, false, true, () => VideosCanal(limit + 20, offset + 20))  
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
                    let infoSobreMi = document.createElement("div")
        
                    infoSobreMi.classList.add("flex", "flex-col", "gap-10", "pt-5")
        
                    infoSobreMi.innerHTML = `
                    
                    
                     <div class='flex flex-col gap-2'>
                        <div class='font-Inter font-medium text-trece'>
                            Breve Descripción
                        </div>
                        <div class='font-Inter text-xs'>
                        ${datos.mensaje.canal.info.descripcion === null ? "<i>Este canal no tiene ninguna descripción.</i>" : datos.mensaje.canal.info.descripcion}
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

function VideosPrivadosCanal(limit = 20, offset = 0)
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
                    if (datos.mensaje.length === 0) {
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
        
                        let contenedor_videos = document.createElement("div")
                        contenedor_videos.setAttribute("id", "contenedor_videos")
                        contenedor_videos.classList.add("pt-5")
        
                        datos.mensaje.forEach(e => {
                          
                            contenedor_videos.innerHTML += `
                            
                            <a href="#" class='flex flex-col overflow-hidden gap-3'>
                            <div class='relative w-full overflow-hidden'>
                                <img class='rounded-md w-full' src="${e.canal.videos.media.miniatura}" />
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
                                    50k views · 1 day ago
                                    </div>
                                </div>
                                </div>
                                <div>
                                    <button class="p-2 rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#e6e6e6]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                    </button>
                                </div>
                            </div>
                            </a>
                            `
                        })
        
                        contenedor_contenido_tabs.appendChild(contenedor_videos)
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
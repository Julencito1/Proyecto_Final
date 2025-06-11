
let contenedor_videos_guardados = document.getElementById("contenedor_videos_guardados")
let busqueda_ipt = document.getElementById("busqueda_ipt")
let subContenedor_filtros_videos_guardar = document.getElementById("subContenedor_filtros_videos_guardar")

let mas_visualizaciones = document.getElementById("mas_visualizaciones")
let menos_visualizaciones = document.getElementById("menos_visualizaciones")
let mas_antiguos = document.getElementById("mas_antiguos")
let mas_recientes = document.getElementById("mas_recientes")

let filtroActual = "mas_recientes"
let limitActual = 20
let offsetActual = 0
let busquedaActual = ""

var ESTADO_MENU_FILTROS_VIDEOS_GUARDAR = false

function VideosGuardados(limit = limitActual, offset = offsetActual, filtro = filtroActual, buscar = "")
{
    if (!localStorage.getItem("logged")) return

    
    const timeout = setTimeout(() => {

        let contenedorLoader = document.createElement("div")
        let loader = document.createElement("div")

    
        contenedorLoader.classList.add("flex", "flex-col", "gap-2", "items-center", "justify-center", "pt-20")
        contenedorLoader.setAttribute("id", "contenedor_loader")
        loader.classList.add("loader")
        contenedorLoader.appendChild(loader)
        contenedor_videos_guardados.appendChild(contenedorLoader)
    }, 200)

    fetch("https://proyectofinalapi-production-0ce0.up.railway.app/videos/guardados/obtener",
        {
            method: 'POST',
            body: JSON.stringify({
                limit: limit,
                offset: offset,
                filtro: filtro,
                buscar: buscar,
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
                
    
                if (datos.mensaje.contenedor.length > 0) {
    
                    for (let i = 0; i < datos.mensaje.contenedor.length; i++)
                        {
                
                            let nuevoContenedor = document.createElement("a")
                            nuevoContenedor.href = "../videos.html?ref=" + datos.mensaje.contenedor[i].video.link.url

                            nuevoContenedor.classList.add("flex", "items-center", "gap-4", "transition-colors", "duration-150", "rounded-md", "p-2", "hover:bg-gray-50")
                            
                            nuevoContenedor.setAttribute("id", `video_guardado${offset+i}`)
                            
                            nuevoContenedor.innerHTML = `
                            
                                <div class='flex gap-4 w-full group justify-between max-xs:flex-col max-xs:items-start'>
                                    <div class='flex gap-4 max-xs:w-full md:w-[80%] sm:w-[85%] max-sm:w-[75%] max-xs:flex-col '>
                                        <div class=' w-[170px] h-[100px] min-w-[170px] min-h-[100px] relative  max-xs:h-[180px] max-xs:min-w-[290px] max-xs:w-full'>
                                            <img src='${datos.mensaje.contenedor[i].video.media.miniatura}' class='rounded-md max-xs:h-[180px] max-xs:min-w-[290px] max-xs:w-full object-cover bg-cover bg-no-repeat bg-center w-[170px] h-[100px]'>
                                            <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-0 mb-1 bottom-0 mr-1'>
                                                <div class='text-white select-none font-Inter text-[10px]'>${datos.mensaje.contenedor[i].video.estadisticas.duracion}</div>
                                            </div>
                                        </div>
                                        <div class='flex flex-col gap-2 w-full'>
                                            <div class='font-Inter text-sm w-full'>
                                                <div class='line-clamp-1'>
                                                    ${datos.mensaje.contenedor[i].video.titulo}
                                                </div>
                                            </div>
                                            <div class='flex items-center gap-2'>
                                                <div class='font-Inter text-xs text-gray-700'>
                                                    ${datos.mensaje.contenedor[i].video.estadisticas.visitas} visitas · ${datos.mensaje.contenedor[i].video.estadisticas.fecha.fecha_creacion} 
                                                </div>
                                            </div>
                                            <div class='flex items-center gap-2'>
                                                <div>
                                                    <img src='${datos.mensaje.contenedor[i].video.info.usuario.media.avatar}' class='rounded-md bg-cover bg-no-repeat bg-center w-6 h-6'>
                                                </div>
                                                <div class='font-Lexend text-xs'>
                                                    ${datos.mensaje.contenedor[i].video.info.usuario.nombre}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='flex items-center justify-center max-xs:visible ml-auto z-10 invisible group-hover:visible'>
                                        <button onclick="QuitarVideo('${datos.mensaje.contenedor[i].video.guardado.identificador}'); event.stopPropagation(); event.preventDefault();" class='rounded-full p-2 transition-colors duration-150 hover:bg-gray-100'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22.5 22.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M2.813 5.625h16.875"/><path d="M17.813 5.625v13.125c0 0.938 -0.938 1.875 -1.875 1.875H6.563c-0.938 0 -1.875 -0.938 -1.875 -1.875V5.625"/><path d="M7.5 5.625V3.75c0 -0.938 0.938 -1.875 1.875 -1.875h3.75c0.938 0 1.875 0.938 1.875 1.875v1.875"/><path x1="10" x2="10" y1="11" y2="17" d="M9.375 10.313L9.375 15.938"/><path x1="14" x2="14" y1="11" y2="17" d="M13.125 10.313L13.125 15.938"/></svg>
                                        </button>
                                    </div>
                                </div>
                
                            `
                            
                
                            contenedor_videos_guardados.appendChild(nuevoContenedor)
                
                            if (i+1 < datos.mensaje.contenedor.length)
                                {
                                    let separador = document.createElement("hr")
                                    separador.setAttribute("class", "separador_vgs")
                                    contenedor_videos_guardados.appendChild(separador)
                                }

                                
                                if ((contenedor_videos_guardados.childElementCount - document.querySelectorAll(".separador_vgs").length) === offset+20 && datos.mensaje.siguiente)
                                    {
                                        
                                        let ultimoVideo = document.getElementById("video_guardado" + String(offset+i))
                                        let contenedor_ref = document.querySelector(".contenedor_ref")
                                        
                                        if (ultimoVideo)
                                        {
                                            ObservarElemento(ultimoVideo, contenedor_ref, false, true, () => VideosGuardados(limit, offset + 20, filtroActual, busquedaActual))  
                                        }
                                    }
                
                        }
                } else {
    
                    let svgVacio = document.createElement("div")
                    svgVacio.classList.add("flex", "flex-col", "gap-4" ,"items-center", "justify-center")
    
                    svgVacio.innerHTML = `
                    
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path d="M113.56 100.64h15.251m-85.291 0h14.589zm-8.753 0h4.673zm97.24 0h1.953z" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="m66.64 29.446 7.548 8.468m27.88-8.468-7.548 8.468zM84.32 26.52v11.394z" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M63.103 48.28h42.572l-3.812 5.719 5.083 3.812H61.832l5.719-3.812z" fill="#E8F0FE"/><path fill="#fff" d="M61.88 56.44h45.56a1.36 1.36 0 0 1 1.36 1.36v48.28a1.36 1.36 0 0 1-1.36 1.36H61.88a1.36 1.36 0 0 1-1.36-1.36V57.8a1.36 1.36 0 0 1 1.36-1.36"/><path fill-rule="evenodd" clip-rule="evenodd" d="M63.638 84.324V60.959c0-.963.789-1.744 1.763-1.744l41.464 43.576c0 1.284-1.027 2.324-2.295 2.324H65.933c-1.268 0-2.295-1.04-2.295-2.324zm0 5.045v-2.617z" fill="#E8F0FE"/><path d="M61.2 84.635V59.082c0-1.053.864-1.906 1.93-1.906h44.148c.694 0 1.257.569 1.257 1.271v46.385c0 1.404-1.125 2.542-2.513 2.542H63.713c-1.388 0-2.513-1.138-2.513-2.542V92.759m0-2.607v-2.861" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path d="M62.467 57.176v-7.625c0-.702.511-1.272 1.14-1.272h42.198c.63 0 1.14.57 1.14 1.272v7.625" stroke="#1F64E7" stroke-width="1.7"/><path d="M74.222 70.519a2.224 2.224 0 1 0 0-4.447 2.224 2.224 0 0 0 0 4.447Zm20.968 0a2.224 2.224 0 1 0 0-4.449 2.224 2.224 0 0 0 0 4.449Z" fill="#E8F0FE" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path d="M94.873 70.519c0 5.615-4.552 10.167-10.167 10.167s-10.167-4.552-10.167-10.167M63.141 48.914l4.473 4.415a.68.68 0 0 1-.148 1.079l-4.999 2.768m43.912-8.216-4.281 4.366a.68.68 0 0 0 .16 1.073l5.091 2.777" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/></svg>
                        </div>
    
                        <div class='font-Inter text-[13px]'>
                            No se han encontrado videos guardados
                        </div>
                    
                    `
    
                    contenedor_videos_guardados.appendChild(svgVacio)
                }
            }
       }
       catch(error)
       {
        console.error(error)
       } 
       finally {
            clearTimeout(timeout)
            if (document.getElementById("contenedor_loader")) {
                contenedor_videos_guardados.removeChild(document.getElementById("contenedor_loader")) 
            }   
       }

    })
}

VideosGuardados()

busqueda_ipt.addEventListener("input", (e) => {
    
    let valor = e.target.value.trim()
    busquedaActual = valor
    contenedor_videos_guardados.innerHTML = ''
    VideosGuardados(limitActual, offsetActual, filtroActual, valor)
})

mas_visualizaciones.addEventListener("click", () => {


    filtroActual = "mas_visualizaciones"
    contenedor_videos_guardados.innerHTML = ''
    VideosGuardados(limitActual, offsetActual, filtroActual, busquedaActual)
    MenuUsuarioFiltroVideosGuardarOut()
    main.scroll(0, 0)
    FiltroActivo()
})


menos_visualizaciones.addEventListener("click", () => {


    filtroActual = "menos_visualizaciones"
    contenedor_videos_guardados.innerHTML = ''
    VideosGuardados(limitActual, offsetActual, filtroActual, busquedaActual)
    MenuUsuarioFiltroVideosGuardarOut()
    main.scroll(0, 0)
    FiltroActivo()
})

mas_antiguos.addEventListener("click", () => {


    filtroActual = "mas_antiguos"
    contenedor_videos_guardados.innerHTML = ''
    VideosGuardados(limitActual, offsetActual, filtroActual, busquedaActual)
    MenuUsuarioFiltroVideosGuardarOut()
    main.scroll(0, 0)
    FiltroActivo()
})

mas_recientes.addEventListener("click", () => {


    filtroActual = "mas_recientes"
    contenedor_videos_guardados.innerHTML = ''
    VideosGuardados(limitActual, offsetActual, filtroActual, busquedaActual)
    MenuUsuarioFiltroVideosGuardarOut()
    main.scroll(0, 0)
    FiltroActivo()
})

let btnFiltros_videos_guardar = document.getElementById("btnFiltros_videos_guardar")

btnFiltros_videos_guardar?.addEventListener("click", () => {

    if (ESTADO_MENU_FILTROS_VIDEOS_GUARDAR) 
    {
        MenuUsuarioFiltroVideosGuardarOut()
    } else {
        MenuUsuarioFiltroVideosGuardarIn()
    }

})

function QuitarVideo(identificador)
{
    if (!localStorage.getItem("logged") || !identificador || identificador === "") return

    fetch("https://proyectofinalapi-production-0ce0.up.railway.app/videos/guardados/borrar",
        {
            method: 'DELETE',
            body: JSON.stringify({
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
            contenedor_videos_guardados.innerHTML = ''
            VideosGuardados(limitActual, offsetActual, filtroActual, busquedaActual)
        }

    })
}

function FiltroActivo() {

    switch (filtroActual)
    {
        case "mas_visualizaciones":
            mas_visualizaciones.innerHTML = `

            Más visualizaciones
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M17.5 5.25 7.875 14.875l-4.375 -4.375"/></svg>
                </div>
            `
            menos_visualizaciones.innerHTML = `
             Menos visualizaciones
                
            `
            mas_antiguos.innerHTML = `
                 Más antiguos
                
            `
            mas_recientes.innerHTML = `
                 Más recientes
                
            `
            break;
        case "menos_visualizaciones":
            menos_visualizaciones.innerHTML = `
             Menos visualizaciones
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M17.5 5.25 7.875 14.875l-4.375 -4.375"/></svg>
                </div>
            `
            mas_visualizaciones.innerHTML = `

            Más visualizaciones
                
            `
            mas_antiguos.innerHTML = `
                 Más antiguos
                
            `
            mas_recientes.innerHTML = `
                 Más recientes
                
            `
            break;
        case "mas_antiguos":
            mas_antiguos.innerHTML = `
                 Más antiguos
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M17.5 5.25 7.875 14.875l-4.375 -4.375"/></svg>
                </div>
            `
            mas_visualizaciones.innerHTML = `

            Más visualizaciones
                
            `
            menos_visualizaciones.innerHTML = `
             Menos visualizaciones
                
            `
            mas_recientes.innerHTML = `
                 Más recientes
                
            `
            break;
        case "mas_recientes":
            mas_recientes.innerHTML = `
                 Más recientes
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M17.5 5.25 7.875 14.875l-4.375 -4.375"/></svg>
                </div>
            `
            menos_visualizaciones.innerHTML = `
             Menos visualizaciones
                
            `
            mas_visualizaciones.innerHTML = `

            Más visualizaciones
                
            `
            mas_antiguos.innerHTML = `
            Más antiguos
           
       `
            break;
        default: 
        mas_visualizaciones.innerHTML = `

            Más visualizaciones
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M17.5 5.25 7.875 14.875l-4.375 -4.375"/></svg>
                </div>
            `
            break;
    }
}
FiltroActivo()
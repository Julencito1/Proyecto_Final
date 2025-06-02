let parametros = new URLSearchParams(document.location.search)

let tipo = parametros.get("tipo") || "videos"

let btn_mostrar_marcados_videos = document.getElementById("btn_mostrar_marcados_videos")
let btn_mostrar_marcados_comentarios = document.getElementById("btn_mostrar_marcados_comentarios")
let contenedor_marcados = document.getElementById("contenedor_marcados")
let contenedor_ref = document.querySelector(".contenedor_ref")

function EstilosTipoMarcado()
{
    switch (tipo)
    {
        case "videos":
            btn_mostrar_marcados_videos.classList.add("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:left-0", "after:-bottom-2", "font-medium")
            btn_mostrar_marcados_comentarios.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:left-0", "after:-bottom-2", "font-medium")
            VideosMarcados()
            break

        case "comentarios":
            btn_mostrar_marcados_videos.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:left-0", "after:-bottom-2", "font-medium")
            btn_mostrar_marcados_comentarios.classList.add("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "after:left-0", "font-medium")
            ComentariosMarcados()
            break

        default:
            btn_mostrar_marcados_videos.classList.add("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:left-0", "after:-bottom-2", "font-medium")
            btn_mostrar_marcados_comentarios.classList.remove("relative", "after:absolute", "after:w-full", "after:bg-black", "after:rounded-full", "after:h-0.5", "after:-bottom-2", "after:left-0", "font-medium")
            VideosMarcados()
            break
    }
}

EstilosTipoMarcado()

btn_mostrar_marcados_videos.addEventListener("click", () => {

    parametros.set("tipo", "videos")
    window.location.search = parametros
})

btn_mostrar_marcados_comentarios.addEventListener("click", () => {

    parametros.set("tipo", "comentarios")
    window.location.search = parametros
})

function VideosMarcados(offset = 0) {

    const timeout = setTimeout(() => {

        let loaderVideosMarcados = document.createElement("div")
        loaderVideosMarcados.classList.add("flex", "items-center", "justify-center", "mt-3")
        loaderVideosMarcados.setAttribute("id", "loaderVideosMarcados")
        
        loaderVideosMarcados.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-icon lucide-loader"><path d="M9 1.5v3"/><path d="m12.144 5.844 2.172 -2.172"/><path d="M13.5 9h3"/><path d="m12.144 12.144 2.172 2.172"/><path d="M9 13.5v3"/><path d="m3.672 14.328 2.172 -2.172"/><path d="M1.5 9h3"/><path d="m3.672 3.672 2.172 2.172"/></svg>
        `

        contenedor_marcados.appendChild(loaderVideosMarcados)

    }, 200)

    fetch(`http://localhost:8080/videos/marcados/obtener`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
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
                if (datos.codigo === 200) {
                
                    let vm = datos.mensaje.videos_marcados
    
                    if (vm.length > 0)
                    {
    
                        for (let i = 0; i < vm.length; i++)
                        {
                            let nuevoContenedor = document.createElement("a")
                                nuevoContenedor.href = `./videos.php?ref=` + vm[i].link.identificador_video
    
                                nuevoContenedor.classList.add("flex", "items-center", "gap-4", "transition-colors", "duration-150", "rounded-md", "p-2", "hover:bg-gray-50")
                                
                                nuevoContenedor.setAttribute("id", `video_marcado_${offset+i}`)
                                
                                nuevoContenedor.innerHTML = `
                                
                                    <div class='flex items-center gap-4 w-full group'>
                                        <div class='w-[170px] h-[100px] relative'>
                                            <img src='${vm[i].media.video.miniatura}' class='rounded-md bg-cover bg-no-repeat bg-center w-[170px] h-[100px]'>
                                            <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-0 mb-1 bottom-0 mr-1'>
                                                <div class='text-white select-none font-Inter text-[10px]'>${vm[i].estadisticas.duracion}</div>
                                            </div>
                                        </div>
                                        <div class='flex flex-col gap-2 w-[70%]'>
                                            <div class='flex flex-col gap-2'>
                                                <div class='font-Inter text-sm w-full'>
                                                <div class='line-clamp-1 block truncate'>
                                                    ${vm[i].contenido.titulo}
                                                </div>
                                            </div>
                                            <div class='flex items-center gap-2'>
                                                <div class='font-Inter text-xs text-gray-700'>
                                                    ${vm[i].estadisticas.visitas} visitas · ${vm[i].estadisticas.fechas.fecha_creacion} 
                                                </div>
                                            </div>
                                            <div class='flex items-center gap-2'>
                                                <div>
                                                    <img src='${vm[i].media.usuario.avatar}' class='rounded-md bg-cover bg-no-repeat bg-center w-6 h-6'>
                                                </div>
                                                <div class='font-Lexend text-xs'>
                                                    ${vm[i].contenido.canal.usuario.nombre}
                                                </div>
                                            </div>
                                            </div>
                                            
                                        </div>
                                        <div class='flex items-center justify-center z-10'>
                                            <div>
                                                ${vm[i].estadisticas.gustado_vm === "si" ? (
                                                    `
                                                    <div class='flex items-center gap-2'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M6.125 8.75v10.5m7-14.105L12.25 8.75h5.101a1.75 1.75 0 0 1 1.68 2.24l-2.039 7a1.75 1.75 0 0 1-1.679 1.26H3.5a1.75 1.75 0 0 1-1.75-1.75v-7A1.75 1.75 0 0 1 3.5 8.75h2.415a1.75 1.75 0 0 0 1.566-.971L10.5 1.75a2.74 2.74 0 0 1 2.625 3.395"/></svg>
                                                        </div>
                                                        <div class='font-Geist text-xs'>
                                                        Gustado
                                                        </div>
                                                    </div>
                                                    `
                                                ) : (
                                                    `
                                                        <div class='flex items-center gap-2'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down-icon lucide-thumbs-down"><path d="M14.875 12.25V1.75m-7 14.105.875-3.605H3.649a1.75 1.75 0 0 1-1.68-2.24l2.039-7a1.75 1.75 0 0 1 1.68-1.26H17.5a1.75 1.75 0 0 1 1.75 1.75v7a1.75 1.75 0 0 1-1.75 1.75h-2.415a1.75 1.75 0 0 0-1.566.971L10.5 19.25a2.74 2.74 0 0 1-2.625-3.395"/></svg>
                                                        </div>
                                                        <div class='font-Geist text-xs'>
                                                        No gustado
                                                        </div>
                                                    </div>
                                                    `
                                                )}
                                            </div>
                                        </div>
                                    </div>
                    
                                `
                                
                    
                                contenedor_marcados.appendChild(nuevoContenedor)

                                let separador = document.createElement("hr")
                                separador.classList.add("nv_separador")

                                contenedor_marcados.appendChild(separador)
    
                                if ((contenedor_marcados.childElementCount - document.querySelectorAll(".nv_separador").length) === (offset + 20) && datos.mensaje.mas)
                                {
                                    let ultimoVideoMarcado = document.getElementById(`video_marcado_${offset+i}`)
    
                                    if (ultimoVideoMarcado)
                                    {
                                        ObservarElemento(ultimoVideoMarcado, contenedor_ref, false, true, () => VideosMarcados(offset + 20))
                                    }
                                }
                        }
    
                    } else {

                        let marcadosVacio = document.createElement("div")
                        marcadosVacio.classList.add("flex", "flex-col", "gap-2", "items-center", "justify-center")

                        marcadosVacio.innerHTML = `
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="m47.568 47.952 56.456-9.039a2.04 2.04 0 0 1 2.337 1.692l.001.007 5.523 35.246a2.04 2.04 0 0 1-1.693 2.33l-56.457 9.038a2.04 2.04 0 0 1-2.337-1.692l-.001-.007-5.523-35.246a2.04 2.04 0 0 1 1.693-2.33" fill="#fff"/><path d="m56.675 86.648-2.164.357c-1.487.245-2.883-.811-3.119-2.358l-5.118-33.62c-.235-1.547.779-3 2.266-3.246l54.52-8.986c1.487-.245 2.883.811 3.119 2.358l.549 3.604m.388 2.554.324 2.13" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="m50.304 49.499 51.517-8.045a2.04 2.04 0 0 1 2.329 1.692l5.005 31.157a2.04 2.04 0 0 1-1.69 2.338l-.009.001-51.517 8.045a2.04 2.04 0 0 1-2.329-1.692l-5.005-31.158a2.04 2.04 0 0 1 1.69-2.337z" fill="#E8F0FE"/><path d="M116.11 52.53H62.73a2.72 2.72 0 0 0-2.72 2.72v32.98a2.72 2.72 0 0 0 2.72 2.72h53.38a2.72 2.72 0 0 0 2.72-2.72V55.25a2.72 2.72 0 0 0-2.72-2.72Z" fill="#fff" stroke="#1F64E7" stroke-width="1.7"/><path d="M117.98 60.52H60.86v9.52h57.12z" fill="#E8F0FE"/><path d="M70.237 60.52h-4.893m53.093 0H73.666zm-4.08 8.84H60.746zM85.043 82.28h-19.25z" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </div>
                            <div class='font-Geist text-[13px]'>
                                No hay videos marcados
                            </div>
                        
                        `


                        contenedor_marcados.appendChild(marcadosVacio)
                    }
    
                }
            } catch(error)
            {
                console.error(error)
            }
            finally {

                clearTimeout(timeout)
                let loaderVideosMarcados = document.getElementById("loaderVideosMarcados")

                if (loaderVideosMarcados)
                {

                    contenedor_marcados.removeChild(loaderVideosMarcados)
                }

            }
        })

}

function ComentariosMarcados(offset = 0) {

    const timeout = setTimeout(() => {

        let loaderComentariosMarcados = document.createElement("div")
        loaderComentariosMarcados.classList.add("flex", "items-center", "justify-center", "mt-3")
        loaderComentariosMarcados.setAttribute("id", "loaderComentariosMarcados")
        
        loaderComentariosMarcados.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-icon lucide-loader"><path d="M9 1.5v3"/><path d="m12.144 5.844 2.172 -2.172"/><path d="M13.5 9h3"/><path d="m12.144 12.144 2.172 2.172"/><path d="M9 13.5v3"/><path d="m3.672 14.328 2.172 -2.172"/><path d="M1.5 9h3"/><path d="m3.672 3.672 2.172 2.172"/></svg>
        `

        contenedor_marcados.appendChild(loaderComentariosMarcados)

    }, 200)

    fetch(`http://localhost:8080/obtener/comentarios/marcados`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
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
                if (datos.codigo === 200) {
                
                    let comentarios = datos.mensaje.comentarios

                    if (comentarios.length > 0)
                    {
                        for(let i = 0; i < comentarios.length; i++)
                        {

                            let nuevoContenedor = document.createElement("a")
                            nuevoContenedor.classList.add("flex", "items-center", "gap-4", "transition-colors", "duration-150", "rounded-md", "p-2", "hover:bg-gray-50")
                            nuevoContenedor.href = `./videos.php?ref=` + comentarios[i].accion.identificador_video
                            nuevoContenedor.setAttribute("id", `comentario_marcado_${offset+i}`)

                            nuevoContenedor.innerHTML = `

                                <div class='w-full'>
                                    <div class='flex flex-col gap-4'>
                                        <div class='flex items-center gap-2'>

                                            ${comentarios[i].info.tipo === "hijo" ? (
                                                `
                                                <div title='Comentario Hijo'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-left-up-icon lucide-corner-left-up"><path d="M12.25 7.875 7.875 3.5 3.5 7.875"/><path d="M17.5 17.5h-6.125a3.5 3.5 0 0 1-3.5-3.5V3.5"/></svg>
                                            </div>
                                                `
                                            ) : (
                                                `
                                                <div title='Comentario Padre'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-pen-icon lucide-user-round-pen"><path d="M1.75 18.375a7 7 0 0 1 9.468 -6.551"/><path d="M18.706 14.548a0.875 0.875 0 0 0 -2.628 -2.628l-3.509 3.51a1.75 1.75 0 0 0 -0.443 0.747l-0.732 2.511a0.438 0.438 0 0 0 0.542 0.542l2.511 -0.732a1.75 1.75 0 0 0 0.747 -0.443z"/><path cx="10" cy="8" r="5" d="M13.125 7A4.375 4.375 0 0 1 8.75 11.375A4.375 4.375 0 0 1 4.375 7A4.375 4.375 0 0 1 13.125 7z"/></svg>
                                                </div>
                                                `
                                            )}

                                            <img src='${comentarios[i].usuario.media.avatar}' class='w-7 h-7 rounded-full bg-center bg-cover bg-no-repeat' />

                                            <div class='font-Geist text-[13px]'>
                                                ${comentarios[i].usuario.nombre}
                                            </div>
                                        </div>
                                        <div>
                                            <p class='font-Geist text-[12.2px] text-gray-700 break-all line-clamp-4'>
                                                ${comentarios[i].contenido}
                                            </p>
                                        </div>
                                        <div class='flex items-center justify-between w-full'>
                                            <div>
                                                ${comentarios[i].info.gustado === "si" ? (
                                                    `
                                                    <div class='flex items-center gap-2'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M6.125 8.75v10.5m7-14.105L12.25 8.75h5.101a1.75 1.75 0 0 1 1.68 2.24l-2.039 7a1.75 1.75 0 0 1-1.679 1.26H3.5a1.75 1.75 0 0 1-1.75-1.75v-7A1.75 1.75 0 0 1 3.5 8.75h2.415a1.75 1.75 0 0 0 1.566-.971L10.5 1.75a2.74 2.74 0 0 1 2.625 3.395"/></svg>
                                                        </div>
                                                        <div class='font-Geist text-xs'>
                                                        Gustado
                                                        </div>
                                                    </div>
                                                    `
                                                ) : (
                                                    `
                                                        <div class='flex items-center gap-2'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down-icon lucide-thumbs-down"><path d="M14.875 12.25V1.75m-7 14.105.875-3.605H3.649a1.75 1.75 0 0 1-1.68-2.24l2.039-7a1.75 1.75 0 0 1 1.68-1.26H17.5a1.75 1.75 0 0 1 1.75 1.75v7a1.75 1.75 0 0 1-1.75 1.75h-2.415a1.75 1.75 0 0 0-1.566.971L10.5 19.25a2.74 2.74 0 0 1-2.625-3.395"/></svg>
                                                        </div>
                                                        <div class='font-Geist text-xs'>
                                                        No gustado
                                                        </div>
                                                    </div>
                                                    `
                                                )}
                                            </div>

                                            <div class='font-Geist text-gray-800 text-xs'>
                                                ${comentarios[i].info.fecha.fecha_publicacion}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                                
                            `
                            
                            

                            contenedor_marcados.appendChild(nuevoContenedor)

                            let separador = document.createElement("hr")
                            separador.classList.add("nv_separador")

                            contenedor_marcados.appendChild(separador)
                        
                            if ((contenedor_marcados.childElementCount - document.querySelectorAll(".nv_separador").length) === (offset + 20) && datos.mensaje.mas)
                            {
                                let ultimoComentarioMarcado = document.getElementById(`comentario_marcado_${offset+i}`)

                                if (ultimoComentarioMarcado)
                                {
                                    ObservarElemento(ultimoComentarioMarcado, contenedor_ref, false, true, () => ComentariosMarcados(offset + 20))
                                }
                            }

                        }
                    } else {

                        let marcadosVacio = document.createElement("div")
                        marcadosVacio.classList.add("flex", "flex-col", "gap-2", "items-center", "justify-center")

                        marcadosVacio.innerHTML = `
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="m47.568 47.952 56.456-9.039a2.04 2.04 0 0 1 2.337 1.692l.001.007 5.523 35.246a2.04 2.04 0 0 1-1.693 2.33l-56.457 9.038a2.04 2.04 0 0 1-2.337-1.692l-.001-.007-5.523-35.246a2.04 2.04 0 0 1 1.693-2.33" fill="#fff"/><path d="m56.675 86.648-2.164.357c-1.487.245-2.883-.811-3.119-2.358l-5.118-33.62c-.235-1.547.779-3 2.266-3.246l54.52-8.986c1.487-.245 2.883.811 3.119 2.358l.549 3.604m.388 2.554.324 2.13" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="m50.304 49.499 51.517-8.045a2.04 2.04 0 0 1 2.329 1.692l5.005 31.157a2.04 2.04 0 0 1-1.69 2.338l-.009.001-51.517 8.045a2.04 2.04 0 0 1-2.329-1.692l-5.005-31.158a2.04 2.04 0 0 1 1.69-2.337z" fill="#E8F0FE"/><path d="M116.11 52.53H62.73a2.72 2.72 0 0 0-2.72 2.72v32.98a2.72 2.72 0 0 0 2.72 2.72h53.38a2.72 2.72 0 0 0 2.72-2.72V55.25a2.72 2.72 0 0 0-2.72-2.72Z" fill="#fff" stroke="#1F64E7" stroke-width="1.7"/><path d="M117.98 60.52H60.86v9.52h57.12z" fill="#E8F0FE"/><path d="M70.237 60.52h-4.893m53.093 0H73.666zm-4.08 8.84H60.746zM85.043 82.28h-19.25z" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </div>
                            <div class='font-Geist text-[13px]'>
                                No hay comentarios marcados
                            </div>
                        
                        `


                        contenedor_marcados.appendChild(marcadosVacio)
                    }
    
                }
            } catch(error)
            {
                console.error(error)
            }
            finally {

                clearTimeout(timeout)
                let loaderComentariosMarcados = document.getElementById("loaderComentariosMarcados")

                if (loaderComentariosMarcados)
                {

                    contenedor_marcados.removeChild(loaderComentariosMarcados)
                }

            }
        })

}
let parametros = new URLSearchParams(document.location.search)
let categoria = parametros.get("categoria")

const total_notis = document.getElementById("total_notis")
const usuario_nombre = document.getElementById("usuario_nombre")
const usuario_nombre_canal = document.getElementById("usuario_nombre_canal")
let listado_horizontal_categorias = document.getElementById("listado_horizontal_categorias")
let contenedor_videos_inicio = document.getElementById("contenedor_videos_inicio")
let contenedor_ref = document.querySelector(".contenedor_ref")
let btn_sin_categoria_inicio = document.getElementById("btn_sin_categoria_inicio")
let contenedor_loader = document.getElementById("contenedor_loader")


function TopCategorias() {

    if (!localStorage.getItem("logged")) return

    fetch("https://proyectofinalapi-production-0ce0.up.railway.app/categorias/top",
        {
            method: 'GET',
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
            for (let i = 0; i < datos.mensaje.length; i++)
            {
                let nuevaCat = document.createElement("div")
                
                nuevaCat.innerHTML = `
                
                    <button onclick='CambiarCategoria("${datos.mensaje[i].nombre}")' class='font-Geist text-[13px] rounded-full px-3 py-1.5 transition-colors duration-150 ${categoria?.toLowerCase() === datos.mensaje[i].nombre.toLowerCase() ? 'text-[#0063DF] bg-gray-50' : ''} hover:bg-gray-100'>
                        ${datos.mensaje[i].nombre}
                    </button>
                `

                listado_horizontal_categorias.appendChild(nuevaCat)
            }
        }

    })
}

TopCategorias()

function CambiarCategoria(categoria)
{
    parametros.set("categoria", categoria)
    window.location.search = parametros
}

function VideosCategoria(offset = 0) {

    if (!localStorage.getItem("logged") || !categoria) return

    const timeout = setTimeout(() => {

        let loaderResultados = document.createElement("div")
        loaderResultados.classList.add("flex", "items-center", "justify-center", "mt-3")
        loaderResultados.setAttribute("id", "loaderResultados")
        
        loaderResultados.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-icon lucide-loader"><path d="M9 1.5v3"/><path d="m12.144 5.844 2.172 -2.172"/><path d="M13.5 9h3"/><path d="m12.144 12.144 2.172 2.172"/><path d="M9 13.5v3"/><path d="m3.672 14.328 2.172 -2.172"/><path d="M1.5 9h3"/><path d="m3.672 3.672 2.172 2.172"/></svg>
        `

        contenedor_loader.appendChild(loaderResultados)

    }, 200)

    fetch("https://proyectofinalapi-production-0ce0.up.railway.app/videos/categorias/obtener",
        {
            method: 'POST',
            body: JSON.stringify({
                offset: offset,
                categoria: categoria
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
                    let videos = datos.mensaje.videos
                
                        if (videos.length > 0)
                        {
        
                            contenedor_videos_inicio.style.display = 'grid'
                            contenedor_videos_inicio.style.gridTemplateColumns = `repeat(auto-fill, minmax(250px, 1fr))`
                            contenedor_videos_inicio.style.gap = '2rem'
                            contenedor_videos_inicio.style.padding = '1rem'
                            
                            
                            for (let k = 0; k < videos.length; k++)
                                {
                    
                                    let recomendacion = document.createElement("a")
                                    recomendacion.href = './pages/videos.html?ref=' + videos[k].link.ruta
                                    recomendacion.setAttribute("id", "recomendacion_video_" + (k+offset))
                                    recomendacion.classList.add("flex", "flex-col", "gap-2", "fade_in")
                    
                    
                                    recomendacion.innerHTML = `
                                    
                                                        <div class='relative'>
                                                            <img src='${videos[k].media.miniatura}' class='rounded-md object-cover bg-cover bg-no-repeat bg-center aspect-video'>
                                                            <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-1 mb-1 bottom-0 mr-1'>
                                                                <div class='text-white select-none font-Inter text-[10px]'>${videos[k].estadisticas.duracion}</div>
                                                            </div>
                                                        </div>
                                                        <div class='flex flex-col gap-2'>
                                                            <div class='font-Inter text-xs'>
                                                                <div class='line-clamp-2'>
                                                                    ${videos[k].contenido.titulo}
                                                                </div>
                                                            </div>
                                                            <div class='flex items-center gap-2'>
                                                                <div>
                                                                    <img src='${videos[k].canal.media.avatar_usuario}' class='rounded-md bg-cover bg-no-repeat bg-center w-6 h-6'>
                                                                </div>
                                                                <div class='font-Lexend text-[11px]'>
                                                                    ${videos[k].canal.nombre_usuario}
                                                                </div>
                                                            </div>
                                                            <div class='flex items-center gap-2'>
                                                                <div class='font-Inter text-[10px] text-gray-700'>
                                                                    ${videos[k].estadisticas.visitas} visitas · ${videos[k].estadisticas.fecha.fecha_creacion} 
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                    `
                    
                                    contenedor_videos_inicio.appendChild(recomendacion)
                    
                                    if (contenedor_videos_inicio.childElementCount === offset+20 && datos.mensaje.mas)
                                    {
        
                                        let ultimoRecomendacion = document.getElementById("recomendacion_video_" + (k+offset))
                                        
                                        if (ultimoRecomendacion)
                                        {
                                            ObservarElemento(ultimoRecomendacion, contenedor_ref, false, true, () => VideosCategoria(offset+20))
                                        }
        
                                    }
                                    
                                    
                                }
                        } else {
        
                            contenedor_videos_inicio.style.display = 'flex'
                            contenedor_videos_inicio.style.alignItems = `center`
                            contenedor_videos_inicio.style.justifyContent = 'center'
                            contenedor_videos_inicio.style.height = '100%'
        
                            let contenedorVacio = document.createElement("div")
                            
                            contenedorVacio.setAttribute("class", "flex items-center justify-center flex-col gap-5")
                            contenedorVacio.innerHTML = `
                            
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="m67.961 90.571 1.013-.035v14.279c0 .323.263.585.588.585h35.251a.585.585 0 0 0 .588-.585v-48.95a2.15 2.15 0 0 0-2.155-2.145H71.128a2.15 2.15 0 0 0-2.154 2.145v10.178l-1.013-.035q-.178-.006-.358-.006c-6.144 0-11.163 5.482-11.163 12.288 0 6.805 5.018 12.288 11.163 12.288q.18 0 .358-.007Zm.112-4.693q-.235.019-.47.019c-3.708 0-6.646-3.437-6.646-7.606s2.938-7.606 6.646-7.606q.236 0 .47.018l.901.072v15.031z" fill="#fff" stroke="#1F64E7" stroke-width="1.7" stroke-linejoin="round"/><path d="M99.96 57.924V70.38m0 3.864v3.225z" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M45.647 99.96h4.673m72.847 0h1.953m-15.64 0h10.491m-65.571 0h11.869" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M87.04 23.8q-2.72 4.298-2.72 7.48c0 3.778 3.165 5.47 3.165 9.563q0 3.116-3.165 6.188M78.88 31.28c-.593 3.749 2.04 4.442 2.04 7.803q0 2.559-2.04 5.117m12.781-14.638c-.898 2.326-.394 3.742 0 4.576.842 1.783 2.179 3.322 2.179 5.137q0 3.161-2.179 6.084" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/><path d="M71.4 57.12a.68.68 0 0 1 .68-.68H85v46.92H72.08a.68.68 0 0 1-.68-.68z" fill="#E8F0FE"/></svg>
                                </div>
                                <div class='font-Geist text-[13px]'>
                                    No hay videos para esta categoría
                                </div>
                            `
        
                            contenedor_videos_inicio.appendChild(contenedorVacio)
                        }
                } else if (datos.codigo === 404)
                {
                    window.location.href = './404.html'
                }
        } catch(error)
        {
            console.error(error)
        }
        finally {

            clearTimeout(timeout)
            let loaderResultados = document.getElementById("loaderResultados")

            if (loaderResultados)
            {
                contenedor_loader.removeChild(loaderResultados)
            }

        }

    })
}


let identificadoresVideos = []


function RecomendacionVideosInicio()
{
    if (!localStorage.getItem("logged")) return

    const timeout = setTimeout(() => {

        let loaderVideoRecomendados = document.createElement("div")
        loaderVideoRecomendados.classList.add("flex", "items-center", "justify-center", "mt-3")
        loaderVideoRecomendados.setAttribute("id", "loaderVideoRecomendados")
        
        loaderVideoRecomendados.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-icon lucide-loader"><path d="M9 1.5v3"/><path d="m12.144 5.844 2.172 -2.172"/><path d="M13.5 9h3"/><path d="m12.144 12.144 2.172 2.172"/><path d="M9 13.5v3"/><path d="m3.672 14.328 2.172 -2.172"/><path d="M1.5 9h3"/><path d="m3.672 3.672 2.172 2.172"/></svg>
        `

        contenedor_loader.appendChild(loaderVideoRecomendados)

    }, 200)

    fetch("https://proyectofinalapi-production-0ce0.up.railway.app/videos/recomendados/inicio",
        {
            method: 'POST',
            body: JSON.stringify({
                identificadores: identificadoresVideos
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
                    
                    let videos = datos.mensaje.videos
        
                    if (videos.length > 0)
                    {

                        contenedor_videos_inicio.style.display = 'grid'
                        contenedor_videos_inicio.style.gridTemplateColumns = `repeat(auto-fill, minmax(250px, 1fr))`
                        contenedor_videos_inicio.style.gap = '2rem'
                        contenedor_videos_inicio.style.padding = '1rem'

                        for (let k = 0; k < videos.length; k++)
                            {
                
                                let recomendacion = document.createElement("a")
                                recomendacion.href = './pages/videos.html?ref=' + videos[k].link.ruta
                                recomendacion.setAttribute("id", "recomendacion_video_" + identificadoresVideos.length)
                                recomendacion.classList.add("flex", "flex-col", "gap-2", "fade_in")
                
                
                                recomendacion.innerHTML = `
                                
                                                    <div class='relative'>
                                                            <img src='${videos[k].media.miniatura}' class='rounded-md object-cover bg-cover bg-no-repeat bg-center aspect-video'>
                                                            <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-1 mb-1 bottom-0 mr-1'>
                                                                <div class='text-white select-none font-Inter text-[10px]'>${videos[k].estadisticas.duracion}</div>
                                                            </div>
                                                        </div>
                                                        <div class='flex flex-col gap-2'>
                                                            <div class='font-Inter text-xs'>
                                                                <div class='line-clamp-2'>
                                                                    ${videos[k].contenido.titulo}
                                                                </div>
                                                            </div>
                                                            <div class='flex items-center gap-2'>
                                                                <div>
                                                                    <img src='${videos[k].canal.media.avatar_usuario}' class='rounded-md bg-cover bg-no-repeat bg-center w-6 h-6'>
                                                                </div>
                                                                <div class='font-Lexend text-[11px]'>
                                                                    ${videos[k].canal.nombre_usuario}
                                                                </div>
                                                            </div>
                                                            <div class='flex items-center gap-2'>
                                                                <div class='font-Inter text-[10px] text-gray-700'>
                                                                    ${videos[k].estadisticas.visitas} visitas · ${videos[k].estadisticas.fecha.fecha_creacion} 
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                `
                
                                contenedor_videos_inicio.appendChild(recomendacion)
                                identificadoresVideos.push("'" + videos[k].link.ruta + "'")
                
                                if (identificadoresVideos.length % 20 === 0 && datos.mensaje.mas)
                                {
                                    let ultimoVideoRecomendado = document.getElementById("recomendacion_video_" + (identificadoresVideos.length-1))
                                    
                                    if (ultimoVideoRecomendado)
                                    {
                                        ObservarElemento(ultimoVideoRecomendado, contenedor_ref, false, true, () => RecomendacionVideosInicio())
                                    }
                
                                }
                                
                            }
                    } else {

                        contenedor_videos_inicio.style.display = 'flex'
                        contenedor_videos_inicio.style.alignItems = `center`
                        contenedor_videos_inicio.style.justifyContent = 'center'
                        contenedor_videos_inicio.style.height = '100%'

                        let contenedorVacio = document.createElement("div")
                            
                            contenedorVacio.setAttribute("class", "flex items-center justify-center flex-col gap-5")
                            contenedorVacio.innerHTML = `
                            
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="m67.961 90.571 1.013-.035v14.279c0 .323.263.585.588.585h35.251a.585.585 0 0 0 .588-.585v-48.95a2.15 2.15 0 0 0-2.155-2.145H71.128a2.15 2.15 0 0 0-2.154 2.145v10.178l-1.013-.035q-.178-.006-.358-.006c-6.144 0-11.163 5.482-11.163 12.288 0 6.805 5.018 12.288 11.163 12.288q.18 0 .358-.007Zm.112-4.693q-.235.019-.47.019c-3.708 0-6.646-3.437-6.646-7.606s2.938-7.606 6.646-7.606q.236 0 .47.018l.901.072v15.031z" fill="#fff" stroke="#1F64E7" stroke-width="1.7" stroke-linejoin="round"/><path d="M99.96 57.924V70.38m0 3.864v3.225z" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M45.647 99.96h4.673m72.847 0h1.953m-15.64 0h10.491m-65.571 0h11.869" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M87.04 23.8q-2.72 4.298-2.72 7.48c0 3.778 3.165 5.47 3.165 9.563q0 3.116-3.165 6.188M78.88 31.28c-.593 3.749 2.04 4.442 2.04 7.803q0 2.559-2.04 5.117m12.781-14.638c-.898 2.326-.394 3.742 0 4.576.842 1.783 2.179 3.322 2.179 5.137q0 3.161-2.179 6.084" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/><path d="M71.4 57.12a.68.68 0 0 1 .68-.68H85v46.92H72.08a.68.68 0 0 1-.68-.68z" fill="#E8F0FE"/></svg>
                                </div>
                                <div class='font-Geist text-[13px]'>
                                    Todavía no hay ningún video publicado en NewTube
                                </div>
                            `
        
                            contenedor_videos_inicio.appendChild(contenedorVacio)
                    }
        
                    
        
                }
        } catch(error)
        {
            console.error(error)
        }
        finally {
            clearTimeout(timeout)
            let loaderVideoRecomendados = document.getElementById("loaderVideoRecomendados")

            if (loaderVideoRecomendados)
            {
                contenedor_loader.removeChild(loaderVideoRecomendados)
            }
        }

    })
}

if (!categoria)
{
    RecomendacionVideosInicio()
} else {
    VideosCategoria()
}

btn_sin_categoria_inicio.addEventListener("click", () => {

    parametros.delete("categoria")
    window.location.search = parametros
})
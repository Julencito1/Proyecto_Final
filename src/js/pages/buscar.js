const parametros = new URLSearchParams(document.location.search)
let q = parametros.get("q")

if (!q)
{
    window.location.href = '../404.php'
}

document.title = `${q} - NewTube`
buscador.value = q

let contenedor_resultados_busqueda = document.getElementById("contenedor_resultados_busqueda")
let contenedor_ref = document.querySelector(".contenedor_ref")

function BuscarResultados(offsetC = 0, offsetV = 0)
{
    if (!localStorage.getItem("logged") || !q) return

    const timeout = setTimeout(() => {

        let loaderResultadosBusquedas = document.createElement("div")
        loaderResultadosBusquedas.classList.add("flex", "items-center", "justify-center", "mt-3")
        loaderResultadosBusquedas.setAttribute("id", "loaderResultadosBusquedas")
        
        loaderResultadosBusquedas.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-icon lucide-loader"><path d="M9 1.5v3"/><path d="m12.144 5.844 2.172 -2.172"/><path d="M13.5 9h3"/><path d="m12.144 12.144 2.172 2.172"/><path d="M9 13.5v3"/><path d="m3.672 14.328 2.172 -2.172"/><path d="M1.5 9h3"/><path d="m3.672 3.672 2.172 2.172"/></svg>
        `

        contenedor_resultados_busqueda.appendChild(loaderResultadosBusquedas)

    }, 200)

    let arrayBusquedasRecientes = localStorage.getItem("busquedas_recientes")
    
    if (arrayBusquedasRecientes)
    {
        let arrayBR = JSON.parse(arrayBusquedasRecientes)

        
        
        if (!arrayBR.some((e) => e.contenido === q))
        {
            if (arrayBR.length < 10)
                {
                    arrayBR.push({contenido: q, fecha: new Date().getTime()})
                    localStorage.setItem("busquedas_recientes", JSON.stringify(arrayBR))
                } else {
                    let ordenado = arrayBR.sort(function(a,b){
                        
                        return new Date(a.fecha) - new Date(b.fecha)
                      })
                    ordenado[0] = {contenido: q, fecha: new Date().getTime()}
                    localStorage.setItem("busquedas_recientes", JSON.stringify(ordenado.sort(function(a,b){
                        
                        return new Date(b.fecha) - new Date(a.fecha)
                      })))
                }
        }
    }
    

    fetch("http://localhost:8080/busqueda",
        {
            method: 'POST',
            body: JSON.stringify({
                contenido: q,
                offsetC: offsetC,
                offsetV: offsetV,
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
                    let resultados = datos.mensaje
                    let mixResultados = resultados.canales.concat(resultados.videos)
                    
                    if (mixResultados.length > 0)
                    {
                        let almacenarAleatorio = []
                        let contador = 0
        
                        for (let k = 0; k < mixResultados.length; k++)
                        {
                            almacenarAleatorio = MostrarTodosSR(mixResultados, Math.floor(Math.random() * mixResultados.length), almacenarAleatorio)
                        }
        
                        for (let i = 0; i < almacenarAleatorio.length; i++)
                        {
        
                            contador++
                            let nuevoContenedor = document.createElement("a")
                            if (mixResultados[almacenarAleatorio[i]].tipo === "video")
                            {
                                nuevoContenedor.setAttribute("class", "flex gap-5 shrink-0")
                                nuevoContenedor.href = `./videos.php?ref=${mixResultados[almacenarAleatorio[i]].link.ruta}`
                            } else {
                                nuevoContenedor.setAttribute("class", "flex items-center gap-5 shrink-0")
                                nuevoContenedor.href = `./canal.php?ref=${mixResultados[almacenarAleatorio[i]].nombre_canal}`
                            }
        
                            nuevoContenedor.setAttribute("id", `resultado_${(offsetC + offsetV) + i}`)
                            
        
                            nuevoContenedor.innerHTML = `
                                ${mixResultados[almacenarAleatorio[i]].tipo === "video" ? (
                                    `
                                        <div class='rounded-md relative'>
                                            <div class='min-w-[320px] max-w-[320px] h-[180px] '>
                                            <img src="${mixResultados[almacenarAleatorio[i]].media.miniatura}" class='rounded-md min-h-[180px] max-h-[180px] max-w-[320px] min-w-[320px] object-cover bg-cover bg-no-repeat bg-center' />
                                            </div>
                                            <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-0 mb-1 bottom-0 mr-1'>
                                                <div class='text-white select-none font-Inter text-[10px]'>${mixResultados[almacenarAleatorio[i]].estadisticas.duracion}</div>
                                            </div>
                                        </div>
                                        <div class='flex flex-col gap-2.5'>
                                            <div class='flex flex-col gap-1'>
                                            <div class='font-Geist text-[15px]'>
                                                ${mixResultados[almacenarAleatorio[i]].contenido.titulo}
                                            </div>
                                            <div class='flex items-center gap-2'>
                                                <div class='font-Geist text-[11px] text-gray-600'>
                                                    ${mixResultados[almacenarAleatorio[i]].estadisticas.visitas} visualizaciones
                                                </div>
        
                                                <div class='font-Geist text-[11px] text-gray-600'>
                                                    ·
                                                </div>
        
                                                <div class='font-Geist text-[11px] text-gray-600'>
                                                    ${mixResultados[almacenarAleatorio[i]].estadisticas.fecha.fecha_creacion}
                                                </div>
                                            </div>
                                            </div>
                                            <div class='flex items-center gap-2'>
                                                <div class='w-6 h-6 rounded-full overflow-hidden'>
                                                    <img src='${mixResultados[almacenarAleatorio[i]].canal.media.avatar_usuario}' class='w-6 h-6 rounded-full bg-center bg-cover bg-no-repeat' />
                                                </div>
                                                <div class='font-Geist text-xs text-gray-600'>
                                                    ${mixResultados[almacenarAleatorio[i]].canal.nombre_usuario}
                                                </div>
                                            </div>
                                            <div class='flex flex-col gap-2'>
                                                <p class='font-Geist text-xs text-gray-600 line-clamp-1'>
                                                    ${mixResultados[almacenarAleatorio[i]].contenido.descripcion}
                                                </p>
        
                                                <div class='font-Geist text-[11px] rounded-md border px-2 py-0.5 w-fit'>
                                                    ${mixResultados[almacenarAleatorio[i]].categoria}
                                                </div>
                                            </div>
                                        </div>
                                    `
                                ) : (
                                    `
                                        <div class='min-w-[320px] w-[320px]'>
                                            <div class='rounded-full overflow-hidden flex items-center justify-center'>
                                                <img src='${mixResultados[almacenarAleatorio[i]].usuario.media.avatar}' class='w-36 h-36 rounded-full bg-center bg-cover bg-no-repeat' />
                                            </div>
                                        </div>
                                        <div class='flex flex-col gap-1'>
                                            <div class='font-Geist text-[15px]'>
                                                ${mixResultados[almacenarAleatorio[i]].usuario.nombre}
                                            </div>
                                            <div class='flex flex-col gap-1'>
                                                <div class='flex items-center gap-2'>
                                                    <div class='font-Geist text-gray-600 text-[13px]'>
                                                        ${mixResultados[almacenarAleatorio[i]].nombre_canal}
                                                    </div>
        
                                                    <div class='font-Geist text-gray-600 text-[13px]'>
                                                        ·
                                                    </div>
        
                                                    <div class='font-Geist text-gray-600 text-[13px]'>
                                                        ${mixResultados[almacenarAleatorio[i]].estadisticas.total_suscriptores} suscriptores
                                                    </div>
                                                </div>
                                            </div>
                                            ${mixResultados[almacenarAleatorio[i]].info.descripcion ? (
                                                `
                                                <div>
                                                    <p class='font-Geist text-xs text-gray-600 line-clamp-1'>
                                                    ${mixResultados[almacenarAleatorio[i]].info.descripcion}
                                                </p>
                                                </div>
                                                `
                                            ) : (``)}
                                        </div>
                                        
                                    `
                                )}
                            
                            `
        
                            contenedor_resultados_busqueda.appendChild(nuevoContenedor)
        
                            if (contador === mixResultados.length && (resultados.paginacion.canales || resultados.paginacion.videos))
                            {
                                let ultimoResultado = document.getElementById(`resultado_${(offsetC + offsetV) + i}`)
                                
        
                                if (ultimoResultado)
                                {
                                    ObservarElemento(ultimoResultado, contenedor_ref, false, true, () => BuscarResultados(offsetC + 3, offsetV + 17))
                                }
                            }
        
                        }
        
                    } else {
        
                        let mostrarVacio = document.createElement("div")
        
                        mostrarVacio.setAttribute("class", "flex flex-col gap-4 items-center justify-center h-full")
        
                        mostrarVacio.innerHTML = `
                        
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path d="M81.94 90.44c12.582 0 22.78-10.198 22.78-22.78 0-12.581-10.198-22.78-22.78-22.78S59.16 55.079 59.16 67.66s10.198 22.78 22.78 22.78Z" fill="#F3F7FF" stroke="#1F64E7" stroke-width="1.7"/><path fill-rule="evenodd" clip-rule="evenodd" d="M78.29 85.336q1.793.332 3.65.344c9.953 0 18.02-8.067 18.02-18.02s-8.067-18.02-18.02-18.02c-2.557 0-4.989.532-7.192 1.493a18.1 18.1 0 0 0-8.859 8.328 17.9 17.9 0 0 0-1.969 8.199 17.95 17.95 0 0 0 4.545 11.965" fill="#fff"/><path d="M78.29 85.336q1.793.332 3.65.344c9.953 0 18.02-8.067 18.02-18.02s-8.067-18.02-18.02-18.02c-2.557 0-4.989.532-7.192 1.493a18.1 18.1 0 0 0-8.859 8.328 17.9 17.9 0 0 0-1.969 8.199 17.95 17.95 0 0 0 4.545 11.965m2.117 2.026a18 18 0 0 0 4.899 2.837" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path d="m100.64 85.68 4.08 4.08" stroke="#1F64E7" stroke-width="1.7"/><path fill-rule="evenodd" clip-rule="evenodd" d="M104.06 89.1a3.3 3.3 0 0 0 0 4.661l7.539 7.539a3.296 3.296 0 0 0 4.661-4.661l-7.539-7.539a3.3 3.3 0 0 0-4.661 0Z" fill="#E8F0FE" stroke="#1F64E7" stroke-width="1.7"/><path d="m107.44 90.44 7.48 7.48" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M77.52 59.84c0 7.886 6.394 14.28 14.28 14.28a14.3 14.3 0 0 0 4.438-.703c-2.28 5.658-7.822 9.653-14.298 9.653-8.51 0-15.409-6.899-15.409-15.41 0-7.711 5.664-14.1 13.059-15.231a14.2 14.2 0 0 0-2.07 7.411" fill="#E8F0FE"/><path d="M82.28 55.08c-.865 0-1.712.085-2.53.247m-2.471.756C72.627 58.039 69.36 62.637 69.36 68" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/><path d="M118.44 67.849h-5.56m9.86-5.289h-11.68zm4.76 0h-1.51zM57.24 82.809h-5.56m2.38-5.969H42.38zm-15.64 0h-2.87z" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </div>
                            <div class='font-Geist text-[13px]'>
                                No se han encontrado resultados relacionados con "${q}"
                            </div>
                        `
        
                        contenedor_resultados_busqueda.appendChild(mostrarVacio)
                    }
                }
        } catch(error)
        {
            console.error(error)
        } finally {
            clearTimeout(timeout)

            let loaderResultadosBusquedas = document.getElementById("loaderResultadosBusquedas")

            if (loaderResultadosBusquedas)
            {
                contenedor_resultados_busqueda.removeChild(loaderResultadosBusquedas)
            }
        }

    })
}

BuscarResultados(0, 0)

function MostrarTodosSR(array, posicion, nuevo)
{

    let almacen = nuevo

    if (!nuevo.includes(posicion))
    {
        almacen.push(posicion)        
    } else {

        let x = Math.floor(Math.random() * array.length)

        if (nuevo.includes(x))
        {
            MostrarTodosSR(array, posicion, nuevo)
        }
        else {
            almacen.push(x)
        }
    }

    return almacen


}
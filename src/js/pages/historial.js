
let contenedor_historial = document.getElementById("contenedor_historial")
let contenedor_ref = document.querySelector(".contenedor_ref")
let busqueda_ipt_historial = document.getElementById("busqueda_ipt_historial")
let almacenarFechas = [
    
]

function ObtenerHistorial(offset = 0)
{   
    if (!localStorage.getItem("logged")) return; 
        
    
        fetch(`http://localhost:8080/historial/obtener`,
            {
                method: 'POST',
                body: JSON.stringify({
                    offset: offset,
                    busqueda: busqueda_ipt_historial.value.trim(),
                }),
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
                contenedor_historial.innerHTML =''
                if (datos.mensaje.historial.length > 0)
                {
                    FiltrarPorFecha(datos)
                let contador = 0
                for (let c = 0; c < almacenarFechas.length; c++)
                {
                    
                    let contenedorFecha = document.createElement("div")
                    contenedorFecha.setAttribute("class", "flex flex-col gap-5")

                    contenedorFecha.innerHTML = `

                        <div>
                            <h2 class='font-Geist text-lg'>
                                ${almacenarFechas[c].fecha_f.trim().startsWith("0") ? almacenarFechas[c].fecha_f.substring(1, almacenarFechas[c].fecha_f.length) : almacenarFechas[c].fecha_f.trim()}
                            </h2>
                        </div>
                    
                    `

                    let contenedor_filtrados = document.createElement("div")
                    contenedor_filtrados.setAttribute("class", "flex flex-col gap-5")

                    for (let i = 0; i < almacenarFechas[c].videos_fecha.length; i++)
                    {
                        contador++
                        let videoTarjeta = document.createElement("a")
                        videoTarjeta.href = './videos.php?ref=' + almacenarFechas[c].videos_fecha[i].link.ruta
                        videoTarjeta.setAttribute("id", `video_${contador}`)

                        videoTarjeta.innerHTML = `
                            <div  class='flex items-center gap-4 w-full group'>
                                        <div class='w-[170px] h-[100px] relative'>
                                            <img src='${almacenarFechas[c].videos_fecha[i].media.miniatura}' class='rounded-md object-cover bg-cover bg-no-repeat bg-center w-[170px] h-[100px]'>
                                            <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-0 mb-1 bottom-0 mr-1'>
                                                <div class='text-white select-none font-Inter text-[10px]'>${Math.trunc(almacenarFechas[c].videos_fecha[i].info.duracion / 60) < 10 ? "0" + String(Math.trunc(almacenarFechas[c].videos_fecha[i].info.duracion/ 60)) : String(Math.trunc(almacenarFechas[c].videos_fecha[i].info.duracion/ 60))}:${almacenarFechas[c].videos_fecha[i].info.duracion % 60 < 10 ? "0" + String(almacenarFechas[c].videos_fecha[i].info.duracion % 60) : almacenarFechas[c].videos_fecha[i].info.duracion % 60}</div>
                                            </div>
                                        </div>
                                        <div class='flex flex-col gap-2 w-[70%]'>
                                            <div class='flex flex-col gap-2'>
                                                <div class='font-Inter text-sm w-full'>
                                                <div class='line-clamp-1 block truncate'>
                                                    ${almacenarFechas[c].videos_fecha[i].contenido.titulo}
                                                </div>
                                            </div>
                                            <div class='flex items-center gap-2'>
                                                <div class='font-Inter text-xs text-gray-700'>
                                                    ${almacenarFechas[c].videos_fecha[i].info.visitas} visitas · ${almacenarFechas[c].videos_fecha[i].info.fechas.fecha_creacion} 
                                                </div>
                                            </div>
                                            <div class='flex items-center gap-2'>
                                                <div>
                                                    <img src='${almacenarFechas[c].videos_fecha[i].contenido.creador.media.avatar}' class='rounded-md bg-cover bg-no-repeat bg-center w-6 h-6'>
                                                </div>
                                                <div class='font-Lexend text-xs'>
                                                    ${almacenarFechas[c].videos_fecha[i].contenido.creador.nombre}
                                                </div>
                                            </div>
                                            </div>
                                            
                                        </div>
                                        </div>
                        
                        `
                

                        contenedor_filtrados.appendChild(videoTarjeta)
                    }

                    contenedorFecha.appendChild(contenedor_filtrados)
                    contenedor_historial.appendChild(contenedorFecha)

                    if (c < almacenarFechas.length)
                    {
                        let separador = document.createElement("hr")
                        contenedor_historial.appendChild(separador)
                    }

                    
                        if (contador === offset+20 && datos.mensaje.mas)
                        {
                            let ultimoVideoVisto = document.getElementById(`video_${contador}`)

                            if (ultimoVideoVisto)
                            {
                                ObservarElemento(ultimoVideoVisto, contenedor_ref, false, true, () => ObtenerHistorial(offset+20))
                            }
                        }
                }
                } else {

                    let svgVacio = document.createElement("div")
                    svgVacio.setAttribute("class", "flex flex-col gap-2 items-center justify-center")
                    
                    svgVacio.innerHTML = `
                    
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M140.76 44.2a4.76 4.76 0 1 1 0 9.52h-27.2a4.76 4.76 0 1 1 0 9.52h14.96a4.76 4.76 0 1 1 0 9.52h-6.918c-3.314 0-6.002 2.131-6.002 4.76q0 2.629 4.08 4.76a4.76 4.76 0 1 1 0 9.52H63.24a4.76 4.76 0 1 1 0-9.52H36.72a4.76 4.76 0 1 1 0-9.52h27.2a4.76 4.76 0 1 0 0-9.52h-17a4.76 4.76 0 1 1 0-9.52h27.2a4.76 4.76 0 1 1 0-9.52zm0 19.04a4.76 4.76 0 1 1 0 9.52 4.76 4.76 0 0 1 0-9.52" fill="#F3F7FF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M49.484 63.92h-.644c-4.124 0-7.466-3.337-7.466-7.455s3.343-7.455 7.466-7.455h.08c.663-5.772 5.388-10.25 11.118-10.25 6.04 0 10.963 4.973 11.191 11.197 3.652.236 6.865 3.79 6.865 7.496 0 3.043-2.254 6.467-4.923 6.467H54.605" fill="#fff"/><path d="M49.484 63.92h-.644c-4.124 0-7.466-3.337-7.466-7.455s3.343-7.455 7.466-7.455h.08c.663-5.772 5.388-10.25 11.118-10.25 6.04 0 10.963 4.973 11.191 11.197 3.652.236 6.865 3.79 6.865 7.496 0 3.043-2.254 6.467-4.923 6.467H54.605" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/><path d="M88.4 32.81c12.66 0 22.95 10.462 22.95 23.399 0 3.985-1.673 9.183-5.155 15.641-3.254 6.037-8.049 13.103-14.397 21.2l-1.29 1.633a3 3 0 0 1-.293.315l-.107.094a2.67 2.67 0 0 1-3.724-.3l-.091-.109C79.301 85.899 74.077 78.29 70.606 71.85c-3.482-6.457-5.154-11.656-5.155-15.641 0-12.938 10.29-23.399 22.95-23.399Z" fill="#fff" stroke="#1F64E7" stroke-width="1.7"/><path fill-rule="evenodd" clip-rule="evenodd" d="M70.736 66.808a64 64 0 0 0 1.999 4.083c3.25 6.114 8.167 13.388 14.798 21.835a1.08 1.08 0 0 0 1.565.175q.093-.078.169-.175c6.631-8.448 11.548-15.722 14.798-21.835 3.276-6.163 4.735-10.924 4.735-14.407 0-8.612-4.963-15.984-12.056-19.281a46.2 46.2 0 0 1-3.856 9.304c3.843 1.742 6.522 5.654 6.522 10.199 0 6.167-4.929 11.166-11.01 11.166-4.098 0-7.672-2.27-9.568-5.637a46.5 46.5 0 0 1-8.097 4.573" fill="#E8F0FE"/><path d="M76.786 93.996a.849.849 0 1 0-.299-1.673zm-5.041-.564a.85.85 0 1 0 .488 1.629zM69.5 96.039a.85.85 0 1 0-.673-1.561zm31.172-3.65a.85.85 0 1 0-.311 1.671zm-24.185-.065a43 43 0 0 0-4.742 1.108l.488 1.629a42 42 0 0 1 4.553-1.064zm-7.66 2.154c-1.485.639-2.725 1.377-3.607 2.212s-1.471 1.837-1.471 2.974h1.7c0-.51.258-1.094.94-1.74s1.724-1.289 3.11-1.885zm-5.078 5.186c0 1.427.919 2.632 2.213 3.594 1.31.974 3.152 1.815 5.352 2.506 4.41 1.387 10.45 2.23 17.084 2.23v-1.7c-6.51 0-12.371-.831-16.574-2.152-2.107-.662-3.75-1.433-4.848-2.249-1.114-.828-1.527-1.591-1.527-2.229zm24.65 8.33c6.634 0 12.674-.844 17.084-2.23 2.2-.691 4.042-1.532 5.352-2.506 1.295-.962 2.213-2.167 2.213-3.594h-1.7c0 .639-.413 1.401-1.527 2.229-1.098.816-2.742 1.587-4.848 2.249-4.204 1.321-10.064 2.152-16.574 2.152zm24.65-8.33c0-1.882-1.581-3.382-3.665-4.507-2.154-1.163-5.169-2.109-8.713-2.768l-.311 1.671c3.451.643 6.277 1.546 8.216 2.593 2.009 1.084 2.772 2.152 2.772 3.011z" fill="#1F64E7"/><path stroke="#1F64E7" stroke-width="1.7" d="M99.11 56.44A10.71 10.71 0 0 1 88.4 67.15a10.71 10.71 0 0 1-10.71-10.71 10.71 10.71 0 0 1 21.42 0z"/><path clip-rule="evenodd" d="M117.497 38.912a6.12 6.12 0 0 0-3.409-3.409l-1.208-.483 1.208-.483a6.12 6.12 0 0 0 3.409-3.41l.483-1.207.483 1.208a6.12 6.12 0 0 0 3.409 3.409l1.208.483-1.208.483a6.12 6.12 0 0 0-3.409 3.41l-.483 1.207z" stroke="#75A4FE" stroke-width="1.7" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M103.83 87.04h-.47a5.44 5.44 0 0 1 0-10.88h.058c.484-4.213 3.927-7.48 8.102-7.48 4.401 0 7.988 3.629 8.154 8.171 2.661.172 5.003 2.766 5.003 5.47 0 2.221-1.642 4.719-3.588 4.719h-13.528" fill="#fff"/><path d="M103.83 87.04h-.47a5.44 5.44 0 0 1 0-10.88h.058c.484-4.213 3.927-7.48 8.102-7.48 4.401 0 7.988 3.629 8.154 8.171 2.661.172 5.003 2.766 5.003 5.47 0 2.221-1.642 4.719-3.588 4.719h-13.528" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/></svg>
                        </div>
                        <div class='font-Geist text-[13px]'>
                            El historial está vacio o no se ha encontrado el video que buscabas.
                        </div>
                    
                    `

                    contenedor_historial.appendChild(svgVacio)
                }


            }
            
        })
    
}


ObtenerHistorial()

function FiltrarPorFecha(datos) 
{
    
    let historial = datos.mensaje.historial

    for (let i = 0; i < historial.length; i++)
    {

        if (!ComprobarExistencia(historial[i].info.fechas.fecha_visualizacion))
        {
            almacenarFechas.push(
                {
                    fecha_f: historial[i].info.fechas.fecha_visualizacion,
                    videos_fecha: [historial[i]]
                }
            )
        } else {

            almacenarFechas[PosicionFecha(historial[i].info.fechas.fecha_visualizacion)].videos_fecha.push(historial[i])
        }

    }
}

function ComprobarExistencia(fecha) 
{

    for (let k = 0; k < almacenarFechas.length; k++)
    {
        if (almacenarFechas[k].fecha_f === fecha)
        {
            return true
        }
    }

    return false
}

function PosicionFecha(fecha)
{
    for (let k = 0; k < almacenarFechas.length; k++)
    {
        if (almacenarFechas[k].fecha_f === fecha)
        {
            return k
        }
    }
    
    return 0
}

busqueda_ipt_historial.addEventListener("input", () => {
    almacenarFechas = []
    ObtenerHistorial()
})
let contenedor_ref = document.getElementById("contenedor_ref")
let contenedor_suscripciones_usuario = document.getElementById("contenedor_suscripciones_usuario")
let suscripcionesActuales = []

function ObtenerSuscripciones(offset = 0) {

    fetch(`http://localhost:8080/suscripciones/obtener`,
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

            if (datos.codigo === 200) {
                let suscripciones = datos.mensaje.suscripciones

                if (suscripciones.length > 0)
                {
                    suscripcionesActuales.push(...suscripciones)
                    MostrarCanales(offset, datos.mensaje.mas)

                } else {
                    VerificarVacio()
                }
            }
        })
}

ObtenerSuscripciones()


function MostrarCanales(offset, mas)
{
    for (let j = offset; j < suscripcionesActuales.length; j++)
        {

            contenedor_suscripciones_usuario.style.display = 'grid'
            contenedor_suscripciones_usuario.style.gridTemplateColumns  = 'repeat(auto-fill, minmax(110px, 1fr))'
            contenedor_suscripciones_usuario.style.gap = '4rem'
            contenedor_suscripciones_usuario.style.padding = '1rem'

            let nuevoContenedor = document.createElement("div")
            nuevoContenedor.setAttribute("id", "canal_" + (offset+j))
            nuevoContenedor.setAttribute("class", "flex flex-col items-center justify-center gap-2")

            nuevoContenedor.innerHTML = `
            
                <a href=${`./canal.php?ref=` + suscripcionesActuales[j].canal.nombre_canal} class='flex flex-col gap-2 items-center justify-center'>
                    <div>
                        <img src='${suscripcionesActuales[j].media.avatar}' class='rounded-full bg-cover bg-center bg-no-repeat w-20 h-20' />
                    </div>
                    <div title='${suscripcionesActuales[j].nombre}' class='font-Geist text-[13px] line-clamp-1'>
                        ${suscripcionesActuales[j].nombre}
                    </div>
                </a>
                <div>
                    <button onclick='QuitarSuscripcion(${offset+j}, "${suscripcionesActuales[j].canal.nombre_canal}")' class='rounded-full text-white bg-black px-3 font-Geist text-xs py-1.5 transition-opacity duration-150 hover:opacity-80 '>
                        Quitar
                    </button>
                </div>
            `
            
            contenedor_suscripciones_usuario.appendChild(nuevoContenedor)

            if (contenedor_suscripciones_usuario.childElementCount === offset + 20 && mas)
            {

                let ultimoCanal = document.getElementById("canal_" + (offset+j))

                if (ultimoCanal)
                {
                    ObservarElemento(ultimoCanal, contenedor_ref, false, true, () => ObtenerSuscripciones(offset + 20))
                }

            }

            
        }
}

function QuitarSuscripcion(posicion, nombre_canal)
{

    
    
    fetch(`http://localhost:8080/canal/quitar/suscribirse`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                canal: nombre_canal,
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

            if (datos.codigo === 200) {
                console.log(nombre_canal)
                suscripcionesActuales = suscripcionesActuales.filter((e, i) => e.canal.nombre_canal !== nombre_canal)
                console.log(suscripcionesActuales)

                let canal_borrar = document.getElementById("canal_" + posicion)
    
                if (canal_borrar)
                {
                    contenedor_suscripciones_usuario.removeChild(canal_borrar)
                }

                VerificarVacio()
            }
        })

}

function VerificarVacio()
{
    if (suscripcionesActuales.length === 0)
    {

        contenedor_suscripciones_usuario.style.display = 'flex'
        contenedor_suscripciones_usuario.style.height  = '100%'
        contenedor_suscripciones_usuario.style.alignItems  = 'center'
        contenedor_suscripciones_usuario.style.justifyContent  = 'center'

        let vacio = document.createElement("div")
        vacio.setAttribute("class", "flex flex-col items-center justify-center gap-2")
        
        vacio.innerHTML = `
        
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M62.56 95.2c-8.262 0-14.96-6.546-14.96-14.62s6.698-14.62 14.96-14.62q.528 0 1.045.035a23 23 0 0 1-.365-4.115c0-12.769 10.351-23.12 23.12-23.12 10.194 0 18.847 6.597 21.923 15.756a21 21 0 0 1 2.217-.116c11.455 0 20.74 9.134 20.74 20.4 0 10.704-8.381 19.534-19.04 20.385v.015zm8.157 0h-4.736z" fill="#fff"/><path d="M70.717 95.2h-4.736m-3.421 0c-8.262 0-14.96-6.546-14.96-14.62s6.698-14.62 14.96-14.62q.528 0 1.045.035a23 23 0 0 1-.365-4.115c0-12.769 10.351-23.12 23.12-23.12 10.194 0 18.847 6.597 21.923 15.756a21 21 0 0 1 2.217-.116c11.455 0 20.74 9.134 20.74 20.4 0 10.704-8.381 19.534-19.04 20.385v.015z" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M79.296 43.753c0 21.912 19.734 39.967 45.144 42.405-3.184 3.915-8.102 6.572-13.704 6.989v.013H65.105c-5.536 0-14.785-2.332-14.785-12.547s7.19-12.547 14.785-12.547q.485 0 .961.03c-.22-1.146-.259-2.328-.336-3.532-.515-8.135 3.033-18.387 13.578-21.724q-.012.456-.012.913m7.143 34.282c-2.066 0-3.741 1.655-3.741 3.697s1.676 3.697 3.741 3.697c2.067 0 3.741-1.655 3.741-3.697s-1.675-3.697-3.741-3.697" fill="#E8F0FE"/><path d="M86.7 85.68a3.74 3.74 0 1 0 0-7.48 3.74 3.74 0 1 0 0 7.48Z" stroke="#1F64E7" stroke-width="1.7"/><path d="m76.16 74.12 4.76-3.735-4.76-3.556m21.08 7.291-4.76-3.735 4.76-3.556" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M93.16 45.56a12.95 12.95 0 0 1 9.139 9.039" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/><path d="M107.44 34a2.04 2.04 0 1 0 0-4.08 2.04 2.04 0 0 0 0 4.08Z" stroke="#75A4FE" stroke-width="1.36"/><path d="M128.52 44.88a2.04 2.04 0 1 0 0-4.08 2.04 2.04 0 0 0 0 4.08" fill="#75A4FE"/><path d="m112.715 39.275 5.684 5.684m.086-5.684-5.684 5.684zm-69.93 12.13 4.08 4.08m0-4.08-4.08 4.08z" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M57.8 46.92a2.04 2.04 0 1 0 0-4.08 2.04 2.04 0 0 0 0 4.08" fill="#75A4FE"/></svg>
            </div>
            <div class='font-Geist text-[13px]'>
                No estás suscrito a ningún canal
            </div>
        `

        contenedor_suscripciones_usuario.appendChild(vacio)
    }
}
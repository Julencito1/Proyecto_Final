let miniatura_mostrar_contenedor = document.getElementById("miniatura_mostrar_contenedor")
let input_miniatura_crear = document.getElementById("input_miniatura_crear")
let image_src_mostrar = document.getElementById("image_src_mostrar")
let ocultado_inicio_imagen  =document.getElementById("ocultado_inicio_imagen")

let video_mostrar_contenedor = document.getElementById("video_mostrar_contenedor")
let input_video_crear = document.getElementById("input_video_crear")
let video_src_mostrar  =document.getElementById("video_src_mostrar")
let ocultado_inicio_video  =document.getElementById("ocultado_inicio_video")

let contenedor_categorias_listar = document.getElementById("contenedor_categorias_listar")
let btn_menu_categoria = document.getElementById("btn_menu_categoria")
let categoria_seleccionada_actual = document.getElementById("categoria_seleccionada_actual")

let publico_estado_video = document.getElementById("publico_estado_video")
let privado_estado_video = document.getElementById("privado_estado_video")

let enviar_crear_video = document.getElementById("enviar_crear_video")
let input_titulo_crear = document.getElementById("input_titulo_crear")
let textarea_descripcion_crear = document.getElementById("textarea_descripcion_crear")

let mensaje_miniatura = document.getElementById("mensaje_miniatura")
let mensaje_video = document.getElementById("mensaje_video")

let CATEGORIA = "Categoría"
let ESTADO = "publico"
var ESTADO_MENU_CATEGORIA = false


input_miniatura_crear.addEventListener("change", (e) => {

    mensaje_miniatura.textContent = e.target.files[0].name
  
})

input_video_crear.addEventListener("change", (e) => {

    mensaje_video.textContent = e.target.files[0].name
   
})


function ObtenerCategorias()
{
    if (!localStorage.getItem("logged")) return

    fetch("https://proyectofinalapi-production-0ce0.up.railway.app/categorias/todas/obtener",
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
            let categorias = datos.mensaje.categorias

            for (let i = 0; i < categorias.length; i++)
            {
                let nuevo = document.createElement("button")
                
                nuevo.setAttribute("class", "rounded-md font-Geist text-xs px-2 py-1.5 text-left transition-colors duration-150 hover:bg-gray-100")

                nuevo.innerHTML = `
                
                ${categorias[i].nombre}
                `
                

                contenedor_categorias_listar.appendChild(nuevo)
                nuevo.onclick = () => {
                    categoria_seleccionada_actual.textContent = nuevo.textContent
                    CATEGORIA = nuevo.textContent
                }
            }
        }

    })
}

ObtenerCategorias()

btn_menu_categoria.addEventListener("click", () => {

    if (ESTADO_MENU_CATEGORIA)
    {
        CategoriasMenuOut()
    } else {
        CategoriasMenuIn()
    }
})

function CrearVideo() {
    if (
        CATEGORIA === "Categoría" ||
        !input_miniatura_crear.files[0] ||
        !input_video_crear.files[0] ||
        input_titulo_crear.value.trim() === "" ||
        textarea_descripcion_crear.value.trim() === ""
    ) {
        alert("Los campos no pueden estar vacios")
        return
    }

    const timeout = setTimeout(() => {

        enviar_crear_video.innerHTML = `
            
            <div class='animate-spin'>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle-icon lucide-loader-circle"><path d="M18.375 10.5a7.875 7.875 0 1 1-5.442-7.49"/></svg>
            </div>
            <div>
            Publicando video...
            </div>
            `

    }, 200)

    const archivoVideo = input_video_crear.files[0];


    obtenerDuracionVideo(archivoVideo)
        .then(duracion => {
            const duracionSegundos = Math.trunc(duracion);

            if (duracionSegundos > 3000) {
                alert("El video no puede durar más de 50 minutos.");
                return;
            }

            const formData = new FormData();
            formData.append("miniatura", input_miniatura_crear.files[0]);
            formData.append("video", archivoVideo);
            formData.append("duracion", duracionSegundos);
            formData.append("categoria", CATEGORIA.trim());
            formData.append("estado", ESTADO);
            formData.append("titulo", input_titulo_crear.value);
            formData.append("descripcion", textarea_descripcion_crear.value);

            fetch("https://fileserver-proyectofinal.vercel.app/crear/video", {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("logged")}`
                }
            })
            .then((res) => {
                if (!res.ok) throw new Error("ERROR");
                return res.json();
            })
            .then((datos) => {
                try {
                    if (datos.codigo === 200) {

                        let tab = datos.mensaje.estado === "publico" ? "tab=videos" : "tab=videos-privados"
                        window.location.href = "./canal.html?ref=" + datos.mensaje.canal + "&" + tab
                        
                    }
                }
                catch(error)
                {
                    console.error(error)
                }
                finally {
                    clearTimeout(timeout)
                    enviar_crear_video.innerHTML = `Publicar video`
                }
            })
            .catch(error => {
                console.error("Error al subir video:", error);
            });
        })
        .catch(err => {
            console.error("No se pudo obtener la duración del video:", err);
        });
}


privado_estado_video.addEventListener("click", () => {
    ESTADO = "privado"
})

publico_estado_video.addEventListener("click", () => {
    ESTADO = "publico"
})

enviar_crear_video.addEventListener("click", () => {

    CrearVideo()
})

function obtenerDuracionVideo(file) {

    return new Promise((resolve, reject) => {

        const video = document.createElement('video')

        video.preload = 'metadata'

        video.onloadedmetadata = function () {

            URL.revokeObjectURL(video.src)
            resolve(video.duration)
        }

        video.onerror = function () {
            reject("No se pudo cargar el video para obtener su duración.")
        }

        video.src = URL.createObjectURL(file)
    });
}
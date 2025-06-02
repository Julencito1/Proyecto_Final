<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Videos Guardados - NewTube</title>
  <link href='../../styles/styles.css' rel='stylesheet'>
  <link href="../../output.css" rel="stylesheet">
  <link rel="stylesheet" href="../../styles/fonts.css">
  <link rel="icon" type="image/x-icon" href="../../assets/favicon/newtube.ico">
</head>
<body>
  <div id="plantilla">
    <?php include '../../components/header.php'; ?>
    <main id='main' class="contenedor_ref px-5 overflow-auto h-[100vh-50px]">
        <div class="flex flex-col w-[1284px] pt-10 mx-auto">
          <div>
            <h2 class="font-Poppins font-medium text-lg">
              Videos Guardados  
            </h2>
          </div>
          <div class="flex items-center justify-between sticky top-0 z-30 bg-[#FDFDFD] py-5">
            <div class="relative">
              <div>
                <input id="busqueda_ipt" type="text" class="border rounded-md py-1.5 font-Inter text-xs px-6 outline-none" placeholder="Buscar por título...">
              </div>
              <div class="absolute top-1.5 left-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22.5 22.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m19.688 19.688-4.069-4.069m2.194-5.306a7.5 7.5 0 0 1-7.5 7.5 7.5 7.5 0 0 1-7.5-7.5 7.5 7.5 0 0 1 15 0"/></svg>
              </div>
            </div>
            <div>
              <div id="contenedor_filtros_videos_guardar" class="relative">
                <button id="btnFiltros_videos_guardar" class="font-Inter text-[13px] px-3 py-[4.25px] rounded-md border flex items-center gap-2 transition-colors duration-150 hover:bg-gray-50">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22.5 22.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-filter-icon lucide-list-filter"><path d="M2.813 5.625h16.875M6.563 11.25h9.375m-6.563 5.625h3.75"/></svg>
                    </div>
                    Filtros
                </button>
                <div id="subContenedor_filtros_videos_guardar" class="absolute origin-top-right p-2 right-0 w-52 bg-white flex flex-col rounded-md border shadow-md hidden">
                  <div>
                    <button id="mas_visualizaciones" class="w-full flex items-center gap-2 justify-between rounded-md px-3 py-1.5 font-Inter text-[13px] text-left transition-colors duration-150 hover:bg-gray-50">
                      Más visualizaciones
                    </button>
                  </div>
                  <div>
                    <button id="menos_visualizaciones" class="w-full flex items-center gap-2 justify-between rounded-md px-3 py-1.5 font-Inter text-[13px] text-left transition-colors duration-150 hover:bg-gray-50">
                      Menos visualizaciones
                    </button>
                  </div>
                  <div>
                    <button id="mas_antiguos" class="w-full flex items-center gap-2 justify-between rounded-md px-3 py-1.5 font-Inter text-[13px] text-left transition-colors duration-150 hover:bg-gray-50">
                      Más antiguos
                    </button>
                  </div>
                  <div>
                    <button id="mas_recientes" class="w-full flex items-center gap-2 justify-between rounded-md px-3 py-1.5 font-Inter text-[13px] text-left transition-colors duration-150 hover:bg-gray-50">
                      Más recientes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr >

          <div id="contenedor_videos_guardados" class="flex flex-col gap-4 pt-5">

          </div>
        </div>
    </main>
    <?php include '../../components/sidebar.php'; ?>
  </div>
  <script src="../../js/components/sidebar.js"></script>
  <script src="../../js/components/header.js"></script>
  <script src="../../js/main.js"></script>
  <script src="../../js/animaciones/animaciones.js"></script>
  <script src="../../js/pages/videos/guardados.js"></script>
  <script src="../../js/utils/observer.js"></script>

</body>
</html>

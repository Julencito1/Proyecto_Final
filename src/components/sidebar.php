<aside id="sidebar" class="px-4 py-2 flex flex-col gap-4 overflow-hidden">
      <div>
        <div>
          <a id="inicio" href="/" title="Inicio" class="sidebar_nav flex  items-center gap-2 cursor-pointer transition-colors duration-150 rounded-md px-2 h-[34px] w-full hover:bg-[#f2f2f2]">
            <div>
              <svg id="svg_inicio" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </div>
            <div class="txt text-[13.2px] font-Roboto">Inicio</div>
          </a>
        </div>
      </div>

      <hr class="border-[#e6e6e6]" />
      

      <div>
        <div>
          <a id="historial" href="./pages/historial.php" title="Historial" class="sidebar_nav  flex  items-center gap-2 cursor-pointer transition-colors duration-150 rounded-md px-2 h-[34px] w-full hover:bg-[#f2f2f2]">
            <div>
              <svg id='svg_historial' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history-icon lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
            </div>
            <div class="txt text-[13.2px] font-Roboto">Historial</div>
</a>
        </div>
  
        <div>
          <a id="me_gusta" href="#" title="Me Gusta" class="sidebar_nav flex  items-center gap-2 cursor-pointer transition-colors duration-150 rounded-md px-2 h-[34px] w-full hover:bg-[#f2f2f2]">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
            </div>
            <div class="txt text-[13.2px] font-Roboto">Marcados</div>
          </a>
        </div>

        <div>
          <a id="videos_guardados" href="./pages/videos/guardados.php" title="Videos Guardados" class="sidebar_nav flex  items-center gap-2 cursor-pointer transition-colors duration-150 rounded-md px-2 h-[34px] w-full hover:bg-[#f2f2f2]">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clapperboard-icon lucide-clapperboard"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>
            </div>
            <div class="txt text-[13.2px] font-Roboto">Videos Guardados</div>
          </a>
        </div>
      </div>  

      <hr class="border-[#e6e6e6]" />

      <div>
        <div>
          <a id="suscripciones" href="#" title="Suscripciones" class="sidebar_nav  flex  items-center gap-2 cursor-pointer transition-colors duration-150 rounded-md px-2 h-[34px] w-full hover:bg-[#f2f2f2]">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-podcast-icon lucide-podcast"><path d="M16.85 18.58a9 9 0 1 0-9.7 0"/><path d="M8 14a5 5 0 1 1 8 0"/><circle cx="12" cy="11" r="1"/><path d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z"/></svg>
            </div>
            <div class="txt text-[13.2px] font-Roboto">Suscripciones</div>
          </a>
        </div>
      
        <div id="loader_suscripciones_sidebar" class="flex items-center justify-center hidden mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-icon lucide-loader"><path d="M9 1.5v3"/><path d="m12.144 5.844 2.172 -2.172"/><path d="M13.5 9h3"/><path d="m12.144 12.144 2.172 2.172"/><path d="M9 13.5v3"/><path d="m3.672 14.328 2.172 -2.172"/><path d="M1.5 9h3"/><path d="m3.672 3.672 2.172 2.172"/></svg>
        </div>
        <div id="contenedor_suscripciones" class="hidden">
          
        </div>
      </div>
    </aside>
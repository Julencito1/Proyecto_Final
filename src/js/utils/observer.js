
function ObservarElemento(elemento, root, list = false, unobserve, accion)
{
    const obs = new IntersectionObserver((entries) => {
        
        entries.forEach((m) => {
    
            if (m.isIntersecting)
            {
                unobserve ? obs.unobserve(elemento) : null
                accion()
            }
        })

    }, {
        root: root,
        threshold: 0.5,
    })

    list ? elemento.forEach((j) => obs.observe(j)) : obs.observe(elemento)
} 
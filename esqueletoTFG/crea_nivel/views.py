from django.shortcuts import render

def crea(request):
    """
    Función vista para la página inicio del sitio.
    """
    
    # Renderiza la plantilla HTML index.html con los datos en la variable contexto
    return render(
        request,
        'crea.html',
    )

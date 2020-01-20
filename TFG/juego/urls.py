from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^$', views.titlescreen, name='titlescreen'),
    url(r'^juego/$', views.index, name='index'),
    url(r'^crea_nivel/$', views.crea, name='crea'),
	url(r'^sube/$', views.sube, name='sube'),
]
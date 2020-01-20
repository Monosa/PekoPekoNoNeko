from django.contrib import admin
from .models import Song
# Register your models here.

#admin.site.register(Song)
# Define the admin class
class SongAdmin(admin.ModelAdmin):
    list_display = ('name', 'author')
    list_filter = ('name', 'author')

# Register the admin class with the associated model
admin.site.register(Song, SongAdmin)
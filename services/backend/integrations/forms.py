from django import forms


class GenreForm(forms.Form):
    genre = forms.CharField(label="genre", max_length=100)

class MovieForm(forms.Form):
    title = forms.CharField(label="title", max_length=100)
    genre = forms.CharField(label="genre", max_length=100)
    year = forms.IntegerField(label="year")

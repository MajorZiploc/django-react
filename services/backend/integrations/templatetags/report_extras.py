import json
from django.core.serializers.json import DjangoJSONEncoder
from django.template.defaulttags import register
from django.utils.safestring import mark_safe


@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)


@register.filter
def is_subdict(dictionary, key):
    return isinstance(dictionary.get(key), dict)


@register.filter
def to_safe_json(item):
    return mark_safe(json.dumps(item, cls=DjangoJSONEncoder))


@register.filter
def multiply(value, arg):
    return value * arg


@register.simple_tag
def js_imports():
    return set()


@register.simple_tag
def add_js_import(imports, name):
    imports.add(name)
    return ""

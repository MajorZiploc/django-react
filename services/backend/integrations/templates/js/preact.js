{% if "preact" not in imports %}
{% add_js_import imports "preact" %}
// include dependencies here
{% if devtools_enabled %}
import 'https://unpkg.com/preact@latest/devtools/dist/devtools.module.js?module';
import { h, render } from 'https://unpkg.com/preact@latest?module';
import { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from "https://unpkg.com/htm@latest/dist/htm.module.js?module";
const html = htm.bind(h);
{% else %}
import { render, html, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'https://unpkg.com/htm/preact/standalone.module.js';
{% endif %}
{% endif %}

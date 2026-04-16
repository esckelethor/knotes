const WATERMARK = 'CLASES COREANO > APRENSPAN > GRAMATICA MERGE > 0-24.pdf > Resumen 15';
//FINALIZAR CREAR VARIABLES PARA LAS TAGS
TAG_FEATURE = 'feature';
TAG_BUGFIX = 'bugfix';
TAG_CONTENT = 'content';

changelog = [
    {
        version: '3.1',
        tags: [TAG_BUGFIX],
        changes: ['Estandarización modales', 'Update & fixes vQuery', 'Estandarización variables', 'Inicio restructuración modulo changelog'],
        fixes: ['El contenido se carga en blanco']
    },
    {
        version: '3.0',
        tags: [TAG_FEATURE],
        changes: ['Implementación multilenguaje', 'Nuevo sistema de tagging', 'Unificación de estilos'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.8',
        tags: [TAG_CONTENT],
        changes: ['Correcciones en apuntes de gramática: partículas 가/이 y 은/는', 'Agregar contenido vocabulario: hora',
            'Agregar contenido gramática: estilos de formalidad, partícula 에, partícula 의, adverbios de lugar'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.7',
        tags: [TAG_FEATURE],
        changes: ['Agregar en el changelog sección errores conocidos'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.6',
        tags: [TAG_CONTENT],
        changes: ['Actualizción anexos vocabulario: hangeul III'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.5',
        tags: [TAG_CONTENT, TAG_BUGFIX],
        changes: ['Finalización contenido frases', 'Actualización apuntes en tablas de frases', 'Minorfix carga modulo anexos'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.4',
        tags: [TAG_CONTENT, TAG_FEATURE],
        changes: ['Remake modulos anexos y changelog', 'Actualización información del changelog'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.3',
        tags: [TAG_BUGFIX],
        changes: ['Bugfix changelog', 'Minorfix titulos de contenidos varios'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.2',
        tags: [TAG_CONTENT],
        changes: ['Añadido nuevo contenido: verbos, partículas y números'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.1',
        tags: [TAG_CONTENT],
        changes: ['Añadidos ejercicios vocabulario'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '2.0',
        tags: [TAG_CONTENT, TAG_FEATURE],
        changes: ['Agregar funcionalidad para ejercicios', 'Consolidación de anexos y ejercicios'],
        knownIssues: [{detail: 'El contenido se carga en blanco', workaround: 'Volver a seleccionar el menú'}]
    },
    {
        version: '1.2',
        tags: [TAG_FEATURE],
        changes: ['Agregar changelog', 'Preparación para cambio de versionado']
    },
    {
        version: '1.1',
        tags: [TAG_BUGFIX],
        changes: ['Fix responsive layout para webapp android']
    },
    {
        version: '1.0',
        tags: [TAG_CONTENT, TAG_FEATURE],
        changes: ['Maquetado inicial', 'Estrucutración de menús', 'Definición de páginas base de contenido']
    }
];

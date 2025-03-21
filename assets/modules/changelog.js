const WATERMARK = 'CLASES COREANO > APRENSPAN > GRAMATICA MERGE > 0-24.pdf > Resumen 15';

knownIssues = [
    {
        detail: 'El contenido se carga en blanco',
        workaround: 'Volver a seleccionar el menú'
    }
]

changelog = [
    {
        version: '2.8',
        tags: ['content'],
        changes: ['Correcciones en apuntes de gramática: partículas 가/이 y 은/는', 'Agregar contenido vocabulario: hora',
            'Agregar contenido gramática: estilos de formalidad, partícula 에, partícula 의, adverbios de lugar'
        ]
    },
    {
        version: '2.7',
        tags: ['feature'],
        changes: ['Agregar en el changelog sección errores conocidos']
    },
    {
        version: '2.6',
        tags: ['content'],
        changes: ['Actualizción anexos vocabulario: hangeul III']
    },
    {
        version: '2.5',
        tags: ['content', 'bugfix'],
        changes: ['Finalización contenido frases', 'Actualización apuntes en tablas de frases', 'Minorfix carga modulo anexos']
    },
    {
        version: '2.4',
        tags: ['content', 'feature'],
        changes: ['Remake modulos anexos y changelog', 'Actualización información del changelog']
    },
    {
        version: '2.3',
        tags: ['bugfix'],
        changes: ['Bugfix changelog', 'Minorfix titulos de contenidos varios']
    },
    {
        version: '2.2',
        tags: ['content'],
        changes: ['Añadido nuevo contenido: verbos, partículas y números']
    },
    {
        version: '2.1',
        tags: ['content'],
        changes: ['Añadidos ejercicios vocabulario']
    },
    {
        version: '2.0',
        tags: ['content', 'feature'],
        changes: ['Agregar funcionalidad para ejercicios', 'Consolidación de anexos y ejercicios']
    },
    {
        version: '1.1.0',
        tags: ['feature'],
        changes: ['Agregar changelog', 'Preparación para cambio de versionado']
    },
    {
        version: '1.0.1',
        tags: ['bugfix'],
        changes: ['Fix responsive layout para webapp android']
    },
    {
        version: '1.0.0',
        tags: ['content', 'feature'],
        changes: ['Maquetado inicial', 'Estrucutración de menús', 'Definición de páginas base de contenido']
    }
];

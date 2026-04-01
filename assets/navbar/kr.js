menu.kr = {
    titles: [
        {id: 'kr-vocabulario', value: 'Vocabulario ~ 어휘'},
        {id: 'kr-gramatica', value: 'Gramática ~ 문법'},
        {id: 'kr-verbos', value: 'Verbos ~ 동사'},
        {id: 'kr-frases', value: 'Frases ~ 문장'}
    ],
    vocabulario: {
        hangeul: [
            {id: 'alfabeto', title: 'Alfabeto'},
            {id: 'batchim_i', title: 'Batchim I'},
            {id: 'batchim_ii', title: 'Batchim II'},
            {id: 'batchim_iii', title: 'Batchim III'},
            {id: 'construccion_silabas', title: 'Construcción silabica', module: 'anexos'},
            {id: 'orden_oracional', title: 'Orden oracional'}
        ],
        //PENDIENTE DE REHACER HTML Y AGRUPAR DESDE AQUI 
        vocabulario_base: [
            {id: 'nacionalidades', title: 'nacionalidades', module: 'anexos'},
            {id: 'numeros', title: 'números'},
            {id: 'hora', title: 'hora'}/*,
            {id: 'conteo', title: 'unidades de conteo'},
            {id: 'uso_ne', title: 'uso de 네'},
            {id: 'cute', title: 'cute - 귀여운'},
            {id: 'otros', title: 'otros'}*/
        ]
    },
    gramatica: {
        base: [
            {id: 'estilos_formalidad', title: 'Estilos de formalidad'}/*,
            {id: 'pronombres', title: 'Pronombres'},
            {id: 'demostrativos', title: 'Demostrativos'},
            {id: 'modif_demostrativos', title: 'Modificadores demostrativos'},
            {id: 'honorifico', title: 'Infijo honorífico'},
            {id: 'negaciones', title: 'Negaciones'},
            {id: 'orden_accion', title: 'Orden de acciones'}*/
        ]/*,
        general: [
            {id: 'pasado', title: 'Formando el pasado'},
            {id: 'desiderativo', title: 'Final desiderativo'},
            {id: 'cuando_algo', title: 'Cuando algo...'},
            {id: 'empezar_a', title: 'Empezar a'},
            {id: '지만', title: 'Final de verbo -지만'},
            {id: 'exagerar_algo', title: 'Exagerando un estado'},
            {id: 'querer_algo', title: 'Querer algo'},
            {id: 'simultaneidad', title: 'Simultaneidad de acciones'},
            {id: 'parecer', title: 'Parecerse a'},
            {id: 'probar', title: 'Probar a hacer algo'},
            {id: 'comparativas', title: 'Oraciones comparativas'},
            {id: 'alguna_vez', title: 'Has experimentado/has hecho alguna vez'},
            {id: 'parece_que', title: 'Parece que/Creo que'},
            {id: 'final_oracion', title: 'Final de oración'},
            {id: 'algo_juntos', title: 'Hagamos algo juntos'},
            {id: 'estilo_indirecto', title: 'Estilo indirecto'},
            {id: 'subordinadas_adj', title: 'Oraciones subordinadas adjetivas'}
        ]*/,
        particulas: [
            {id: '가_이', title: '가/이'},
            {id: '은_는', title: '은/는'},
            {id: '에', title: '에'},
            {id: '의', title: '의'}/*,
            {id: '을_를', title: '을/를'},
            {id: '또_도', title: '또/도'},
            {id: '요', title: '요'},
            {id: '에서', title: '에서'},
            {id: 'y_con', title: '하고'},
            {id: '만', title: '만'},
            {id: '이_나', title: '(이)나'},
            {id: '로', title: '(으) 로'},
            {id: '밖에', title: '밖에'},
            {id: '마다', title: '마다'},
            {id: '겠', title: '겠'}*/
        ],
        adverbios: [
            {id: 'adv_lugar', title: 'Lugar'}/*,
            {id: 'adv_negacion', title: 'Negación'},
            {id: 'adv_bien', title: 'Bien'},
            {id: 'adv_bastante', title: 'Bastante'}*/
        ],
        /*transformaciones: [
            {id: 'adj_sust', title: 'Adjetivo en sustantivo'},
            {id: 'adj_adv', title: 'Adjetivo en adverbio'},
            {id: 'verb_descrip', title: 'Verbos descriptivos'},
            {id: 'nominalizacion', title: 'Nominalización de verbos'}
        ],
        nexos: [
            {id: 'nexo_base', title: 'Base'},
            {id: 'desde_hasta', title: 'Desde/Hasta'},
            {id: 'nexo_preposion', title: 'Nexo de preposiciones'},
            {id: 'igual_que', title: 'Como, igual que'},
            {id: 'tanto_como', title: 'Tan/Tanto... como'},
            {id: 'conectores', title: 'Conectores'},
            {id: 'finalidad', title: 'Finalidad'},
            {id: 'razon_futura', title: 'Conector de razón futura'},
            {id: 'contexto_futuro', title: 'Conector de contexto futuro/suposición'}
        ],
        expresando: [
            {id: 'habilidad', title: 'Habilidad, capacidad'},
            {id: 'inhabilidad', title: 'Inhabilidad, incapacidad'},
            {id: 'direccion', title: 'Dirección'},
            {id: 'causalidad', title: 'Causalidad'},
            {id: 'intencion', title: 'Intencionalidad'},
            {id: 'posibilidad', title: 'Posibilidad'},
            {id: 'imposibilidad', title: 'Imposibilidad'},
            {id: 'obligacion', title: 'Obligación'},
            {id: 'prohibicion', title: 'Prohibición'},
            {id: 'exist_necesidad', title: 'Existencia de necesidad'},
            {id: 'not_necesidad', title: 'Ausencia de necesidad'},
            {id: 'sorpresa', title: 'Sorpresa'}
        ]*/
    },
    verbos: {
        principales: [
            {id: '이다', title: '이다 ~ Ser/Estar'},
            {id: '아니다', title: '아니다 ~ No ser/No estar'},
            {id: '있다', title: '있다 ~ Existencia/Posesión'},
            {id: '없다', title: '없다 ~ No existencia/No posesión'}/*,
            {id: 'pasado_이다_아니다', title: 'Pasado de 이다 y 아니다'}*/
        ]/*,
        regulares: [
            {id: '하다', title: '하다 ~ Hacer'}
        ],
        irregulares: [
            {id: 'ㅂ', title: 'Finalizado en -ㅂ'},
            {id: 'ㄷ', title: 'Finalizado en -ㄷ'},
            {id: 'ㄹ', title: 'Finalizado en -ㄹ'},
            {id: '르', title: 'Finalizado en -르'},
            {id: 'ㅅ', title: 'Finalizado en -ㅅ'},
            {id: 'tabla_르', title: 'Tabla verbos -르'}
        ]*/
    },
    frases: {
        felicitaciones: [
            {id: 'regalo', title: 'Regalos'},
            {id: 'navidad', title: 'Feliz navidad'}
        ],
        sacando_tema: [
            {id: 'que_haces', title: '¿Qué haces?'},
            {id: 'ocupado', title: 'Estar o no ocupad@'},
            {id: 'que_hora', title: '¿Qué hora es?'},
            {id: 'que_hobby', title: '¿Cuál es tu hobby?'},
            {id: 'favorito', title: '¿Cuál es tu favorito?'},
            {id: 'que_piensas', title: '¿En qué piensas?'},
            {id: 'buen_dia', title: '¿Has tenido un buen día?/Ten un buen día'},
            {id: 'despierto', title: '¿Qué haces despiert@ a estas horas?'}
        ],
        hablando_del_clima: [],
        respuestas_base: [],
        otras_expresiones: [
            {id: 'no_poder', title: 'No puede ser/No debes/Es imposible'},
            {id: 'ser_muchos', title: 'Ser/Haber muchos'}
        ],
        disculpas: [],
        ayuda: [
            {id: 'ayudar', title: 'Ayudar'},
            {id: 'correccion', title: 'Gracias por la corrección'},
            {id: 'respuesta_tarde', title: 'Perdón por mi respuesta tardía'},
            {id: 'que_es', title: '¿Qué es?'},
            {id: 'entendido', title: '¿Has entendido todo lo que he dicho?'}
        ],
        hablar_en_idioma : [
            {id: 'por_que_tema', title: '¿Por qué [tema]?'},
            {id: 'hablar_idioma', title: 'No puedo/sé hablar [idioma]'},
            {id: 'estudio_idioma', title: 'Estudio [idioma]'},
            {id: 'como_se_dice', title: '¿Cómo se dice [esto] en [idioma]?'}
        ],
        estancia_en_lugar: [],
        suerte: [],
        amistad: [],
        amor: [],
        desamor: []
    }
};

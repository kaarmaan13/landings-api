const z = require('zod')

const landingSchema = z.object({
  url: z.string().endsWith({
    value: '.mapfre.es',
    message: 'La url debe acabar con ".mapfre.es"'
  }),
  etiquetas: z.object({
    declarativa: z.object(),
    conversion: z.object(),
    visita: z.object(),
    externas: z.array({
      id: z.number().int(),
      option: z.string().refine( (value) => /^[0-9]*$/.test(value), 'Sólo pueden introducirse las ids de las opciones')
    })
  }),
  horario: z.optional(),
  dinamizacion: z.optional(),
  parametrizacion: z.optional(),
  gracias: z.optional()
})

function validateLanding (object) {
  return landingSchema.safeParse(object)
}

module.exports = {
  validateLanding
}
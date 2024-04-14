import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

export const deviceSchema = toTypedSchema(
  yup.object({
    model: yup.string().required().label('Model'),
    category: yup.number().required().label('Category'),
    releaseDate: yup.date().required().label('Release Date'),
    recommendedPrice: yup.number().required().label('Recommended Price'),
    description: yup.string().label('Description'),
    visible: yup.boolean().label('Visible'),
    photo: yup.mixed().label('Photo').nullable(),
    createdAt: yup.number().optional(),
  }),
)

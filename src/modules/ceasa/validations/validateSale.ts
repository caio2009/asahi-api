import Sale from '@modules/ceasa/infra/typeorm/entities/Sale';
import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';

const schema = yup.object().shape({
  date: yup.date().nullable(),
  totalValue: yup.number().positive().required(),
  paymentStatus: yup.string().required(),
  deliveryStatus: yup.string().required(),
  clientName: yup.string().required(),
  clientId: yup.string().uuid().nullable(),
  saleItems: yup.array().of(yup.object().shape({
    unitPrice: yup.number().positive().required(),
    quantity: yup.number().positive().required(),
    harvestId: yup.string().uuid().required()
  }))
});

async function validateSale(cultivation: Sale) {
  try {
    await schema.validate(cultivation, { abortEarly: false });
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateSale;
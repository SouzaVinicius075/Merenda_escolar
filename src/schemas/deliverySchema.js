import yup from './yup.js';

const deliverySchema = yup.object().shape({
    //creche: yup.string().required(),
    creche: yup.number().min(0).required(),
    pre_escola: yup.number().min(0).required(),
    fund: yup.number().min(0).required(),
    func: yup.number().min(0).required()
})

export default deliverySchema
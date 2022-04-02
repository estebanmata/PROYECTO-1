//Utilización del modelo de factura
const SolicitudVehiculoModel = require("../models/solicitudVehiculo");

//Método para obtener los choferes
module.exports.get = async (req, res, next) => {
  const solicitudVehiculos = await SolicitudVehiculoModel.find().populate("chofer").populate("vehiculo").populate("usuario").exec();
  res.json(solicitudVehiculos);
};

//Método para obtener una choferes por ID
module.exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const solicitudVehiculo = await SolicitudVehiculoModel.findOne({ _id: id }).populate("chofer").populate("vehiculo").populate("usuario").exec();
  res.json(solicitudVehiculo);
};



//Método para crear las facturas
module.exports.create = (req, res, next) => {
  const solicitudVehiculoModel = new SolicitudVehiculoModel( req.body );
  solicitudVehiculoModel.save();
  res.json(solicitudVehiculoModel);
};

//Método para eliminar las facturas
module.exports.delete = async (req, res, next) => {
  const solicitudVehiculo = await SolicitudVehiculoModel.findByIdAndRemove(req.params.id);
  // si factura es null significa que no existe el registro
  if (solicitudVehiculo) {
    res.json({ result: "El solicitudVehiculo fue borrado correctamente", solicitudVehiculo });
  } else {
    res.json({ result: "ID del solicitudVehiculo no existe en los documentos de la BD", solicitudVehiculo });
  }
};

//Método para modificar las facturas
module.exports.update = async (req, res, next) => {
  const solicitudVehiculo = await SolicitudVehiculoModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,     // ==> {numFactura: numFactura, nomCliente: nomCliente, dirCliente:dirCliente, telCliente:telCliente}
    { new: true } // retornar el registro que hemos modificado con los nuevos valores
  );
  res.json(solicitudVehiculo);
};
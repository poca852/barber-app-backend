const { response, request } = require("express");
const { EmployeeModel } = require('../models');   

// crear un empleado
const postEmployee = async(req = request, res = response) => {

   const { name } = req.body;

   try {
      
      const newEmployee = await EmployeeModel.create({name})

      res.status(201).json({
         ok: true,
         newEmployee
      })

   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'hable con el administrador'
      })
   }
}

// listar empleados
const getEmployees = async(req = request, res = response) => {
   const { name, state = true } = req.query

   try {
      
      // si viene el name buscamos el barbero por el nombre
      if(name){
         const employe = await EmployeeModel.findOne({
            where: {name, availability: state}
         })

         if(employe){
            return res.status(200).json({
               ok: true,
               employe
            })
         }else{
            return res.status(404).json({
               ok: false,
               msg: `No existe el barbero ${name}`
            })
         }
      }

      // si no mandan el name es porque quieren todos los barbeross
      const employees = await EmployeeModel.findAll({
         where: {availability: state}
      })

      res.status(200).json({
         ok: true,
         employees
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

// obtener un pleado por id
const getEmployee = async(req = request, res = response) => {

   const { idEmployee } = req.params;

   try {

      const employee = await EmployeeModel.findByPk(idEmployee);

      res.status(200).json({
         ok: true,
         employee
      })
      
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

// actualizar un empleado
const putEmployee = async(req = request, res = response) => {

   const { idEmployee } = req.params;
   const { name } = req.body;

   try {

      const existeEmployee = await EmployeeModel.findOne({
         where: {name}
      })

      if(existeEmployee) {
         return res.status(400).json({
            ok: false,
            msg: `El empleado ${name} ya existe`
         })
      }

      await EmployeeModel.update({name}, {
         where: {id: idEmployee}
      })

      res.status(200).json({
         ok: true,
         msg: 'Empleado actualizado'
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

// eliminar un empleado
const deleteEmployee = async(req = request, res = response) => {

   const { idEmployee } = req.params;

   try {

      await EmployeeModel.update({availability: false}, {
         where: {
            id: idEmployee
         }
      })

      res.status(200).json({
         ok: true,
         msg: 'Empleado eliminado'
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

module.exports = {
   postEmployee,
   getEmployees,
   getEmployee,
   putEmployee,
   deleteEmployee
}